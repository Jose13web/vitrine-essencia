"use client";

import Link from "next/link";
import { Package, Tags, Ticket, FileText, BarChart3 } from "lucide-react";

const sections = [
  {
    title: "Produtos",
    description: "Gerenciar produtos, preços e afiliados",
    href: "/admin/produtos",
    icon: Package,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Categorias",
    description: "Organizar categorias de produtos",
    href: "/admin/categorias",
    icon: Tags,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Cupons",
    description: "Criar e gerenciar cupons de desconto",
    href: "/admin/cupons",
    icon: Ticket,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Blog",
    description: "Escrever e publicar artigos",
    href: "/admin/blog",
    icon: FileText,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
        <p className="mt-2 text-gray-600">Gerencie todos os conteúdos do site</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:border-gray-300"
            >
              <div className={`inline-flex rounded-xl p-3 ${section.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                {section.title}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{section.description}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-bold text-gray-800">Visão Geral</h2>
        </div>
        <p className="text-sm text-gray-500">
          As estatísticas serão exibidas aqui após o cadastro de produtos e conteúdos.
        </p>
      </div>
    </div>
  );
}
