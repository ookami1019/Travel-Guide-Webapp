"use client";

import React, { useState } from "react";
import { Plus, Trash2, User, Star } from "lucide-react";

interface Member {
  id: string;
  name: string;
  role: string;
  isLeader: boolean;
}

export function MembersBlock() {
  const [members, setMembers] = useState<Member[]>([
    { id: "1", name: "名前を入力", role: "リーダー", isLeader: true },
    { id: "2", name: "名前を入力", role: "会計", isLeader: false },
  ]);

  const addMember = () => {
    const newMember: Member = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      role: "",
      isLeader: false,
    };
    setMembers([...members, newMember]);
  };

  const updateMember = (id: string, field: keyof Member, value: any) => {
    setMembers(members.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const deleteMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl relative group"
          >
            <div className="relative w-16 h-16 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-300 overflow-hidden shadow-inner">
              <User size={32} />
              {member.isLeader && (
                <div className="absolute -top-1 -right-1 bg-yellow-400 text-white p-1 rounded-full shadow-sm">
                  <Star size={10} fill="currentColor" />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-1">
              <input
                type="text"
                value={member.name}
                placeholder="名前"
                onChange={(e) => updateMember(member.id, "name", e.target.value)}
                className="w-full bg-transparent font-bold text-sm focus:outline-none border-b border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 focus:border-[var(--primary)] transition-colors"
              />
              <input
                type="text"
                value={member.role}
                placeholder="役割（例: 運転手）"
                onChange={(e) => updateMember(member.id, "role", e.target.value)}
                className="w-full bg-transparent text-xs text-[var(--muted)] focus:outline-none"
              />
            </div>

            <button
              onClick={() => deleteMember(member.id)}
              className="p-1 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 transition-all absolute top-2 right-2"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addMember}
        className="w-full py-3 border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-xl text-[var(--muted)] hover:text-[var(--primary)] hover:border-indigo-500/20 transition-all flex items-center justify-center gap-2 text-xs font-medium"
      >
        <Plus size={14} />
        メンバーを追加
      </button>
    </div>
  );
}
