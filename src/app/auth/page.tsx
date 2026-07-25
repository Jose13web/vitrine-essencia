"use client";

import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (isLogin) {
      setMessage("Funcionalidade de login será integrada com NextAuth.");
    } else {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          setMessage("Conta criada com sucesso! Faça login.");
          setIsLogin(true);
        } else {
          setMessage(data.error || "Erro ao criar conta.");
        }
      } catch {
        setMessage("Erro ao criar conta.");
      }
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-8">
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
            <User className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            {isLogin ? "Entrar" : "Criar Conta"}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {isLogin
              ? "Acesse sua conta para salvar favoritos"
              : "Crie uma conta para salvar seus produtos favoritos"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Seu nome"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Sua senha"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {message && (
            <p className={`rounded-lg p-3 text-sm ${message.includes("sucesso") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 py-3 text-lg font-bold text-white transition-colors hover:bg-orange-600"
          >
            {isLogin ? "Entrar" : "Criar Conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          {isLogin ? "Não tem conta? " : "Já tem conta? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
            className="font-medium text-orange-600 hover:text-orange-700"
          >
            {isLogin ? "Criar conta" : "Fazer login"}
          </button>
        </p>
      </div>
    </div>
  );
}
