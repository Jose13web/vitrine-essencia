import Link from "next/link";
import { Search, Percent, ArrowRight, Tag, Zap, Gift } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
              <Zap className="h-4 w-4" />
              Ofertas Atualizadas Diariamente
            </div>
            <h1 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              Encontre as
              <span className="block text-yellow-300">Melhores Ofertas</span>
              da Shopee
            </h1>
            <p className="mt-4 max-w-lg text-lg text-orange-100">
              Economize com cupons exclusivos, comparador de preços e ofertas
              selecionadas todos os dias.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/produtos"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-orange-600 shadow-lg transition-all hover:bg-yellow-50 hover:shadow-xl"
              >
                <Tag className="h-5 w-5" />
                Ver Ofertas
              </Link>
              <Link
                href="/cupons"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
              >
                <Percent className="h-5 w-5" />
                Cupons de Desconto
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <Gift className="h-10 w-10 text-yellow-300" />
                <h3 className="mt-3 font-bold text-white">Cupons Exclusivos</h3>
                <p className="mt-1 text-sm text-orange-100">
                  Até 30% off com cupons atualizados
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <Percent className="h-10 w-10 text-yellow-300" />
                <h3 className="mt-3 font-bold text-white">Comparar Preços</h3>
                <p className="mt-1 text-sm text-orange-100">
                  Encontre o melhor preço automaticamente
                </p>
              </div>
              <div className="col-span-2 rounded-2xl bg-white/10 p-6 backdrop-blur text-center">
                <h3 className="font-bold text-white text-lg">+5.000 Ofertas Verificadas</h3>
                <p className="mt-1 text-sm text-orange-100">
                  Atualizadas diariamente para você nunca perder uma promoção
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
