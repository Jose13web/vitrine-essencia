import Link from "next/link";
import { Calculator, Percent, Scale, Ruler, QrCode } from "lucide-react";

const tools = [
  {
    name: "Calculadora de Desconto",
    description: "Calcule o preço final com desconto instantaneamente.",
    href: "/ferramentas/calculadora-desconto",
    icon: Percent,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Calculadora de Parcelamento",
    description: "Simule parcelamentos e veja o valor total com juros.",
    href: "/ferramentas/calculadora-parcelamento",
    icon: Calculator,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Comparador de Preços",
    description: "Compare preços e calcule a diferença entre produtos.",
    href: "/ferramentas/comparador-precos",
    icon: Scale,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Conversor de Medidas",
    description: "Converta unidades de comprimento, peso, temperatura e mais.",
    href: "/ferramentas/conversor-medidas",
    icon: Ruler,
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Gerador de QR Code",
    description: "Gere QR Code para links, textos ou mensagens.",
    href: "/ferramentas/qr-code",
    icon: QrCode,
    color: "bg-red-100 text-red-600",
  },
];

export const metadata = {
  title: "Ferramentas Gratuitas",
  description: "Ferramentas gratuitas para ajudar nas suas compras online.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Ferramentas Gratuitas</h1>
      <p className="mt-2 text-gray-600">Ferramentas úteis para suas compras online</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:border-orange-200"
            >
              <div className={`inline-flex rounded-xl p-3 ${tool.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                {tool.name}
              </h2>
              <p className="mt-2 text-sm text-gray-500">{tool.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
