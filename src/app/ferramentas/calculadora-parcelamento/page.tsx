"use client";

import { useState } from "react";
import { Calculator, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function InstallmentCalculator() {
  const [price, setPrice] = useState("");
  const [installments, setInstallments] = useState("");
  const [interestRate, setInterestRate] = useState("1.99");
  const [result, setResult] = useState<{
    installmentValue: number;
    totalValue: number;
    totalInterest: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const n = parseInt(installments);
    const r = parseFloat(interestRate) / 100;
    if (isNaN(p) || isNaN(n) || n <= 0) return;

    if (r === 0) {
      setResult({
        installmentValue: p / n,
        totalValue: p,
        totalInterest: 0,
      });
    } else {
      const installment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = installment * n;
      setResult({
        installmentValue: installment,
        totalValue: total,
        totalInterest: total - p,
      });
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/ferramentas" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 mb-6">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="rounded-xl bg-blue-100 p-3">
          <Calculator className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calculadora de Parcelamento</h1>
          <p className="text-sm text-gray-500">Simule parcelamentos com ou sem juros</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor Total (R$)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 499.90"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parcelas</label>
              <input
                type="number"
                value={installments}
                onChange={(e) => setInstallments(e.target.value)}
                placeholder="Ex: 12"
                min="1"
                max="48"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Juros Mensal (%)</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Ex: 1.99"
                step="0.01"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={calculate}
            className="w-full rounded-xl bg-blue-500 py-3 text-lg font-bold text-white transition-colors hover:bg-blue-600"
          >
            Calcular
          </button>
        </div>

        {result && (
          <div className="mt-6 space-y-3">
            <div className="rounded-xl bg-blue-50 p-4 text-center">
              <p className="text-sm text-gray-500">Valor da Parcela</p>
              <p className="text-3xl font-extrabold text-blue-600">
                R$ {result.installmentValue.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-sm text-gray-500">
                {installments}x de R$ {result.installmentValue.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-50 p-3 text-center">
                <p className="text-xs text-gray-500">Valor Total</p>
                <p className="font-bold text-gray-800">
                  R$ {result.totalValue.toFixed(2).replace(".", ",")}
                </p>
              </div>
              <div className="rounded-xl bg-red-50 p-3 text-center">
                <p className="text-xs text-gray-500">Juros Totais</p>
                <p className="font-bold text-red-600">
                  R$ {result.totalInterest.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
