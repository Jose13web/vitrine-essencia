"use client";

import { useState } from "react";
import { Ruler, ArrowLeft } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Comprimento",
    units: [
      { name: "Metros (m)", factor: 1 },
      { name: "Centímetros (cm)", factor: 0.01 },
      { name: "Milímetros (mm)", factor: 0.001 },
      { name: "Quilômetros (km)", factor: 1000 },
      { name: "Polegadas (in)", factor: 0.0254 },
      { name: "Pés (ft)", factor: 0.3048 },
    ],
  },
  {
    name: "Peso",
    units: [
      { name: "Quilogramas (kg)", factor: 1 },
      { name: "Gramas (g)", factor: 0.001 },
      { name: "Miligramas (mg)", factor: 0.000001 },
      { name: "Libras (lb)", factor: 0.453592 },
      { name: "Onças (oz)", factor: 0.0283495 },
    ],
  },
  {
    name: "Temperatura",
    units: [
      { name: "Celsius (°C)", factor: 0 },
      { name: "Fahrenheit (°F)", factor: 0 },
      { name: "Kelvin (K)", factor: 0 },
    ],
  },
  {
    name: "Volume",
    units: [
      { name: "Litros (L)", factor: 1 },
      { name: "Mililitros (mL)", factor: 0.001 },
      { name: "Galões (gal)", factor: 3.78541 },
    ],
  },
];

export default function UnitConverter() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [fromUnit, setFromUnit] = useState(0);
  const [toUnit, setToUnit] = useState(1);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const convert = () => {
    const v = parseFloat(value);
    if (isNaN(v)) return;

    const cat = categories[selectedCategory];

    if (cat.name === "Temperatura") {
      let celsius: number;
      if (fromUnit === 0) celsius = v;
      else if (fromUnit === 1) celsius = (v - 32) * (5 / 9);
      else celsius = v - 273.15;

      let finalValue: number;
      if (toUnit === 0) finalValue = celsius;
      else if (toUnit === 1) finalValue = celsius * (9 / 5) + 32;
      else finalValue = celsius + 273.15;

      setResult(finalValue.toFixed(2));
    } else {
      const baseValue = v * cat.units[fromUnit].factor;
      const finalValue = baseValue / cat.units[toUnit].factor;
      setResult(finalValue.toFixed(4));
    }
  };

  const currentUnits = categories[selectedCategory].units;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/ferramentas" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 mb-6">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="rounded-xl bg-orange-100 p-3">
          <Ruler className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Conversor de Medidas</h1>
          <p className="text-sm text-gray-500">Converta entre diferentes unidades de medida</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => {
                setSelectedCategory(i);
                setFromUnit(0);
                setToUnit(1);
                setValue("");
                setResult(null);
              }}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === i
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Digite o valor"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">De</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(parseInt(e.target.value))}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                {currentUnits.map((unit, i) => (
                  <option key={unit.name} value={i}>{unit.name}</option>
                ))}
              </select>
            </div>
            <div className="pb-3 text-2xl font-bold text-orange-500">→</div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Para</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(parseInt(e.target.value))}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                {currentUnits.map((unit, i) => (
                  <option key={unit.name} value={i}>{unit.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={convert}
            className="w-full rounded-xl bg-orange-500 py-3 text-lg font-bold text-white transition-colors hover:bg-orange-600"
          >
            Converter
          </button>
        </div>

        {result && (
          <div className="mt-6 rounded-xl bg-orange-50 p-6 text-center">
            <p className="text-sm text-gray-500">Resultado</p>
            <p className="text-4xl font-extrabold text-orange-600">
              {result} {currentUnits[toUnit].name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
