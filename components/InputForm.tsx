
import React, { useState } from 'react';
import { FormInput } from '../types';

interface InputFormProps {
  onAnalyze: (data: FormInput) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onAnalyze }) => {
  const [flower, setFlower] = useState('Wild Cherry');
  const [place, setPlace] = useState('Kyoto, Japan');
  const [season, setSeason] = useState<'Spring' | 'Summer' | 'Autumn' | 'Winter'>('Spring');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze({ flower, place, season });
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 md:p-8 shadow-2xl border border-gray-700 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="flower" className="block text-sm font-medium text-gray-300 mb-2">
              Flower Name
            </label>
            <input
              type="text"
              id="flower"
              value={flower}
              onChange={(e) => setFlower(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              placeholder="e.g., Monarch Butterfly"
              required
            />
          </div>
          <div>
            <label htmlFor="place" className="block text-sm font-medium text-gray-300 mb-2">
              Place / Location
            </label>
            <input
              type="text"
              id="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              placeholder="e.g., Central Valley, California"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="season" className="block text-sm font-medium text-gray-300 mb-2">
            Season
          </label>
          <select
            id="season"
            value={season}
            onChange={(e) => setSeason(e.target.value as any)}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            required
          >
            <option>Spring</option>
            <option>Summer</option>
            <option>Autumn</option>
            <option>Winter</option>
          </select>
        </div>
        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M10 3.75a.75.75 0 01.75.75v3.44l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72V4.5A.75.75 0 0110 3.75z" />
              <path d="M3.5 9.75a.75.75 0 01.75-.75h11.5a.75.75 0 010 1.5H4.25a.75.75 0 01-.75-.75zM5.5 15a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9z" />
            </svg>
            Analyze Synchrony
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
