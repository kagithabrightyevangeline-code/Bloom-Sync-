
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ChartDataPoint } from '../types';

interface SyncChartProps {
  data: ChartDataPoint[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700/80 p-3 rounded-md border border-gray-600 backdrop-blur-sm">
        <p className="label font-bold text-white">{`Day ${label}`}</p>
        <p className="intro text-emerald-400">{`Bloom Intensity: ${payload[0].value}%`}</p>
        <p className="intro text-cyan-400">{`Pollinator Activity: ${payload[1].value}%`}</p>
      </div>
    );
  }
  return null;
};

const SyncChart: React.FC<SyncChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorBloom" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPollinator" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
          <XAxis dataKey="day" stroke="#a0aec0" label={{ value: 'Days into Season', position: 'insideBottom', offset: -15, fill: '#a0aec0' }} />
          <YAxis stroke="#a0aec0" label={{ value: 'Relative Activity (%)', angle: -90, position: 'insideLeft', fill: '#a0aec0', dx: -10 }}/>
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{paddingTop: '20px'}}/>
          <Area type="monotone" dataKey="bloomIntensity" name="Flower Bloom Intensity" stroke="#34d399" fillOpacity={1} fill="url(#colorBloom)" strokeWidth={2} />
          <Area type="monotone" dataKey="pollinatorActivity" name="Pollinator Activity" stroke="#22d3ee" fillOpacity={1} fill="url(#colorPollinator)" strokeWidth={2}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SyncChart;
