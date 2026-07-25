"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  discount: string;
  description?: string | null;
  active: boolean;
  productId: string;
  product?: { name: string };
}

interface Product {
  id: string;
  name: string;
}

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Partial<Coupon> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoupons();
    fetchProducts();
  }, []);

  const fetchCoupons = async () => {
    const res = await fetch("/api/cupons");
    const data = await res.json();
    setCoupons(data);
    setLoading(false);
  };

  const fetchProducts = async () => {
    const res = await fetch("/api/produtos");
    const data = await res.json();
    setProducts(data);
  };

  const handleSave = async () => {
    if (!editing) return;
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/cupons?id=${editing.id}` : "/api/cupons";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    setEditing(null);
    fetchCoupons();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este cupom?")) return;
    await fetch(`/api/cupons?id=${id}`, { method: "DELETE" });
    fetchCoupons();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cupons</h1>
          <p className="mt-1 text-gray-600">{coupons.length} cupons cadastrados</p>
        </div>
        <button
          onClick={() => setEditing({ code: "", discount: "", description: "", active: true, productId: products[0]?.id || "" })}
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" /> Novo Cupom
        </button>
      </div>

      {editing && (
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">{editing.id ? "Editar" : "Novo"} Cupom</h2>
            <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
              <input
                type="text"
                value={editing.code || ""}
                onChange={(e) => setEditing({ ...editing, code: e.target.value.toUpperCase() })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 font-mono focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Desconto</label>
              <input
                type="text"
                value={editing.discount || ""}
                onChange={(e) => setEditing({ ...editing, discount: e.target.value })}
                placeholder="Ex: 10% ou Frete Grátis"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Produto</label>
              <select
                value={editing.productId || ""}
                onChange={(e) => setEditing({ ...editing, productId: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
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
                <th className="px-4 py-3 font-medium">Código</th>
                <th className="px-4 py-3 font-medium">Desconto</th>
                <th className="px-4 py-3 font-medium">Produto</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono font-bold text-green-600">{coupon.code}</td>
                  <td className="px-4 py-3">{coupon.discount}</td>
                  <td className="px-4 py-3 text-gray-600">{coupon.product?.name}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${coupon.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {coupon.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => setEditing(coupon)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(coupon.id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600">
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
