
export interface FormInput {
  flower: string;
  place: string;
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
}

export interface ChartDataPoint {
  day: number;
  bloomIntensity: number;
  pollinatorActivity: number;
}

export enum SyncStatus {
  HEALTHY = 'Healthy Synchrony',
  MISMATCH = 'Mismatch Alert',
}

export interface AnalysisResult {
  status: SyncStatus;
  summary: string;
  recommendations: string[];
  chartData: ChartDataPoint[];
  map: {
    lat: number;
    lng: number;
    zoom: number;
  };
}
