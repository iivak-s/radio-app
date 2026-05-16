import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokhara Radios - Gandaki Province",
  description: "Listen to the best radio stations from Pokhara, Nepal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white min-h-screen relative overflow-x-hidden`} style={{ backgroundColor: '#111827' }}>
        {/* Global fixed background guaranteed to cover the screen and stay fixed */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
          {/* The beautiful Pokhara image */}
          <img src="/bg-hero.png" alt="Pokhara Phewa Lake" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* A soft, dark overlay to ensure text is perfectly readable while keeping the image vibrant */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent, rgba(17, 24, 39, 0.9))' }} />
        </div>
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}