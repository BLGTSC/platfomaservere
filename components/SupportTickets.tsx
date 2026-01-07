
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Added Shield to the imports from lucide-react
import { MessageSquare, Plus, Send, Clock, ChevronRight, XCircle, Shield } from 'lucide-react';
import { Ticket, TicketReply, User } from '../types';

interface SupportTicketsProps {
  user: User;
  isAdmin: boolean;
}

const MOCK_TICKETS: Ticket[] = [
  { id: 'T1', userId: 'u2', subject: 'Server Vote not counting', category: 'Technical', status: 'Responded', createdAt: new Date(), lastUpdate: new Date() },
  { id: 'T2', userId: 'u3', subject: 'Inappropriate player behavior', category: 'Abuse', status: 'Open', createdAt: new Date(), lastUpdate: new Date() },
];

const SupportTickets: React.FC<SupportTicketsProps> = ({ user, isAdmin }) => {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const filteredTickets = isAdmin ? tickets : tickets.filter(t => t.userId === user.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'text-green-400 border-green-500/30 bg-green-500/10';
      case 'Responded': return 'text-[#00f2ff] border-[#00f2ff]/30 bg-[#00f2ff]/10';
      case 'Closed': return 'text-slate-500 border-slate-700 bg-slate-800/50';
      default: return 'text-white';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[700px]">
      {/* Sidebar: Ticket List */}
      <div className="lg:col-span-4 glass-panel border border-white/10 rounded-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h2 className="font-orbitron font-bold text-sm tracking-widest text-white uppercase flex items-center gap-2">
            <MessageSquare size={16} className="text-[#00f2ff]" /> Communication Channels
          </h2>
          {!isAdmin && (
            <button 
              onClick={() => setShowCreate(true)}
              className="p-1.5 bg-[#00f2ff]/20 text-[#00f2ff] rounded-md hover:bg-[#00f2ff]/30 transition-all"
            >
              <Plus size={18} />
            </button>
          )}
        </div>
        
        <div className="flex-grow overflow-y-auto p-2 space-y-2 custom-scrollbar">
          {filteredTickets.map(ticket => (
            <motion.div
              key={ticket.id}
              whileHover={{ x: 4 }}
              onClick={() => setSelectedTicket(ticket)}
              className={`p-4 rounded-xl cursor-pointer border transition-all ${
                selectedTicket?.id === ticket.id 
                  ? 'bg-gradient-to-r from-[#00f2ff]/10 to-transparent border-[#00f2ff]/30' 
                  : 'bg-black/20 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] px-2 py-0.5 rounded border font-orbitron uppercase ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">#{ticket.id}</span>
              </div>
              <h3 className="text-sm font-semibold text-white truncate mb-1">{ticket.subject}</h3>
              <div className="flex justify-between items-center text-[10px] text-slate-500">
                <span className="text-[#bc13fe]">{ticket.category}</span>
                <span className="flex items-center gap-1"><Clock size={10} /> 2h ago</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Area: Chat/Details */}
      <div className="lg:col-span-8 glass-panel border border-white/10 rounded-2xl flex flex-col relative overflow-hidden">
        {selectedTicket ? (
          <>
            <div className="p-6 border-b border-white/5 bg-white/2 bg-gradient-to-r from-[#00f2ff]/5 to-transparent">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-orbitron font-bold text-white mb-1">{selectedTicket.subject}</h2>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                    CATEGORY: <span className="text-[#bc13fe]">{selectedTicket.category}</span> | STATUS: {selectedTicket.status}
                  </p>
                </div>
                {isAdmin && (
                   <button className="px-4 py-2 border border-red-500/30 text-red-400 text-xs font-orbitron rounded-lg hover:bg-red-500/10 transition-all flex items-center gap-2">
                     <XCircle size={14} /> Close Terminal
                   </button>
                )}
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {/* Mock Replies */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-white/10"></div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Hello support team, I've voted for the server Cyber Arena multiple times today but the count is still stuck at 1240. Can you please investigate this anomaly?
                  </p>
                  <span className="text-[10px] text-slate-500 block mt-2 font-mono">10:45 AM // USER</span>
                </div>
              </div>

              <div className="flex gap-4 flex-row-reverse">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00f2ff]/20 border border-[#00f2ff]/40 flex items-center justify-center">
                  <Shield size={20} className="text-[#00f2ff]" />
                </div>
                <div className="bg-[#00f2ff]/10 border border-[#00f2ff]/20 p-4 rounded-2xl rounded-tr-none max-w-[80%]">
                  <p className="text-sm text-white leading-relaxed">
                    Greetings Citizen. We have detected a synchronization lag in our neural grid. Your vote has been logged and will appear in the next cycle (approx. 15 minutes). Thank you for your patience.
                  </p>
                  <span className="text-[10px] text-[#00f2ff] block mt-2 font-mono">11:02 AM // BLG_ADMIN</span>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-black/40">
              <div className="relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Transmit message through encrypted channel..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pr-16 text-sm focus:outline-none focus:border-[#00f2ff] transition-all resize-none h-24"
                />
                <button 
                  className="absolute right-4 bottom-4 p-3 bg-[#00f2ff] text-black rounded-lg hover:shadow-[0_0_15px_#00f2ff] hover:scale-105 active:scale-95 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-slate-500 opacity-40">
            <MessageSquare size={64} className="mb-4" />
            <p className="font-orbitron text-sm tracking-widest uppercase">Awaiting Data Connection</p>
          </div>
        )}
      </div>

      {/* New Ticket Modal Simulation */}
      <AnimatePresence>
        {showCreate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-lg glass-panel border border-[#00f2ff]/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,242,255,0.1)]"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-[#00f2ff]/10 to-transparent">
                <h2 className="text-2xl font-orbitron font-black text-white">NEW TICKET</h2>
                <button onClick={() => setShowCreate(false)} className="text-slate-500 hover:text-white transition-colors">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-[10px] font-orbitron text-[#00f2ff] uppercase mb-2 tracking-widest">Subject Header</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#00f2ff]" />
                </div>
                <div>
                  <label className="block text-[10px] font-orbitron text-[#00f2ff] uppercase mb-2 tracking-widest">Protocol Type</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#00f2ff]">
                    <option>Technical Issue</option>
                    <option>Billing / BattlePass</option>
                    <option>Report Misconduct</option>
                    <option>General Intel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-orbitron text-[#00f2ff] uppercase mb-2 tracking-widest">Transmission Data</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#00f2ff] h-32 resize-none" />
                </div>
                <button className="w-full py-4 bg-[#00f2ff] text-black font-orbitron font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_#00f2ff] transition-all">
                  Initialize Transmission
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupportTickets;
