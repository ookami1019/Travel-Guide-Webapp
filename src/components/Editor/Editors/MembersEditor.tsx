import React from "react";
import Image from "next/image";
import { Plus, Trash2, GripVertical, User } from "lucide-react";

interface Member {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

interface MembersContent {
  members?: Member[];
}

interface Props {
  content: Record<string, unknown>;
  onChange: (newContent: Record<string, unknown>) => void;
}

export function MembersEditor({ content, onChange }: Props) {
  const typedContent = content as unknown as MembersContent;
  const members = typedContent.members || [];

  const addMember = () => {
    const newMember: Member = {
      id: Math.random().toString(36).substring(2, 9),
      name: "メンバー名",
      role: "役割 (例: 運転手)",
    };
    onChange({ ...content, members: [...members, newMember] });
  };

  const updateMember = (id: string, updates: Partial<Member>) => {
    const newMembers = members.map(m => m.id === id ? { ...m, ...updates } : m);
    onChange({ ...content, members: newMembers });
  };

  const removeMember = (id: string) => {
    onChange({ ...content, members: members.filter(m => m.id !== id) });
  };

  return (
    <div className="space-y-3">
      {members.map((member) => (
        <div key={member.id} className="bg-white border text-xs border-zinc-200 rounded-lg p-2 flex items-center gap-3">
          <GripVertical size={14} className="text-zinc-300 cursor-grab shrink-0" />

          <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 overflow-hidden relative">
            {member.avatarUrl ? (
              <Image src={member.avatarUrl} alt={member.name} fill className="object-cover" />
            ) : (
              <User size={14} className="text-zinc-400" />
            )}
          </div>

          <div className="flex-1 flex flex-col gap-1.5 min-w-0">
            <input
              type="text"
              value={member.name}
              placeholder="名前"
              onChange={(e) => updateMember(member.id, { name: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 rounded px-2 py-1 text-xs font-bold focus:ring-1 focus:ring-indigo-500 outline-none"
            />
            <input
              type="text"
              value={member.role}
              placeholder="役割"
              onChange={(e) => updateMember(member.id, { role: e.target.value })}
              className="w-full bg-transparent border border-transparent rounded px-1 py-0.5 text-[10px] text-zinc-500 focus:bg-zinc-50 focus:border-zinc-200 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>

          <button
            onClick={() => removeMember(member.id)}
            className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded text-zinc-300 transition-colors shrink-0"
          >
            <Trash2 size={12} />
          </button>
        </div>
      ))}

      <button
        onClick={addMember}
        className="w-full py-2 border-2 border-dashed border-zinc-200 rounded-lg text-zinc-500 text-xs font-bold flex items-center justify-center gap-2 hover:bg-zinc-50 hover:border-zinc-300 transition-all mt-2"
      >
        <Plus size={14} /> メンバーを追加
      </button>
    </div>
  );
}
