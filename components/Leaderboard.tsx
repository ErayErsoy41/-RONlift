import React, { useState } from 'react';
import { Trophy, Medal, ChevronUp, ChevronDown } from 'lucide-react';
import { UserProfile } from '../types';

const MOCK_LEADERBOARD: UserProfile[] = [
  { id: '1', username: 'BigDan99', avatarUrl: 'https://picsum.photos/id/1062/100/100', total: 1650, wilks: 450, squatMax: 600, benchMax: 400, deadliftMax: 650 },
  { id: '2', username: 'IronMike', avatarUrl: 'https://picsum.photos/id/1005/100/100', total: 1580, wilks: 435, squatMax: 550, benchMax: 380, deadliftMax: 650 },
  { id: '3', username: 'SarahLifts', avatarUrl: 'https://picsum.photos/id/1011/100/100', total: 980, wilks: 480, squatMax: 350, benchMax: 200, deadliftMax: 430 },
  { id: '4', username: 'Quadzilla', avatarUrl: 'https://picsum.photos/id/1025/100/100', total: 1450, wilks: 410, squatMax: 550, benchMax: 350, deadliftMax: 550 },
  { id: '5', username: 'LightWeightBaby', avatarUrl: 'https://picsum.photos/id/100/100/100', total: 1400, wilks: 405, squatMax: 500, benchMax: 350, deadliftMax: 550 },
  { id: '6', username: 'BenchKing', avatarUrl: 'https://picsum.photos/id/200/100/100', total: 1350, wilks: 390, squatMax: 450, benchMax: 400, deadliftMax: 500 },
];

export const Leaderboard: React.FC = () => {
  const [sortBy, setSortBy] = useState<'total' | 'wilks'>('total');

  const sortedUsers = [...MOCK_LEADERBOARD].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="pb-24 pt-4 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <Trophy className="text-yellow-500 mr-2" /> Rankings
        </h1>
        <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800">
          <button
            onClick={() => setSortBy('total')}
            className={`px-3 py-1 text-xs font-bold rounded ${
              sortBy === 'total' ? 'bg-zinc-700 text-white' : 'text-zinc-500'
            }`}
          >
            Total
          </button>
          <button
            onClick={() => setSortBy('wilks')}
            className={`px-3 py-1 text-xs font-bold rounded ${
              sortBy === 'wilks' ? 'bg-zinc-700 text-white' : 'text-zinc-500'
            }`}
          >
            Wilks
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="grid grid-cols-12 gap-2 p-3 bg-zinc-950/50 border-b border-zinc-800 text-xs text-zinc-500 font-bold uppercase tracking-wider">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-6">Athlete</div>
          <div className="col-span-2 text-center">Total</div>
          <div className="col-span-3 text-right">Breakdown</div>
        </div>

        {sortedUsers.map((user, index) => {
          let rankIcon = null;
          if (index === 0) rankIcon = <Medal size={20} className="text-yellow-500" />;
          if (index === 1) rankIcon = <Medal size={20} className="text-zinc-400" />;
          if (index === 2) rankIcon = <Medal size={20} className="text-amber-700" />;

          return (
            <div key={user.id} className="grid grid-cols-12 gap-2 p-4 items-center border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors">
              <div className="col-span-1 flex justify-center text-zinc-400 font-bold">
                {rankIcon || <span>{index + 1}</span>}
              </div>
              <div className="col-span-6 flex items-center space-x-3">
                <img src={user.avatarUrl} alt={user.username} className="w-8 h-8 rounded-full border border-zinc-700" />
                <div>
                  <p className="font-bold text-sm text-zinc-200">{user.username}</p>
                  <p className="text-[10px] text-zinc-500">Wilks: {user.wilks}</p>
                </div>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-white font-bold text-sm">{user.total}</span>
              </div>
              <div className="col-span-3 flex justify-end items-center space-x-1">
                <div className="flex flex-col items-end">
                   <span className="text-[10px] text-zinc-400">S: {user.squatMax}</span>
                   <span className="text-[10px] text-zinc-400">B: {user.benchMax}</span>
                   <span className="text-[10px] text-zinc-400">D: {user.deadliftMax}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};