
import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';
import { AnalysisResult, FormInput } from './types';
import { analyzeBloomSynchrony } from './services/bloomSyncService';

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formInput, setFormInput] = useState<FormInput | null>(null);


  const handleAnalyze = async (data: FormInput) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setFormInput(data);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      const result = analyzeBloomSynchrony(data);
      setAnalysisResult(result);
    } catch (err) {
      setError('Failed to analyze data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setFormInput(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-200">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {!analysisResult && !isLoading && (
           <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-4">
              Monitor Ecosystem Harmony
            </h2>
            <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
              Analyze the delicate synchrony between flowering seasons and pollinator activity. Our dashboard uses simulated satellite and climate data to detect potential mismatches caused by environmental shifts.
            </p>
             <InputForm onAnalyze={handleAnalyze} />
           </div>
        )}

        {isLoading && <LoadingSpinner />}
        
        {error && <div className="text-center text-red-500">{error}</div>}

        {analysisResult && formInput && (
          <Dashboard result={analysisResult} input={formInput} onReset={handleReset} />
        )}
      </main>
    </div>
  );
};

export default App;
