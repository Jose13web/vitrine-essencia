"use client";

import { useState, useRef } from "react";
import { QrCode, ArrowLeft, Download } from "lucide-react";
import Link from "next/link";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [generated, setGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async () => {
    if (!text.trim()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    const moduleCount = 25;
    const cellSize = size / moduleCount;

    const seed = hashString(text);
    const random = seededRandom(seed);

    ctx.fillStyle = "#000000";

    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (isFinderPattern(row, col, moduleCount)) continue;

        if (random() > 0.5) {
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    }

    drawFinderPattern(ctx, 0, 0, cellSize);
    drawFinderPattern(ctx, (moduleCount - 7) * cellSize, 0, cellSize);
    drawFinderPattern(ctx, 0, (moduleCount - 7) * cellSize, cellSize);

    setGenerated(true);
  };

  const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const seededRandom = (seed: number) => {
    let s = seed;
    return () => {
      s = (s * 16807 + 0) % 2147483647;
      return s / 2147483647;
    };
  };

  const isFinderPattern = (row: number, col: number, size: number): boolean => {
    if (row < 8 && col < 8) return true;
    if (row < 8 && col >= size - 8) return true;
    if (row >= size - 8 && col < 8) return true;
    return false;
  };

  const drawFinderPattern = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    cellSize: number
  ) => {
    const size = 7 * cellSize;

    ctx.fillStyle = "#000000";
    ctx.fillRect(x, y, size, size);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize);

    ctx.fillStyle = "#000000";
    ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize);
  };

  const downloadQR = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "qrcode-vitrine.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/ferramentas" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 mb-6">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="rounded-xl bg-red-100 p-3">
          <QrCode className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerador de QR Code</h1>
          <p className="text-sm text-gray-500">Gere QR Code para links ou textos</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL ou Texto</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://exemplo.com ou qualquer texto"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tamanho: {size}px</label>
            <input
              type="range"
              min="128"
              max="512"
              step="64"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <button
            onClick={generateQR}
            className="w-full rounded-xl bg-red-500 py-3 text-lg font-bold text-white transition-colors hover:bg-red-600"
          >
            Gerar QR Code
          </button>
        </div>

        {generated && (
          <div className="mt-6 text-center">
            <canvas
              ref={canvasRef}
              className="mx-auto rounded-xl border border-gray-200"
              style={{ imageRendering: "pixelated" }}
            />
            <button
              onClick={downloadQR}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              <Download className="h-4 w-4" />
              Baixar QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
