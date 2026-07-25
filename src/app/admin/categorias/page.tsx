"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  order: number;
  _count?: { products: number };
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Partial<Category> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("/api/categorias");
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/categorias?id=${editing.id}` : "/api/categorias";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    setEditing(null);
    fetchCategories();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir esta categoria?")) return;
    await fetch(`/api/categorias?id=${id}`, { method: "DELETE" });
    fetchCategories();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
          <p className="mt-1 text-gray-600">{categories.length} categorias</p>
        </div>
        <button
          onClick={() => setEditing({ name: "", slug: "", description: "", image: "", order: 0 })}
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" /> Nova Categoria
        </button>
      </div>

      {editing && (
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">{editing.id ? "Editar" : "Nova"} Categoria</h2>
            <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                value={editing.name || ""}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                value={editing.slug || ""}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emoji/Ícone</label>
              <input
                type="text"
                value={editing.image || ""}
                onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                placeholder="📱"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ordem</label>
              <input
                type="number"
                value={editing.order || 0}
                onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <input
                type="text"
                value={editing.description || ""}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-600">
              <Save className="h-4 w-4" /> Salvar
            </button>
            <button onClick={() => setEditing(null)} className="rounded-xl bg-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-300">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium">Categoria</th>
                <th className="px-4 py-3 font-medium">Produtos</th>
                <th className="px-4 py-3 font-medium">Ordem</th>
                <th className="px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{cat.image || "📦"}</span>
                      <div>
                        <p className="font-medium text-gray-800">{cat.name}</p>
                        <p className="text-xs text-gray-500">{cat.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{cat._count?.products || 0}</td>
                  <td className="px-4 py-3 text-gray-600">{cat.order}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => setEditing(cat)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
