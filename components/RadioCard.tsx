'use client';
import { useRef, useState, useEffect } from 'react';

export default function RadioCard({
  id,
  name,
  detail,
  url,
  isOnline,
  isFavorite,
  toggleFavorite,
  onPlayRequest,
  isActive,
}: {
  id: number;
  name: string;
  detail: string;
  url: string;
  isOnline: boolean;
  isFavorite: boolean;
  toggleFavorite: (id: number) => void;
  onPlayRequest: (audioElement: HTMLAudioElement) => void;
  isActive: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    if (!isOnline || !audioRef.current) return;
    onPlayRequest(audioRef.current);
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePauseClick = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (!isActive && isPlaying) {
      audioRef.current?.pause();
      audioRef.current!.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isActive]);

  return (
    <div
      className={`relative rounded-[2rem] p-[1px] transition-all transform duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden group ${
        isOnline ? 'bg-gradient-to-br from-teal-400/50 to-emerald-600/50 hover:from-teal-300 hover:to-emerald-500' : 'bg-white/10'
      }`}
    >
      <div className="h-full w-full rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between relative z-10">
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]" />
        
        <div>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-white drop-shadow-sm">{name}</h2>
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-inner ${
                isOnline
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></span>
              {isOnline ? 'Live' : 'Offline'}
            </div>
          </div>
          <p className="text-gray-300 text-sm font-medium mb-6 flex items-center gap-2">
            <svg width="16" height="16" className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
            {detail}
          </p>
        </div>

        <audio ref={audioRef} src={isOnline ? url : ''} preload="none" />

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          {isOnline ? (
            <button
              onClick={isPlaying ? handlePauseClick : handlePlayClick}
              className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 focus:outline-none shadow-lg ${
                isPlaying
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white animate-pulse'
                  : 'bg-gradient-to-r from-teal-400 to-emerald-500 text-white'
              }`}
            >
              {isPlaying ? (
                <svg width="24" height="24" className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg width="24" height="24" className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
          ) : (
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
              <svg width="24" height="24" className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
          )}

          <button
            onClick={() => toggleFavorite(id)}
            className={`p-3 rounded-full transition duration-300 backdrop-blur-md ${
              isFavorite
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 hover:bg-rose-500/30'
                : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg width="24" height="24" className={`w-6 h-6 ${isFavorite ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
