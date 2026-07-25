import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@vitrine.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@vitrine.com",
      password: adminPassword,
      role: "admin",
    },
  });

  const cats = [
    { name: "Celulares", slug: "celulares", description: "Smartphones e acessórios", image: "📱", order: 1 },
    { name: "Eletrônicos", slug: "eletronicos", description: "Gadgets e dispositivos", image: "🎧", order: 2 },
    { name: "Casa & Decoração", slug: "casa-decoracao", description: "Para sua casa", image: "🏠", order: 3 },
    { name: "Beleza & Saúde", slug: "beleza-saude", description: "Cuidados pessoais", image: "💄", order: 4 },
    { name: "Moda & Acessórios", slug: "moda-acessorios", description: "Roupas e acessórios", image: "👟", order: 5 },
    { name: "Informática", slug: "informatica", description: "Computadores e periféricos", image: "💻", order: 6 },
    { name: "Esporte & Lazer", slug: "esporte-lazer", description: "Equipamentos e diversão", image: "⚽", order: 7 },
    { name: "Pet Shop", slug: "pet-shop", description: "Para seu pet", image: "🐾", order: 8 },
  ];

  for (const cat of cats) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const celularCategory = await prisma.category.findUnique({ where: { slug: "celulares" } });
  const eletronicosCategory = await prisma.category.findUnique({ where: { slug: "eletronicos" } });
  const casaCategory = await prisma.category.findUnique({ where: { slug: "casa-decoracao" } });
  const belezaCategory = await prisma.category.findUnique({ where: { slug: "beleza-saude" } });

  const products = [
    {
      name: "iPhone 15 Pro Max 256GB",
      slug: "iphone-15-pro-max-256gb",
      description: "O iPhone mais avançado da Apple com chip A17 Pro, tela Super Retina XDR de 6.7 polegadas e câmera de 48MP. Design em titânio com acabamento premium. Bateria de longa duração e experiência iOS incomparável.",
      shortDesc: "Chip A17 Pro, Câmera 48MP, Tela 6.7\"",
      price: 7299.00,
      originalPrice: 9499.00,
      affiliateUrl: "https://s.shopee.com.br/link/iphone15pro",
      imageUrl: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1",
      brand: "Apple",
      rating: 4.8,
      reviewCount: 2341,
      stock: 15,
      featured: true,
      categoryId: celularCategory!.id,
      tags: "iphone,apple,smartphone,5g,titanio",
      coupons: {
        create: [
          { code: "SHOPEE10", discount: "10%", description: "10% off no primeiro pedido" },
          { code: "FRETEGRATIS", discount: "Frete Grátis", description: "Frete grátis acima de R$99" },
        ],
      },
    },
    {
      name: "Samsung Galaxy S24 Ultra 512GB",
      slug: "samsung-galaxy-s24-ultra-512gb",
      description: "O Galaxy S24 Ultra redefine a experiência mobile com IA integrada, S Pen, tela Dynamic AMOLED 2X de 6.8 polegadas e câmera de 200MP. Processador Snapdragon 8 Gen 3 para desempenho excepcional.",
      shortDesc: "200MP, S Pen, IA Galaxy, 512GB",
      price: 6599.00,
      originalPrice: 8999.00,
      affiliateUrl: "https://s.shopee.com.br/link/galaxys24",
      imageUrl: "https://images.pexels.com/photos/16149966/pexels-photo-16149966.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1",
      brand: "Samsung",
      rating: 4.7,
      reviewCount: 1892,
      stock: 22,
      featured: true,
      categoryId: celularCategory!.id,
      tags: "samsung,galaxy,smartphone,5g,ia",
      coupons: {
        create: [
          { code: "SAMSUNG15", discount: "15%", description: "15% off em Samsung" },
        ],
      },
    },
    {
      name: "Xiaomi Redmi Note 13 Pro 256GB",
      slug: "xiaomi-redmi-note-13-pro-256gb",
      description: "Smartphone intermediário premium com câmera de 200MP, tela AMOLED de 120Hz, processador Dimensity 7200 Ultra e bateria de 5100mAh. Ótimo custo-benefício com especificações de flagship.",
      shortDesc: "200MP, AMOLED 120Hz, 5100mAh",
      price: 1899.00,
      originalPrice: 2499.00,
      affiliateUrl: "https://s.shopee.com.br/link/redminote13",
      imageUrl: "https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1",
      brand: "Xiaomi",
      rating: 4.6,
      reviewCount: 5678,
      stock: 45,
      featured: true,
      categoryId: celularCategory!.id,
      tags: "xiaomi,redmi,smartphone,custo-beneficio",
      coupons: {
        create: [
          { code: "XIAOMI20", discount: "20%", description: "20% off em Xiaomi" },
        ],
      },
    },
    {
      name: "AirPods Pro 2ª Geração USB-C",
      slug: "airpods-pro-2-geracao",
      description: "Fones sem fio da Apple com cancelamento ativo de ruído adaptativo, Áudio Espacial e caixa de carga MagSafe com USB-C. Até 6h de reprodução e resistência à água IP54.",
      shortDesc: "ANC, Áudio Espacial, USB-C",
      price: 1699.00,
      originalPrice: 2249.00,
      affiliateUrl: "https://s.shopee.com.br/link/airpodspro",
      imageUrl: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1",
      brand: "Apple",
      rating: 4.9,
      reviewCount: 8934,
      stock: 30,
      featured: true,
      categoryId: eletronicosCategory!.id,
      tags: "apple,airpods,fone,audio,bluetooth",
      coupons: {
        create: [
          { code: "AUDIO10", discount: "10%", description: "10% off em áudio" },
        ],
      },
    },
    {
      name: "JBL Tune 770NC Wireless",
      slug: "jbl-tune-770nc",
      description: "Fone de ouvido over-ear com cancelamento de ruído adaptativo JBL Pure Bass Sound. Bateria de até 70 horas, Bluetooth 5.3 e design dobrável para transporte fácil.",
      shortDesc: "ANC, 70h bateria, Bluetooth 5.3",
      price: 349.00,
      originalPrice: 599.00,
      affiliateUrl: "https://s.shopee.com.br/link/jbl770",
      imageUrl: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1",
      brand: "JBL",
      rating: 4.5,
      reviewCount: 3421,
      stock: 50,
      featured: false,
      categoryId: eletronicosCategory!.id,
      tags: "jbl,fone,audio,bluetooth,anc",
      coupons: {
        create: [
          { code: "JBL15", discount: "15%", description: "15% off JBL" },
        ],
      },
    },
    {
      name: "Robô Aspirador Xiaomi Mi Robot Vacuum",
      slug: "robo-aspirador-xiaomi",
      description: "Aspirador robô com navegação LDS Laser, potência de sucção de 2200Pa, mapeamento da casa em tempo real e controle pelo app. Limpeza automática inteligente.",
      shortDesc: "Laser LDS, 2200Pa, App",
      price: 1499.00,
      originalPrice: 2199.00,
      affiliateUrl: "https://s.shopee.com.br/link/roboxiaomi",
      imageUrl: "https://images.pexels.com/photos/5463579/pexels-photo-5463579.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1",
      brand: "Xiaomi",
      rating: 4.4,
      reviewCount: 1234,
      stock: 18,
      featured: true,
      categoryId: casaCategory!.id,
      tags: "xiaomi,robo,aspirador,casa,smart",
      coupons: {
        create: [
          { code: "CASA20", discount: "20%", description: "20% off produtos casa" },
        ],
      },
    },
    {
      name: "Kit Skincare Coreano 7 Peças",
      slug: "kit-skincare-coreano-7pecas",
      description: "Routine completa de skincare coreano: limpador, tônico, essência, sérum de vitamina C, creme hidratante, protetor solar e máscara facial. Para todos os tipos de pele.",
      shortDesc: "Routine completa, 7 produtos",
      price: 189.00,
      originalPrice: 349.00,
      affiliateUrl: "https://s.shopee.com.br/link/skincare7",
      imageUrl: "https://images.pexels.com/photos/3682098/pexels-photo-3682098.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1",
      brand: "GenCos",
      rating: 4.3,
      reviewCount: 6789,
      stock: 100,
      featured: true,
      categoryId: belezaCategory!.id,
      tags: "skincare,coreano,beleza,rotina,pele",
      coupons: {
        create: [
          { code: "BELEZA25", discount: "25%", description: "25% off beleza" },
          { code: "PRIMEIRACOMPRA", discount: "30%", description: "30% off primeira compra" },
        ],
      },
    },
    {
      name: "Notebook Lenovo IdeaPad 3i Intel i5",
      slug: "notebook-lenovo-ideapad-3i",
      description: "Notebook com processador Intel Core i5 12ª geração, 8GB RAM DDR4, SSD 256GB NVMe, tela IPS Full HD de 15.6 polegadas. Ideal para trabalho e estudos.",
      shortDesc: "i5 12ª Gen, 8GB RAM, 256GB SSD",
      price: 2799.00,
      originalPrice: 3999.00,
      affiliateUrl: "https://s.shopee.com.br/link/lenovo3i",
      imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1",
      brand: "Lenovo",
      rating: 4.5,
      reviewCount: 2156,
      stock: 12,
      featured: false,
      categoryId: eletronicosCategory!.id,
      tags: "notebook,lenovo,computador,informatica",
      coupons: {
        create: [
          { code: "NOTEB10", discount: "10%", description: "10% off notebooks" },
        ],
      },
    },
  ];

  for (const product of products) {
    const existing = await prisma.product.findUnique({ where: { slug: product.slug } });
    if (!existing) {
      await prisma.product.create({
        data: product,
      });
    }
  }

  const articles = [
    {
      title: "10 Melhores Ofertas da Shopeeesta Semana",
      slug: "10-melhores-ofertas-shopee-semana",
      excerpt: "Separamos as melhores promoções encontradas na Shopee esta semana com descontos de até 70%.",
      content: `# 10 Melhores Ofertas da Shopee esta Semana\n\nA Shopee continua sendo uma das plataformas com mais promoções do Brasil. Separamos as 10 melhores ofertas desta semana:\n\n## 1. iPhone 15 Pro Max por R$ 7.299\nO smartphone mais vendido do momento com desconto de mais de R$ 2.000.\n\n## 2. Galaxy S24 Ultra por R$ 6.599\nO rival da Samsung também com desconto agressivo.\n\n## 3. Kit Skincare Coreano 7 Peças por R$ 189\nRoutine completa com 25% de desconto.\n\n## Dicas para economizar na Shopee\n- Use cupons de primeira compra\n- Acompanhe o Flash Sale diário\n- Use cashback em lojas parceiras\n- Verifique sempre o preço em outros sites`,
      imageUrl: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
      tags: "ofertas,shopee,promoções,economia",
      published: true,
      publishedAt: new Date(),
    },
    {
      title: "Como Usar Cupons na Shopee: Guia Completo 2024",
      slug: "como-usar-cupons-shopee-guia",
      excerpt: "Aprenda a maximizar seus descontos usando cupons na Shopee. Passo a passo completo.",
      content: `# Como Usar Cupons na Shopee: Guia Completo\n\n## O que são cupons Shopee?\nCupons são códigos de desconto que podem ser aplicados direto no checkout da Shopee.\n\n## Tipos de cupons\n1. **Cupons de frete** - Reduzem ou eliminam o custo de frete\n2. **Cupons de desconto** - Aplicam um percentual ou valor fixo de desconto\n3. **Cupons de loja** - Específicos de cada vendedor\n4. **Cupons de cashback** - Devolvem parte do valor em moedas Shopee\n\n## Como encontrar cupons\n- Acesse a página de cupons do app\n- Siga lojas favoritas para receber cupons exclusivos\n- Participe de eventos especiais\n- Use sites como a Vitrine Essências para encontrar cupons atualizados\n\n## Passo a passo para usar\n1. Adicione o produto ao carrinho\n2. No checkout, procure o campo "Cupom"\n3. Digite ou cole o código\n4. Confira o desconto aplicado\n5. Finalize a compra`,
      imageUrl: "https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
      tags: "cupons,shopee,desconto,guia",
      published: true,
      publishedAt: new Date(),
    },
    {
      title: "Smartphone Ideal em 2024: Como Escolher o Melhor",
      slug: "como-escolher-smartphone-2024",
      excerpt: "Comparativo dos melhores smartphones em 2024. Processador, câmera, bateria: o que observar.",
      content: `# Como Escolher o Melhor Smartphone em 2024\n\n## Fatores importantes\n\n### Processador\n- **Topo de linha**: Snapdragon 8 Gen 3, Apple A17 Pro\n- **Intermediário**: Dimensity 7200, Snapdragon 778G\n- **Básico**: Helio G88, Snapdragon 680\n\n### Câmera\n- Megapixels não são tudo\n- Foque no tamanho do sensor e abertura\n- Veja fotos reais em reviews\n\n### Bateria\n- Mínimo 4500mAh para uso diário\n- Carregamento rápido faz diferença\n- Baterias de 5000mAh+ são ideais\n\n### Tela\n- AMOLED é superior a LCD\n- 90Hz ou 120Hz para fluidez\n- Full HD é suficiente\n\n## Nossas recomendações por faixa de preço\n- **Até R$ 1.000**: Redmi Note 12\n- **R$ 1.000 a R$ 2.000**: Redmi Note 13 Pro\n- **R$ 2.000 a R$ 4.000**: Galaxy A55\n- **Acima de R$ 4.000**: Galaxy S24 ou iPhone 15`,
      imageUrl: "https://images.pexels.com/photos/404287/pexels-photo-404287.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
      tags: "smartphone,comparativo,dicas,tecnologia",
      published: true,
      publishedAt: new Date(),
    },
  ];

  for (const article of articles) {
    const existing = await prisma.article.findUnique({ where: { slug: article.slug } });
    if (!existing) {
      await prisma.article.create({ data: article });
    }
  }

  console.log("Seed executado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
