import React from 'react';
import { Heart, MessageCircle, Share2, Dumbbell } from 'lucide-react';
import { Post, LiftType } from '../types';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: 'u2',
    username: 'IronMike',
    avatarUrl: 'https://picsum.photos/id/1005/100/100',
    content: 'Finally broke the 500lb barrier on deadlift! The program is working perfectly. RPE 9.5.',
    timestamp: '2h ago',
    likes: 124,
    comments: 18,
    isPR: true,
    liftType: LiftType.DEADLIFT,
    weightLifted: 500
  },
  {
    id: '2',
    userId: 'u3',
    username: 'SarahLifts',
    avatarUrl: 'https://picsum.photos/id/1011/100/100',
    content: 'Bench press volume day. 5x5 @ 75%. Feeling strong but fatigued.',
    imageUrl: 'https://picsum.photos/id/106/600/400',
    timestamp: '5h ago',
    likes: 89,
    comments: 5,
    isPR: false,
    liftType: LiftType.BENCH,
    weightLifted: 145
  },
  {
    id: '3',
    userId: 'u4',
    username: 'Quadzilla',
    avatarUrl: 'https://picsum.photos/id/1025/100/100',
    content: 'Squats were moving fast today. Speed work is underrated.',
    timestamp: '1d ago',
    likes: 210,
    comments: 32,
    isPR: false,
    liftType: LiftType.SQUAT,
    weightLifted: 405
  }
];

export const Feed: React.FC = () => {
  return (
    <div className="space-y-4 pb-24 pt-4 px-4">
      <h1 className="text-2xl font-bold text-white mb-6">Community Feed</h1>
      {MOCK_POSTS.map((post) => (
        <div key={post.id} className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img src={post.avatarUrl} alt={post.username} className="w-10 h-10 rounded-full border-2 border-zinc-700" />
                <div>
                  <h3 className="font-bold text-zinc-100">{post.username}</h3>
                  <p className="text-xs text-zinc-500">{post.timestamp}</p>
                </div>
              </div>
              {post.isPR && (
                <span className="bg-yellow-500/10 text-yellow-500 text-xs font-bold px-2 py-1 rounded-full border border-yellow-500/20 flex items-center">
                  <Dumbbell size={12} className="mr-1" /> New PR
                </span>
              )}
            </div>
            
            <p className="text-zinc-300 mb-3">{post.content}</p>
            
            {post.weightLifted && post.liftType && (
              <div className="bg-zinc-950/50 rounded-lg p-3 mb-3 border border-zinc-800/50 flex items-center justify-between">
                <span className="text-sm text-zinc-400 font-medium">{post.liftType}</span>
                <span className="text-lg font-bold text-white">{post.weightLifted} <span className="text-sm text-zinc-500 font-normal">lbs</span></span>
              </div>
            )}

            {post.imageUrl && (
              <div className="mb-3 -mx-4">
                <img src={post.imageUrl} alt="Workout" className="w-full h-64 object-cover" />
              </div>
            )}

            <div className="flex items-center justify-between text-zinc-500 pt-2 border-t border-zinc-800">
              <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                <Heart size={18} />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                <MessageCircle size={18} />
                <span className="text-sm">{post.comments}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-white transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};