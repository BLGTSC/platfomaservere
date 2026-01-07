
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trophy, Shield, Ghost, LayoutGrid, Terminal, Activity, MessageSquare, LogOut, User as UserIcon, Share2, Facebook, Plus } from 'lucide-react';
import ServerCard from './components/ServerCard';
import AdminPanel from './components/AdminPanel';
import SupportTickets from './components/SupportTickets';
import { GameServer, User, Partner } from './types';

const INITIAL_SERVERS: GameServer[] = [
  { id: '1', name: 'CYBERNETIC ARENA | 128T | EU', ip: '192.168.1.100', port: 27015, game: 'CS2', map: 'de_dust2', players: 24, maxPlayers: 32, votes: 1240, status: 'online', lastUpdated: new Date() },
  { id: '2', name: '[US] NEON WASTELAND SURVIVAL', ip: '45.132.89.2', port: 28015, game: 'Rust', map: 'Procedural World', players: 156, maxPlayers: 200, votes: 890, status: 'online', lastUpdated: new Date() },
  { id: '3', name: 'GHOST SHELL RP | SEMI-SERIOUS', ip: '185.12.3.44', port: 30120, game: 'FiveM', map: 'Los Santos', players: 62, maxPlayers: 128, votes: 750, status: 'online', lastUpdated: new Date() },
];

const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'Major Admin', email: 'teascblg@gmail.com', role: 'admin' },
  { id: 'u2', name: 'Case', email: 'case@sprawl.net', role: 'user' },
];

const INITIAL_PARTNERS: Partner[] = [
  { id: 'p1', name: 'Vortex Hosting', imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=150&fit=crop', link: '#' },
  { id: 'p2', name: 'HyperX Labs', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=150&fit=crop', link: '#' },
];

const App: React.FC = () => {
  const [servers, setServers] = useState<GameServer[]>(INITIAL_SERVERS);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [partners, setPartners] = useState<Partner[]>(INITIAL_PARTNERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'list' | 'admin' | 'tickets'>('list');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (email: string, pass: string) => {
    if (email === 'teascblg@gmail.com' && pass === 'alex123') {
      setCurrentUser(INITIAL_USERS[0]);
      setIsLoggedIn(true);
      return true;
    }
    const found = INITIAL_USERS.find(u => u.email === email);
    if (found) {
      setCurrentUser(found);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setView('list');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-[#00f2ff]/30 relative flex flex-col">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#bc13fe] blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#00f2ff] blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('list')}>
            <div className="w-10 h-10 bg-gradient-to-br from-[#00f2ff] to-[#bc13fe] rounded-lg rotate-45 flex items-center justify-center border border-white/20 shadow-[0_0:20px_#00f2ff66]">
              <Ghost className="-rotate-45 text-black" size={24} />
            </div>
            <span className="font-orbitron font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              BLG <span className="text-[#00f2ff]">ARENA</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-orbitron text-[10px] tracking-[0.3em] uppercase font-bold text-slate-400">
            <button onClick={() => setView('list')} className={`hover:text-[#00f2ff] transition-all ${view === 'list' ? 'text-[#00f2ff]' : ''}`}>Server Grid</button>
            {isLoggedIn && (
              <button onClick={() => setView('tickets')} className={`flex items-center gap-2 hover:text-[#00f2ff] transition-all ${view === 'tickets' ? 'text-[#00f2ff]' : ''}`}>
                <MessageSquare size={14} /> Support Terminal
              </button>
            )}
            {currentUser?.role === 'admin' && (
              <button onClick={() => setView('admin')} className={`flex items-center gap-2 hover:text-[#bc13fe] transition-all ${view === 'admin' ? 'text-[#bc13fe]' : ''}`}>
                <Shield size={14} /> System Core
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full pl-4 pr-1 py-1">
                <span className="font-orbitron text-[9px] font-bold text-slate-300 hidden sm:inline">{currentUser?.name}</span>
                <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                  <LogOut size={16} />
                </button>
                <div className="w-8 h-8 rounded-full border border-[#00f2ff]/40 bg-black/40 flex items-center justify-center overflow-hidden">
                   <UserIcon size={16} className="text-[#00f2ff]" />
                </div>
              </div>
            ) : (
              <button 
                onClick={() => handleLogin('teascblg@gmail.com', 'alex123')}
                className="px-6 py-2.5 bg-white text-black font-orbitron text-xs font-black uppercase tracking-widest rounded-lg hover:bg-[#00f2ff] transition-all shadow-lg"
              >
                Sync Admin
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        <AnimatePresence mode="wait">
          {view === 'admin' && currentUser?.role === 'admin' && (
            <motion.div key="admin" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <AdminPanel 
                servers={servers} 
                users={users} 
                partners={partners}
                currentUser={currentUser}
                onDeleteServer={(id) => setServers(prev => prev.filter(s => s.id !== id))}
                onDeleteUser={(id) => setUsers(prev => prev.filter(u => u.id !== id))}
                onAddPartner={(p) => setPartners(prev => [...prev, p])}
                onDeletePartner={(id) => setPartners(prev => prev.filter(p => p.id !== id))}
              />
            </motion.div>
          )}

          {view === 'tickets' && isLoggedIn && currentUser && (
            <motion.div key="tickets" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <SupportTickets user={currentUser} isAdmin={currentUser.role === 'admin'} />
            </motion.div>
          )}

          {view === 'list' && (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Compact Header with Register Server button at top */}
              <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                   <div>
                      <h1 className="text-3xl font-orbitron font-black text-white tracking-tighter">
                        BLG <span className="text-[#00f2ff]">ARENA</span>
                      </h1>
                      <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Live Sector Telemetry Active</p>
                   </div>
                   <button onClick={() => alert("Deployment wizard starting...")} className="px-6 py-2 bg-[#00f2ff]/10 hover:bg-[#00f2ff]/20 border border-[#00f2ff]/40 text-[#00f2ff] font-orbitron text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all flex items-center gap-2">
                    <Plus size={14} /> Register Server
                  </button>
                </div>
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search Node..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-full py-2 pl-9 pr-4 text-xs font-orbitron focus:outline-none focus:border-[#00f2ff] w-64"
                  />
                </div>
              </div>

              {/* Server List Section (Main Content at top) */}
              <div className="grid grid-cols-1 gap-4 mb-16">
                {servers
                  .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(server => (
                  <ServerCard key={server.id} server={server} onVote={(id) => alert(`Vote logged for node ${id}`)} />
                ))}
              </div>

              {/* Info Section (Moved Down) */}
              <div className="glass-panel border border-white/10 rounded-3xl p-8 mb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10"><Terminal size={32} /></div>
                <h3 className="text-xl font-orbitron font-bold text-white mb-4">Tactical Infrastructure</h3>
                <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                  Direct connection to high-performance gaming nodes managed by BLG. Real-time neural telemetry and instant deployment protocols for competitive environments.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER & BOTTOM ACTIONS */}
      <footer className="mt-auto">
        {/* Quick Action Bar - Focused on Support Terminal as requested to be at bottom and smaller */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="flex justify-center p-3 glass-panel border border-white/5 rounded-2xl">
            <button onClick={() => setView('tickets')} className="px-5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-orbitron text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all flex items-center gap-2">
              <MessageSquare size={12} /> Support Terminal
            </button>
          </div>
        </div>

        {/* Partner Banners Section */}
        <div className="border-y border-white/5 bg-black/40 py-8 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4 opacity-50">
              <Share2 size={12} className="text-[#00f2ff]" />
              <span className="text-[10px] font-orbitron tracking-[0.3em] uppercase">Trusted Partners</span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {partners.map(partner => (
                <a key={partner.id} href={partner.link} target="_blank" rel="noopener noreferrer" className="grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all">
                  <img src={partner.imageUrl} alt={partner.name} className="h-8 object-contain rounded" />
                </a>
              ))}
              {partners.length === 0 && <span className="text-xs text-slate-600 italic">No partners linked.</span>}
            </div>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="py-8 px-6 text-center">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              BLG Arena Protocol © 2025 // Sector 7 Integrated
            </div>
            <a 
              href="https://web.facebook.com/blgtsc1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-4 py-2 bg-black/40 border border-[#bc13fe]/30 rounded-full transition-all hover:border-[#bc13fe] hover:shadow-[0_0_20px_rgba(188,19,254,0.3)]"
            >
              <span className="text-[10px] font-orbitron font-bold text-slate-400 group-hover:text-white transition-colors uppercase tracking-widest">
                Made By <span className="text-[#bc13fe] group-hover:animate-pulse">BLG</span>
              </span>
              <Facebook size={12} className="text-[#bc13fe]" />
            </a>
          </div>
        </div>
      </footer>

      {/* HUD Background Telemetry */}
      <div className="fixed bottom-0 left-0 w-full p-4 pointer-events-none flex justify-between items-end z-[40]">
        <div className="glass-panel border border-white/5 px-4 py-1 rounded-lg text-[8px] font-mono text-[#00f2ff]/40 uppercase pointer-events-auto">
           Grid_Status: Optimal // Latency: 12ms // Auth: {currentUser?.email || 'Guest_Node'}
        </div>
      </div>
    </div>
  );
};

export default App;
