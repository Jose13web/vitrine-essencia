"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, Heart, User, ShoppingBag, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Ofertas" },
  { href: "/categorias", label: "Categorias" },
  { href: "/cupons", label: "Cupons" },
  { href: "/blog", label: "Blog" },
  { href: "/ferramentas", label: "Ferramentas" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/produtos?q=${encodeURIComponent(search.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-orange-600 shrink-0">
            <ShoppingBag className="h-6 w-6" />
            <span className="hidden sm:inline">Vitrine Shopee</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar ofertas, cupons, produtos..."
                className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/favoritos" className="rounded-full p-2 hover:bg-gray-100 transition-colors">
              <Heart className="h-5 w-5 text-gray-600" />
            </Link>
            <Link href="/auth" className="rounded-full p-2 hover:bg-gray-100 transition-colors">
              <User className="h-5 w-5 text-gray-600" />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-full p-2 hover:bg-gray-100 lg:hidden transition-colors"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t py-4 lg:hidden">
            <form onSubmit={handleSearch} className="mb-4 md:hidden">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar ofertas..."
                  className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-orange-500 focus:outline-none"
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </form>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
