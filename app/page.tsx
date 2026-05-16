import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center p-6 -mt-4">
      
      <div className="w-full max-w-2xl ml-auto md:mr-12 lg:mr-24 text-right mb-16 z-10 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-emerald-400 drop-shadow-lg mb-4">
          Pokhara Radios
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 font-light drop-shadow-md">
          Experience the heartbeat of Gandaki Province. Listen to live streams from the most beautiful city in Nepal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl ml-auto md:mr-12 lg:mr-24 z-10">
        <Link href="/radio/all" className="group">
          <div className="h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/20 hover:border-white/40 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg width="32" height="32" className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Explore All Stations</h2>
            <p className="text-teal-100">Browse the complete collection of Pokhara's finest FM radios.</p>
          </div>
        </Link>

        <Link href="/radio/favourite" className="group">
          <div className="h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/20 hover:border-white/40 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg width="32" height="32" className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Your Favorites</h2>
            <p className="text-rose-100">Quickly access the stations you love listening to the most.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}