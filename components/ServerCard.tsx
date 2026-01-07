
import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Activity, ArrowUpCircle } from 'lucide-react';
import { GameServer } from '../types';

interface ServerCardProps {
  server: GameServer;
  onVote: (id: string) => void;
}

const ServerCard: React.FC<ServerCardProps> = ({ server, onVote }) => {
  const playerPercentage = (server.players / server.maxPlayers) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="relative group mb-6"
    >
      {/* Glow Effect Layer */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f2ff] to-[#bc13fe] rounded-xl blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
      
      <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 glass-panel rounded-xl border border-white/10 overflow-hidden">
        
        {/* Status Indicator HUD element */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00f2ff] to-[#bc13fe]"></div>
        
        {/* Rank / Number */}
        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-black/40 border border-[#00f2ff]/30 text-[#00f2ff] font-orbitron font-bold">
          {server.votes}
        </div>

        {/* Server Info */}
        <div className="flex-grow">
          <h3 className="text-xl font-orbitron font-bold text-white group-hover:text-[#00f2ff] transition-colors mb-2">
            {server.name}
          </h3>
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <Activity size={14} className="text-[#00f2ff]" />
              {server.ip}:{server.port}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} className="text-[#bc13fe]" />
              {server.map}
            </span>
          </div>
        </div>

        {/* Player Counter HUD */}
        <div className="flex-shrink-0 w-full md:w-48">
          <div className="flex justify-between items-center mb-1 text-xs font-orbitron text-slate-400">
            <span className="flex items-center gap-1 uppercase tracking-tighter">
              <Users size={12} /> Live Load
            </span>
            <span>{server.players} / {server.maxPlayers}</span>
          </div>
          <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${playerPercentage}%` }}
              className={`h-full bg-gradient-to-r from-[#00f2ff] to-[#bc13fe] shadow-[0_0_8px_#00f2ff]`}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0">
          <button
            onClick={() => onVote(server.id)}
            className="relative px-6 py-3 bg-[#00f2ff]/10 hover:bg-[#00f2ff]/20 border border-[#00f2ff]/40 rounded-lg text-[#00f2ff] font-orbitron text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95 group/btn"
          >
            <ArrowUpCircle size={18} className="group-hover/btn:-translate-y-1 transition-transform" />
            Vote Now
            <div className="absolute inset-0 bg-[#00f2ff] opacity-0 group-hover:opacity-10 blur-xl transition-opacity"></div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServerCard;
