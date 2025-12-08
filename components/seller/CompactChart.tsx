import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface CompactChartProps {
  type?: 'line' | 'bar';
  data: any[];
  title: string;
  periods?: string[];
  defaultPeriod?: string;
}

export function CompactChart({ 
  type = 'line', 
  data, 
  title, 
  periods = ['7Д', '30Д', '90Д'],
  defaultPeriod = '7Д'
}: CompactChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);

  return (
    <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="luma-type-title-14 text-luma-text-900">{title}</h3>
        
        <div className="flex bg-luma-bg-0 rounded-xl p-1">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded-lg luma-type-cap-12 transition-colors ${
                selectedPeriod === period
                  ? 'bg-luma-primary-600 text-white'
                  : 'text-luma-text-600 hover:text-luma-text-900'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={data}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--luma-primary-600)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Bar dataKey="value" fill="var(--luma-primary-600)" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}