"use client";

import React from "react";
import { User, Star } from "lucide-react";

import Image from "next/image";

interface Member {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  isLeader?: boolean;
}

interface MembersContent {
  members?: Member[];
}

interface Props {
  content?: Record<string, unknown>;
}

export function MembersBlock({ content }: Props) {
  const typedContent = content as unknown as MembersContent;
  const members = typedContent?.members || [];

  if (members.length === 0) {
    return (
      <div className="w-full h-32 flex items-center justify-center border-2 border-dashed border-zinc-100 rounded-xl text-zinc-300 text-xs font-bold">
        メンバーが登録されていません
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl relative"
          >
            <div className="relative w-16 h-16 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-300 overflow-hidden shadow-inner shrink-0">
              {member.avatarUrl ? (
                <Image src={member.avatarUrl} alt={member.name} fill className="object-cover" />
              ) : (
                <User size={32} />
              )}
              {member.isLeader && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-white p-1 rounded-full shadow-sm z-10 translate-x-1/4 -translate-y-1/4">
                  <Star size={10} fill="currentColor" />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-1 min-w-0">
              <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 truncate">
                {member.name || "名称未設定"}
              </h4>
              <p className="text-xs text-[var(--muted)] truncate">
                {member.role || "役割未設定"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
