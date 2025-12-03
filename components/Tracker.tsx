import React, { useState, useRef } from 'react';
import { Plus, Trash2, Save, Calendar, Video, X } from 'lucide-react';
import { LiftType, Set } from '../types';

export const Tracker: React.FC = () => {
  const [selectedLift, setSelectedLift] = useState<LiftType>(LiftType.SQUAT);
  const [sets, setSets] = useState<Set[]>([
    { id: '1', weight: 0, reps: 0, rpe: 8 }
  ]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addSet = () => {
    const lastSet = sets[sets.length - 1];
    setSets([...sets, { 
      id: Date.now().toString(), 
      weight: lastSet ? lastSet.weight : 0, 
      reps: lastSet ? lastSet.reps : 0, 
      rpe: lastSet ? lastSet.rpe : 8 
    }]);
  };

  const removeSet = (id: string) => {
    if (sets.length > 1) {
      setSets(sets.filter(s => s.id !== id));
    }
  };

  const updateSet = (id: string, field: keyof Set, value: number) => {
    setSets(sets.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = () => {
    // In a real app, this would save sets + video to backend
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setSets([{ id: Date.now().toString(), weight: 0, reps: 0, rpe: 8 }]);
      removeVideo();
    }, 2000);
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Log Workout</h1>
      
      {/* Lift Selector */}
      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 mb-6">
        <label className="text-zinc-400 text-sm mb-2 block font-medium">Select Lift</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.values(LiftType).map((lift) => (
            <button
              key={lift}
              onClick={() => setSelectedLift(lift)}
              className={`p-3 rounded-lg text-sm font-bold transition-all ${
                selectedLift === lift 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {lift}
            </button>
          ))}
        </div>
      </div>

      {/* Sets Tracker */}
      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white flex items-center">
            <Calendar size={18} className="mr-2 text-zinc-500" />
            Today's Sets
          </h2>
          <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">Lbs</span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-10 gap-2 text-xs text-zinc-500 text-center uppercase tracking-wider font-semibold mb-1">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Lbs</div>
            <div className="col-span-3">Reps</div>
            <div className="col-span-2">RPE</div>
            <div className="col-span-1"></div>
          </div>
          
          {sets.map((set, index) => (
            <div key={set.id} className="grid grid-cols-10 gap-2 items-center">
              <div className="col-span-1 flex justify-center items-center">
                <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 text-xs flex items-center justify-center font-bold">
                  {index + 1}
                </span>
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  value={set.weight || ''}
                  placeholder="0"
                  onChange={(e) => updateSet(set.id, 'weight', parseFloat(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-700 text-white text-center rounded p-2 focus:border-red-500 focus:outline-none"
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  value={set.reps || ''}
                  placeholder="0"
                  onChange={(e) => updateSet(set.id, 'reps', parseFloat(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-700 text-white text-center rounded p-2 focus:border-red-500 focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  value={set.rpe || ''}
                  placeholder="-"
                  max={10}
                  onChange={(e) => updateSet(set.id, 'rpe', parseFloat(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-700 text-zinc-300 text-center rounded p-2 focus:border-red-500 focus:outline-none"
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <button 
                  onClick={() => removeSet(set.id)}
                  className="text-zinc-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addSet}
          className="mt-6 w-full py-3 border border-dashed border-zinc-700 text-zinc-400 rounded-lg hover:bg-zinc-800 hover:text-white transition-all flex items-center justify-center font-medium"
        >
          <Plus size={18} className="mr-2" /> Add Set
        </button>
      </div>

      {/* Video Upload Section */}
      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 mb-6">
        <h2 className="text-sm font-bold text-zinc-400 mb-3 flex items-center uppercase tracking-wider">
          <Video size={16} className="mr-2" /> Attach Video
        </h2>
        
        <input 
          type="file" 
          accept="video/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleVideoUpload}
        />

        {!videoFile ? (
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-24 border-2 border-dashed border-zinc-700 rounded-xl flex flex-col items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-500 hover:bg-zinc-800/50 transition-all cursor-pointer"
          >
            <Video size={32} className="mb-2" />
            <span className="text-sm font-medium">Upload Set Video</span>
          </button>
        ) : (
          <div className="relative rounded-xl overflow-hidden bg-black border border-zinc-700">
            <video 
              src={videoPreview || ''} 
              className="w-full h-48 object-cover opacity-80" 
              controls
            />
            <div className="absolute top-2 right-2">
              <button 
                onClick={removeVideo}
                className="p-1 bg-black/50 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
               <p className="text-xs text-white truncate px-2">{videoFile.name}</p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={isSaved}
        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all ${
          isSaved 
            ? 'bg-green-600 text-white' 
            : 'bg-white text-black hover:bg-zinc-200'
        }`}
      >
        {isSaved ? (
          <>Saved Successfully!</>
        ) : (
          <><Save size={20} className="mr-2" /> Finish Workout</>
        )}
      </button>
    </div>
  );
};