"use client";

import { useState } from "react";
import { Percent, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [result, setResult] = useState<{
    finalPrice: number;
    savings: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (isNaN(p) || isNaN(d)) return;
    const final = p * (1 - d / 100);
    setResult({ finalPrice: final, savings: p - final });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/ferramentas" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 mb-6">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="rounded-xl bg-green-100 p-3">
          <Percent className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calculadora de Desconto</h1>
          <p className="text-sm text-gray-500">Calcule o preço final com desconto</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço Original (R$)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 99.90"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Desconto (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Ex: 15"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <button
            onClick={calculate}
            className="w-full rounded-xl bg-green-500 py-3 text-lg font-bold text-white transition-colors hover:bg-green-600"
          >
            Calcular
          </button>
        </div>

        {result && (
          <div className="mt-6 rounded-xl bg-green-50 p-6 text-center">
            <p className="text-sm text-gray-500">Preço Final</p>
            <p className="text-4xl font-extrabold text-green-600">
              R$ {result.finalPrice.toFixed(2).replace(".", ",")}
            </p>
            <p className="mt-2 text-sm font-medium text-green-700">
              Você economiza R$ {result.savings.toFixed(2).replace(".", ",")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
