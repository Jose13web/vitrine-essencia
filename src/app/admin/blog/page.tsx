"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Save, X, Eye } from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  imageUrl?: string | null;
  tags: string;
  published: boolean;
}

export default function AdminBlog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Partial<Article> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const res = await fetch("/api/blog");
    const data = await res.json();
    setArticles(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/blog?id=${editing.id}` : "/api/blog";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    setEditing(null);
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este artigo?")) return;
    await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
    fetchArticles();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
          <p className="mt-1 text-gray-600">{articles.length} artigos</p>
        </div>
        <button
          onClick={() => setEditing({ title: "", slug: "", excerpt: "", content: "", tags: "", published: false })}
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" /> Novo Artigo
        </button>
      </div>

      {editing && (
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">{editing.id ? "Editar" : "Novo"} Artigo</h2>
            <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={editing.title || ""}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resumo</label>
              <input
                type="text"
                value={editing.excerpt || ""}
                onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo (Markdown)</label>
              <textarea
                value={editing.content || ""}
                onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                rows={12}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 font-mono text-sm focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (separadas por vírgula)</label>
              <input
                type="text"
                value={editing.tags || ""}
                onChange={(e) => setEditing({ ...editing, tags: e.target.value })}
                placeholder="ofertas, shopee, dicas"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editing.published || false}
                onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700">Publicado</span>
            </label>
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
                <th className="px-4 py-3 font-medium">Título</th>
                <th className="px-4 py-3 font-medium">Tags</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{article.title}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{article.tags}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${article.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {article.published ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <a href={`/blog/${article.slug}`} target="_blank" className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-green-600">
                        <Eye className="h-4 w-4" />
                      </a>
                      <button onClick={() => setEditing(article)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(article.id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600">
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
