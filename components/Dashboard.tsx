import React from 'react';
import { AnalysisResult, FormInput } from '../types';
import MapView from './MapView';
import SyncChart from './SyncChart';
import StatusCard from './StatusCard';
import RecommendationsList from './RecommendationsList';

interface DashboardProps {
  result: AnalysisResult;
  input: FormInput;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ result, input, onReset }) => {
  return (
    <div className="space-y-8 animate-fade-in">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-white">Analysis Dashboard</h1>
            <p className="text-gray-400 mt-1">
                Showing results for <span className="font-semibold text-emerald-400">{input.flower}</span> in <span className="font-semibold text-cyan-400">{input.place}</span> during <span className="font-semibold text-amber-400">{input.season}</span>.
            </p>
        </div>
        <button
            onClick={onReset}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201-4.42 5.5 5.5 0 011.66-1.918l.757-.757a.75.75 0 011.061 1.06l-.757.757a4 4 0 00-1.212 3.282 4 4 0 007.284-2.23l.89-.89a.75.75 0 011.06 1.06l-.89.89a5.5 5.5 0 01-1.602 1.602z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M4.688 8.576a5.5 5.5 0 019.201 4.42 5.5 5.5 0 01-1.66 1.918l-.757.757a.75.75 0 11-1.06-1.06l.757-.757a4 4 0 001.212-3.282 4 4 0 00-7.284 2.23l-.89.89a.75.75 0 11-1.06-1.06l.89-.89a5.5 5.5 0 011.602-1.602z" clipRule="evenodd" />
            </svg>
            New Analysis
        </button>
      </div>

      <div className="flex flex-col gap-8">
        {/* Part 1: Alert */}
        <StatusCard status={result.status} summary={result.summary} />

        {/* Part 2: Graph */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-xl">
           <h2 className="text-xl font-bold mb-4 text-white">Bloom vs. Pollinator Activity Timeline</h2>
          <SyncChart data={result.chartData} />
        </div>

        {/* Part 3 & 4: Precautions and Map View */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
                <RecommendationsList recommendations={result.recommendations} />
            </div>
            <div className="lg:col-span-2">
                 <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-xl h-full flex flex-col">
                    <h2 className="text-xl font-bold mb-4 text-white">Simulated Satellite View</h2>
                    <div className="flex-grow">
                      <MapView mapInfo={result.map} place={input.place}/>
                    </div>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
