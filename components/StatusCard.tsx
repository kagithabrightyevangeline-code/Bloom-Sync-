import React from 'react';
import { SyncStatus } from '../types';

interface StatusCardProps {
  status: SyncStatus;
  summary: string;
}

const HealthyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const MismatchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);


const StatusCard: React.FC<StatusCardProps> = ({ status, summary }) => {
  const isMismatch = status === SyncStatus.MISMATCH;

  return (
    <div className={`rounded-lg p-6 border ${isMismatch ? 'bg-amber-900/20 border-amber-400/30' : 'bg-emerald-900/20 border-emerald-400/30'} shadow-xl`}>
      <div className="flex items-center md:items-start gap-5">
        <div className="flex-shrink-0">
          {isMismatch ? <MismatchIcon /> : <HealthyIcon />}
        </div>
        <div>
          <h2 className={`text-2xl font-bold ${isMismatch ? 'text-amber-400' : 'text-emerald-400'}`}>
            {status}
          </h2>
          <p className="mt-2 text-gray-300 max-w-4xl text-base">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
