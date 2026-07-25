import Link from "next/link";
import { ShoppingBag, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <ShoppingBag className="h-6 w-6 text-orange-500" />
              Vitrine Shopee
            </Link>
            <p className="text-sm text-gray-400">
              Encontre as melhores ofertas e cupons de desconto da Shopee.
              Economize todos os dias!
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/produtos" className="hover:text-orange-400 transition-colors">Ofertas</Link></li>
              <li><Link href="/categorias" className="hover:text-orange-400 transition-colors">Categorias</Link></li>
              <li><Link href="/cupons" className="hover:text-orange-400 transition-colors">Cupons</Link></li>
              <li><Link href="/blog" className="hover:text-orange-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Ferramentas</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ferramentas/calculadora-desconto" className="hover:text-orange-400 transition-colors">Calculadora de Desconto</Link></li>
              <li><Link href="/ferramentas/calculadora-parcelamento" className="hover:text-orange-400 transition-colors">Calculadora de Parcelamento</Link></li>
              <li><Link href="/ferramentas/comparador-precos" className="hover:text-orange-400 transition-colors">Comparador de Preços</Link></li>
              <li><Link href="/ferramentas/conversor-medidas" className="hover:text-orange-400 transition-colors">Conversor de Medidas</Link></li>
              <li><Link href="/ferramentas/qr-code" className="hover:text-orange-400 transition-colors">Gerador de QR Code</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                contato@vitrineshopee.com.br
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                <a href="https://s.shopee.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">
                  Shopee Brasil
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Vitrine Shopee. Todos os direitos reservados.</p>
          <p className="mt-1">
            Este site é independente e não possui vínculo oficial com a Shopee.
          </p>
        </div>
      </div>
    </footer>
  );
}
