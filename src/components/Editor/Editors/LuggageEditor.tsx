import React from "react";
import { Plus, Trash2, GripVertical, CheckSquare } from "lucide-react";

interface LuggageItem {
  id: string;
  name: string;
  isChecked: boolean;
}

interface LuggageCategory {
  id: string;
  name: string;
  items: LuggageItem[];
}

interface LuggageContent {
  categories?: LuggageCategory[];
}

interface Props {
  content: Record<string, unknown>;
  onChange: (newContent: Record<string, unknown>) => void;
}

export function LuggageEditor({ content, onChange }: Props) {
  const typedContent = content as unknown as LuggageContent;
  const categories = typedContent.categories || [];

  const addCategory = () => {
    const newCategory: LuggageCategory = {
      id: Math.random().toString(36).substring(2, 9),
      name: "新しいカテゴリ",
      items: [],
    };
    onChange({ ...content, categories: [...categories, newCategory] });
  };

  const updateCategory = (categoryId: string, updates: Partial<LuggageCategory>) => {
    const newCats = categories.map(c => c.id === categoryId ? { ...c, ...updates } : c);
    onChange({ ...content, categories: newCats });
  };

  const removeCategory = (categoryId: string) => {
    onChange({ ...content, categories: categories.filter(c => c.id !== categoryId) });
  };

  const addItemToCategory = (categoryId: string) => {
    const newItem: LuggageItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: "持ち物",
      isChecked: false,
    };
    const newCats = categories.map(c => {
      if (c.id === categoryId) {
        return { ...c, items: [...c.items, newItem] };
      }
      return c;
    });
    onChange({ ...content, categories: newCats });
  };

  const updateItem = (categoryId: string, itemId: string, updates: Partial<LuggageItem>) => {
    const newCats = categories.map(c => {
      if (c.id === categoryId) {
        return {
          ...c,
          items: c.items.map(item => item.id === itemId ? { ...item, ...updates } : item)
        };
      }
      return c;
    });
    onChange({ ...content, categories: newCats });
  };

  const removeItem = (categoryId: string, itemId: string) => {
    const newCats = categories.map(c => {
      if (c.id === categoryId) {
        return { ...c, items: c.items.filter(item => item.id !== itemId) };
      }
      return c;
    });
    onChange({ ...content, categories: newCats });
  };

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.id} className="bg-white dark:bg-zinc-950 border text-xs border-zinc-200 dark:border-zinc-800 rounded-lg p-3 space-y-3 relative group">
          <div className="flex gap-2 items-center mb-1">
            <GripVertical size={14} className="text-zinc-400 cursor-grab" />
            <input
              type="text"
              value={category.name}
              onChange={(e) => updateCategory(category.id, { name: e.target.value })}
              className="font-bold text-xs bg-transparent border-b border-transparent text-zinc-900 dark:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-indigo-500 outline-none px-1 py-0.5"
            />
            <button
              onClick={() => removeCategory(category.id)}
              className="ml-auto p-1 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 rounded text-zinc-300 dark:text-zinc-500 transition-colors"
            >
              <Trash2 size={12} />
            </button>
          </div>

          <div className="space-y-2 pl-6">
            {category.items.map(item => (
              <div key={item.id} className="flex items-center gap-2 group/item">
                <CheckSquare size={14} className="text-zinc-300 dark:text-zinc-600" />
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(category.id, item.id, { name: e.target.value })}
                  className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-indigo-500 outline-none"
                />
                <button
                  onClick={() => removeItem(category.id, item.id)}
                  className="p-1 opacity-0 group-hover/item:opacity-100 hover:text-red-500 text-zinc-400 dark:text-zinc-500 transition-all rounded"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            <button
              onClick={() => addItemToCategory(category.id)}
              className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center gap-1 mt-1"
            >
              <Plus size={10} /> アイテムを追加
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addCategory}
        className="w-full py-2 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-500 dark:text-zinc-400 text-xs font-bold flex items-center justify-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
      >
        <Plus size={14} /> カテゴリを追加
      </button>
    </div>
  );
}
