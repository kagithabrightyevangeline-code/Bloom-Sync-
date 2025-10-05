
import React from 'react';
import { SyncStatus } from '../types';

interface AlertCardProps {
  status: SyncStatus;
  summary: string;
  recommendations: string[];
}

const HealthyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const MismatchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

const ActionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-3 flex-shrink-0 text-cyan-400">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z" clipRule="evenodd" />
    </svg>
);


const AlertCard: React.FC<AlertCardProps> = ({ status, summary, recommendations }) => {
  const isMismatch = status === SyncStatus.MISMATCH;

  return (
    <div className={`rounded-lg p-6 ${isMismatch ? 'bg-amber-900/20' : 'bg-emerald-900/20'}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {isMismatch ? <MismatchIcon /> : <HealthyIcon />}
        </div>
        <div>
          <h3 className={`text-xl font-bold ${isMismatch ? 'text-amber-400' : 'text-emerald-400'}`}>
            {status}
          </h3>
          <p className="mt-1 text-gray-300">
            {summary}
          </p>
        </div>
      </div>
      <div className="mt-6 border-t pt-6 border-gray-700/50">
         <h4 className="text-lg font-semibold text-white mb-3">Recommended Actions</h4>
         <ul className="space-y-3">
            {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start text-gray-300">
                   <ActionIcon />
                   <span>{rec}</span>
                </li>
            ))}
         </ul>
      </div>
    </div>
  );
};

export default AlertCard;
