'use client';
import { useState, useEffect, useRef } from 'react';
import { streamLinks } from '@/data/streams';
import RadioCard from '@/components/RadioCard';

interface StreamStatus {
  id: number;
  isOnline: boolean;
}

export default function AllRadios() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [statuses, setStatuses] = useState<StreamStatus[]>([]);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<number | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Icecast servers often fail CORS or HEAD requests, leading to false "Offline" statuses.
    // Assume streams are online initially. The HTML5 audio element will handle real failures.
    const results = streamLinks.map((_, index) => ({ id: index, isOnline: true }));
    setStatuses(results);
  }, []);

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
    setCurrentlyPlayingId(id); // 🟢 Update playing radio
  };

  const combinedData = streamLinks.map((stream, index) => {
    const status = statuses.find(s => s.id === index);
    return {
      id: index,
      name: stream.name,
      detail:stream.detail,
      url: stream.url,
      isOnline: status?.isOnline ?? false,
    };
  });

  const sortedStreams = combinedData.sort((a, b) => {
    const nameCompare = a.name.localeCompare(b.name);
    if (nameCompare !== 0) return nameCompare;
    return a.isOnline ? -1 : 1;
  });

  return (
    <div className="max-w-7xl ml-auto mr-4 md:mr-12 lg:mr-24 py-8 px-4 md:w-[80%] lg:w-[65%]">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400 mb-2 drop-shadow-sm">
            All Stations
          </h1>
          <p className="text-teal-100/70 text-lg">Discover the sounds of Pokhara</p>
        </div>
        <a href="/" className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium backdrop-blur-md transition-all flex items-center gap-2">
          <svg width="20" height="20" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back Home
        </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedStreams.map((stream) => (
          <RadioCard
            key={stream.id}
            id={stream.id}
            name={stream.name}
            detail={stream.detail}
            url={stream.url}
            isOnline={stream.isOnline}
            isFavorite={favorites.includes(stream.id)}
            toggleFavorite={toggleFavorite}
            isActive={currentlyPlayingId === stream.id}
            onPlayRequest={(audio) => handlePlayRequest(audio, stream.id)}
          />
        ))}
      </div>
    </div>
  );
}
