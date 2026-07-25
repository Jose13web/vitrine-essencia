"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, ExternalLink, Save, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  affiliateUrl: string;
  imageUrl: string;
  featured: boolean;
  active: boolean;
  categoryId: string;
  category?: { name: string };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/produtos");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/categorias");
    const data = await res.json();
    setCategories(data);
  };

  const handleSave = async () => {
    if (!editing) return;
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/produtos?id=${editing.id}` : "/api/produtos";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    setEditing(null);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    await fetch(`/api/produtos?id=${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
          <p className="mt-1 text-gray-600">{products.length} produtos cadastrados</p>
        </div>
        <button
          onClick={() =>
            setEditing({
              name: "",
              slug: "",
              description: "",
              price: 0,
              affiliateUrl: "",
              imageUrl: "",
              featured: false,
              active: true,
              categoryId: categories[0]?.id || "",
            })
          }
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" />
          Novo Produto
        </button>
      </div>

      {editing && (
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              {editing.id ? "Editar Produto" : "Novo Produto"}
            </h2>
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
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                value={editing.description || ""}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                rows={3}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
              <input
                type="number"
                value={editing.price || ""}
                onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço Original (R$)</label>
              <input
                type="number"
                value={editing.originalPrice || ""}
                onChange={(e) => setEditing({ ...editing, originalPrice: parseFloat(e.target.value) || null })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Afiliado</label>
              <input
                type="url"
                value={editing.affiliateUrl || ""}
                onChange={(e) => setEditing({ ...editing, affiliateUrl: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
              <input
                type="url"
                value={editing.imageUrl || ""}
                onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select
                value={editing.categoryId || ""}
                onChange={(e) => setEditing({ ...editing, categoryId: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editing.featured || false}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Destaque</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editing.active ?? true}
                  onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Ativo</span>
              </label>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-600"
            >
              <Save className="h-4 w-4" /> Salvar
            </button>
            <button
              onClick={() => setEditing(null)}
              className="inline-flex items-center gap-2 rounded-xl bg-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Produto</th>
                  <th className="px-4 py-3 font-medium">Categoria</th>
                  <th className="px-4 py-3 font-medium">Preço</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">{product.name}</p>
                      {product.featured && (
                        <span className="text-xs text-orange-500">★ Destaque</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{product.category?.name}</td>
                    <td className="px-4 py-3 font-medium text-orange-600">
                      R$ {product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          product.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.active ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditing(product)}
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <a
                          href={product.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-green-600"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
