'use client';
import { useState, useRef } from 'react';
import { streamLinks } from '@/data/streams';
import RadioCard from '@/components/RadioCard';

export default function FavouriteRadios() {
  const [favorites, setFavorites] = useState<number[]>([0, 2, 4]); // Sample favorites
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<number | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const handlePlayRequest = (audioElement: HTMLAudioElement, id: number) => {
    if (currentAudioRef.current && currentAudioRef.current !== audioElement) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    currentAudioRef.current = audioElement;
    setCurrentlyPlayingId(id);
  };

  return (
    <div className="max-w-7xl ml-auto mr-4 md:mr-12 lg:mr-24 py-8 px-4 md:w-[80%] lg:w-[65%]">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-pink-500 mb-2 drop-shadow-sm">
            Your Favorites
          </h1>
          <p className="text-rose-100/70 text-lg">Your curated selection of local stations</p>
        </div>
        <a href="/" className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium backdrop-blur-md transition-all flex items-center gap-2">
          <svg width="20" height="20" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back Home
        </a>
      </div>
      
      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-white/5 backdrop-blur-lg rounded-[2rem] border border-white/10">
          <h3 className="text-2xl text-gray-300 font-semibold mb-4">No favorites yet</h3>
          <p className="text-gray-400 mb-8">Go to All Stations and add some to your favorites list.</p>
          <a href="/radio/all" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 text-white font-bold hover:shadow-lg hover:scale-105 transition-all">
            Explore Stations
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((id) => (
            <RadioCard
              key={id}
              id={id}
              name={streamLinks[id]?.name || `Radio ${id + 1}`}
              detail={streamLinks[id]?.detail || "Pokhara"}
              url={streamLinks[id]?.url || ""}
              isOnline={true}
              isFavorite={true}
              toggleFavorite={toggleFavorite}
              isActive={currentlyPlayingId === id}
              onPlayRequest={(audio) => handlePlayRequest(audio, id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}