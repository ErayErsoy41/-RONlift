import React from 'react';
import { User } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';

const PROGRESS_DATA = [
  { month: 'Jan', total: 1050 },
  { month: 'Feb', total: 1080 },
  { month: 'Mar', total: 1100 },
  { month: 'Apr', total: 1125 },
  { month: 'May', total: 1160 },
  { month: 'Jun', total: 1200 },
];

const LIFT_RATIOS = [
  { name: 'Squat', weight: 405 },
  { name: 'Bench', weight: 275 },
  { name: 'Deadlift', weight: 520 },
];

export const Profile: React.FC = () => {
  return (
    <div className="pb-24 pt-4 px-4">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-zinc-800 border-4 border-zinc-900 shadow-xl overflow-hidden mb-4 relative">
            <img src="https://picsum.photos/id/64/200/200" alt="Me" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-bold text-white">Alex The Lifter</h1>
        <p className="text-zinc-500">@alexlifts • 83kg Class</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-center">
            <p className="text-zinc-500 text-xs uppercase font-bold mb-1">Total</p>
            <p className="text-xl font-bold text-white">1200</p>
        </div>
        <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-center">
            <p className="text-zinc-500 text-xs uppercase font-bold mb-1">Wilks</p>
            <p className="text-xl font-bold text-white">395</p>
        </div>
        <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-center">
            <p className="text-zinc-500 text-xs uppercase font-bold mb-1">Rank</p>
            <p className="text-xl font-bold text-yellow-500">#12</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
          <h3 className="text-white font-bold mb-4">Total Progression</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PROGRESS_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="month" tick={{fill: '#71717a', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis hide domain={['dataMin - 100', 'dataMax + 50']} />
                <Tooltip 
                    contentStyle={{backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px'}}
                    itemStyle={{color: '#fff'}}
                />
                <Line type="monotone" dataKey="total" stroke="#ef4444" strokeWidth={3} dot={{fill: '#ef4444', strokeWidth: 0, r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
          <h3 className="text-white font-bold mb-4">SBD Breakdown</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={LIFT_RATIOS} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{fill: '#a1a1aa', fontSize: 12}} axisLine={false} tickLine={false} width={60} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px'}} itemStyle={{color: '#fff'}} />
                <Bar dataKey="weight" fill="#3f3f46" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};