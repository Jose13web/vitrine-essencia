"use client";

import { useState } from "react";
import { Scale, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PriceComparator() {
  const [prices, setPrices] = useState<string[]>(["", ""]);
  const [result, setResult] = useState<{
    cheapest: number;
    cheapestIndex: number;
    savings: number;
  } | null>(null);

  const addPrice = () => {
    setPrices([...prices, ""]);
  };

  const removePrice = (index: number) => {
    if (prices.length <= 2) return;
    const newPrices = prices.filter((_, i) => i !== index);
    setPrices(newPrices);
    setResult(null);
  };

  const updatePrice = (index: number, value: string) => {
    const newPrices = [...prices];
    newPrices[index] = value;
    setPrices(newPrices);
  };

  const calculate = () => {
    const nums = prices.map((p) => parseFloat(p)).filter((p) => !isNaN(p));
    if (nums.length < 2) return;

    const cheapest = Math.min(...nums);
    const mostExpensive = Math.max(...nums);
    const cheapestIndex = nums.indexOf(cheapest);

    setResult({
      cheapest,
      cheapestIndex,
      savings: mostExpensive - cheapest,
    });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/ferramentas" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 mb-6">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="rounded-xl bg-purple-100 p-3">
          <Scale className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Comparador de Preços</h1>
          <p className="text-sm text-gray-500">Compare preços e encontre o melhor negócio</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="space-y-3">
          {prices.map((price, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-20 shrink-0 text-sm font-medium text-gray-600">
                Opção {i + 1}:
              </span>
              <input
                type="number"
                value={price}
                onChange={(e) => updatePrice(i, e.target.value)}
                placeholder="R$ 0,00"
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              {prices.length > 2 && (
                <button
                  onClick={() => removePrice(i)}
                  className="rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={addPrice}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            + Adicionar preço
          </button>
          <button
            onClick={calculate}
            className="flex-1 rounded-xl bg-purple-500 py-3 text-lg font-bold text-white transition-colors hover:bg-purple-600"
          >
            Comparar
          </button>
        </div>

        {result && (
          <div className="mt-6 rounded-xl bg-purple-50 p-6 text-center">
            <p className="text-sm text-gray-500">Melhor preço na Opção</p>
            <p className="text-4xl font-extrabold text-purple-600">
              {result.cheapestIndex + 1}
            </p>
            <p className="text-lg font-bold text-gray-800">
              R$ {result.cheapest.toFixed(2).replace(".", ",")}
            </p>
            <p className="mt-2 text-sm font-medium text-green-600">
              Economia de R$ {result.savings.toFixed(2).replace(".", ",")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
