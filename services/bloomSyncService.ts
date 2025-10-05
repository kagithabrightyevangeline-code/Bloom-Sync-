
import { FormInput, AnalysisResult, SyncStatus, ChartDataPoint } from '../types';

// Simple hash function to create pseudo-random but deterministic results from inputs
const simpleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};


export const analyzeBloomSynchrony = (data: FormInput): AnalysisResult => {
  const { flower, place, season } = data;
  const hashInput = `${flower}${place}${season}`;
  const seed = simpleHash(hashInput);

  const isMismatch = (seed % 3) === 0; // 1 in 3 chance of mismatch
  const status = isMismatch ? SyncStatus.MISMATCH : SyncStatus.HEALTHY;

  const phaseShift = isMismatch ? 15 : 5; // Mismatched data is more out of phase
  const peakBloomDay = 40 + (seed % 10);
  const peakPollinatorDay = peakBloomDay + (seed % phaseShift) - (phaseShift / 2);
  
  const chartData: ChartDataPoint[] = [];
  for (let day = 1; day <= 90; day++) {
    const bloomIntensity = Math.max(0, 100 * Math.exp(-Math.pow(day - peakBloomDay, 2) / 300));
    const pollinatorActivity = Math.max(0, 95 * Math.exp(-Math.pow(day - peakPollinatorDay, 2) / (isMismatch ? 250: 350)) + (seed % 5));
    chartData.push({
      day,
      bloomIntensity: parseFloat(bloomIntensity.toFixed(2)),
      pollinatorActivity: parseFloat(pollinatorActivity.toFixed(2)),
    });
  }

  let summary: string;
  let recommendations: string[];

  if (status === SyncStatus.HEALTHY) {
    summary = `Analysis for ${flower} in ${place} during ${season} shows a healthy synchrony. Pollinator activity aligns perfectly with the peak flowering period, indicating a stable and productive ecosystem.`;
    recommendations = [
      "Continue monitoring local pollinator populations using citizen science apps.",
      "Maintain diverse native plant species to support a variety of pollinators.",
      "Avoid pesticide use, especially during peak bloom times to protect pollinators."
    ];
  } else {
    const shift = Math.round(peakPollinatorDay - peakBloomDay);
    const direction = shift > 0 ? 'later' : 'earlier';
    summary = `A potential mismatch has been detected for ${flower} in ${place}. Based on simulated NDVI data, the bloom is peaking while pollinator activity appears to be lagging, arriving approximately ${Math.abs(shift)} days ${direction}. This could impact pollination efficiency.`;
    recommendations = [
      "ACTION: Introduce supplementary, later-blooming native plants to provide nectar sources when primary pollinators arrive.",
      "NOTIFY: Log findings with local conservation authorities and pollinator networks like BeeWatch.",
      "MONITOR: Increase ground-truth observations to validate satellite data and track pollinator presence.",
      "RECOMMEND: Consider establishing pollinator habitats with staggered blooming periods to build ecosystem resilience."
    ];
  }

  return {
    status,
    summary,
    recommendations,
    chartData,
    map: {
      lat: (seed % 180) - 90,
      lng: (seed % 360) - 180,
      zoom: 10,
    }
  };
};
