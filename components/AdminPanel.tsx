
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Trash2, Edit3, Plus, UserX, Server as ServerIcon, MessageCircle, Share2, Link as LinkIcon } from 'lucide-react';
import { GameServer, User, Partner } from '../types';
import SupportTickets from './SupportTickets';

interface AdminPanelProps {
  servers: GameServer[];
  users: User[];
  partners: Partner[];
  currentUser: User;
  onDeleteServer: (id: string) => void;
  onDeleteUser: (id: string) => void;
  onAddPartner: (p: Partner) => void;
  onDeletePartner: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ servers, users, partners, currentUser, onDeleteServer, onDeleteUser, onAddPartner, onDeletePartner }) => {
  const [activeTab, setActiveTab] = useState<'servers' | 'users' | 'tickets' | 'partners'>('servers');
  const [newPartner, setNewPartner] = useState({ name: '', imageUrl: '', link: '' });

  const handleAddPartner = () => {
    if (newPartner.name && newPartner.imageUrl) {
      onAddPartner({ ...newPartner, id: Math.random().toString(36).substr(2, 9) });
      setNewPartner({ name: '', imageUrl: '', link: '' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-[#bc13fe]/20 rounded-xl border border-[#bc13fe]/40 flex items-center justify-center">
          <Shield className="text-[#bc13fe]" size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-orbitron font-black text-white uppercase tracking-widest">
            BLG Control Center
          </h1>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">Authorized Personnel: {currentUser.email}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        {[
          { id: 'servers', label: 'Server Matrix', icon: ServerIcon, color: '#bc13fe' },
          { id: 'users', label: 'Access Protocols', icon: UserX, color: '#00f2ff' },
          { id: 'tickets', label: 'Support Nodes', icon: MessageCircle, color: '#facc15' },
          { id: 'partners', label: 'Partners', icon: Share2, color: '#10b981' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-orbitron text-sm transition-all border ${
              activeTab === tab.id
                ? `bg-white/5 text-white border-[${tab.color}]/50 shadow-[0_0_15px_${tab.color}44]`
                : 'bg-transparent border-white/5 text-slate-400 hover:bg-white/5 hover:border-white/10'
            }`}
          >
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl border border-white/10 p-6 min-h-[600px]"
      >
        {activeTab === 'servers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-orbitron text-white">Active Server Instances</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/40 text-green-400 rounded-lg hover:bg-green-600/30 transition-all font-orbitron text-xs">
                <Plus size={16} /> Deploy New Instance
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-white/5 font-orbitron text-slate-500 text-xs uppercase tracking-widest">
                  <tr>
                    <th className="pb-4 px-4">Identity</th>
                    <th className="pb-4 px-4">Endpoint</th>
                    <th className="pb-4 px-4">Activity</th>
                    <th className="pb-4 px-4 text-right">Commands</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {servers.map((server) => (
                    <tr key={server.id} className="border-b border-white/5 group hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-semibold text-white">{server.name}</td>
                      <td className="py-4 px-4 text-sm text-[#00f2ff]">{server.ip}:{server.port}</td>
                      <td className="py-4 px-4">
                         <div className="flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                           {server.players} / {server.maxPlayers}
                         </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:text-[#00f2ff] transition-colors"><Edit3 size={18} /></button>
                          <button onClick={() => onDeleteServer(server.id)} className="p-2 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h2 className="text-xl font-orbitron text-white mb-6">Neural Identity Database</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-center gap-4">
                    <img src={user.image || `https://picsum.photos/seed/${user.id}/40/40`} className="w-10 h-10 rounded-full border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]" alt="" />
                    <div>
                      <div className="font-bold text-white text-sm">{user.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono truncate max-w-[120px]">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] uppercase px-2 py-0.5 rounded border font-orbitron ${user.role === 'admin' ? 'border-[#bc13fe] text-[#bc13fe] bg-[#bc13fe]/10' : 'border-slate-700 text-slate-500'}`}>
                      {user.role}
                    </span>
                    <button onClick={() => onDeleteUser(user.id)} className="text-slate-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <SupportTickets user={currentUser} isAdmin={true} />
        )}

        {activeTab === 'partners' && (
          <div>
            <h2 className="text-xl font-orbitron text-white mb-6">Partner Banners Matrix</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-black/20 border border-white/5 rounded-xl space-y-4">
                <h3 className="text-sm font-orbitron text-[#00f2ff]">Add New Node</h3>
                <input 
                  placeholder="Partner Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs"
                  value={newPartner.name}
                  onChange={e => setNewPartner({...newPartner, name: e.target.value})}
                />
                <input 
                  placeholder="Banner URL (Image)" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs"
                  value={newPartner.imageUrl}
                  onChange={e => setNewPartner({...newPartner, imageUrl: e.target.value})}
                />
                <input 
                  placeholder="Redirect Link" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs"
                  value={newPartner.link}
                  onChange={e => setNewPartner({...newPartner, link: e.target.value})}
                />
                <button 
                  onClick={handleAddPartner}
                  className="w-full py-2 bg-green-600/20 text-green-400 border border-green-500/30 rounded-lg text-xs font-bold font-orbitron uppercase"
                >
                  Confirm Entry
                </button>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {partners.map(partner => (
                  <div key={partner.id} className="relative group glass-panel p-3 border border-white/10 rounded-xl overflow-hidden">
                    <img src={partner.imageUrl} className="w-full h-20 object-cover rounded-lg opacity-60 group-hover:opacity-100 transition-all" alt={partner.name} />
                    <div className="mt-2 flex justify-between items-center">
                      <div>
                        <div className="text-xs font-bold text-white">{partner.name}</div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1"><LinkIcon size={10} /> {partner.link || 'No Link'}</div>
                      </div>
                      <button onClick={() => onDeletePartner(partner.id)} className="p-2 text-red-500/50 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminPanel;
