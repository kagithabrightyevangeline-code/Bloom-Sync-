
import React from 'react';

const LoadingSpinner: React.FC = () => {
    const messages = [
        "Analyzing NDVI Satellite Data...",
        "Correlating Pollinator Activity Logs...",
        "Applying Climate Models...",
        "Generating Synchrony Prediction...",
    ];
    const [messageIndex, setMessageIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 800);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (
    <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 border-4 border-cyan-500 rounded-full animate-spin border-t-transparent"></div>
        <div className="absolute inset-2 border-4 border-emerald-400 rounded-full animate-ping"></div>
      </div>
      <p className="text-lg font-semibold text-gray-300 animate-pulse transition-all duration-500">
        {messages[messageIndex]}
      </p>
    </div>
  );
};

export default LoadingSpinner;
