import React from 'react';

interface RecommendationsListProps {
  recommendations: string[];
}

const ActionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-3 flex-shrink-0 text-cyan-400">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z" clipRule="evenodd" />
    </svg>
);

const RecommendationsList: React.FC<RecommendationsListProps> = ({ recommendations }) => {
  return (
     <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-xl h-full">
      <h2 className="text-xl font-bold text-white mb-4">Recommended Actions</h2>
      <ul className="space-y-4">
        {recommendations.map((rec, index) => {
            const parts = rec.split(':');
            const hasAction = parts.length > 1 && parts[0].toUpperCase() === parts[0];
          return (
            <li key={index} className="flex items-start text-gray-300">
               <ActionIcon />
               <span>
                {hasAction ? (
                    <>
                        <strong className="font-semibold text-cyan-300">{parts[0]}:</strong>
                        {parts.slice(1).join(':')}
                    </>
                ) : (
                    rec
                )}
               </span>
            </li>
        )}
        )}
      </ul>
    </div>
  );
};

export default RecommendationsList;
