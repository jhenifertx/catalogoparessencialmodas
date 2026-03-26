import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Heart, Star } from "lucide-react";
import hoodieProduct from "@/assets/hoodie-product.jpg";
import cargoProduct from "@/assets/cargo-product.jpg";
import jacketProduct from "@/assets/jacket-product.jpg";

const ProductShowcase = () => {
  const categories = [
    {
      id: 1,
      title: "Oversized Tees",
      description: "Camisetas oversized com design exclusivo",
      image: "/lovable-uploads/7ea963c6-7617-4cb3-b9dd-f0b265fee6a5.png",
      price: "R$ 89,90",
      originalPrice: "R$ 119,90",
      badge: "Best Seller"
    },
    {
      id: 2,
      title: "Premium Hoodies", 
      description: "Moletons premium com estampa única",
      image: "/lovable-uploads/403ad92f-0d8f-498b-8be3-560a6898265b.png",
      price: "R$ 149,90",
      originalPrice: "R$ 199,90",
      badge: "New Drop"
    },
    {
      id: 3,
      title: "Cargo Pants",
      description: "Funcionalidade urbana premium",
      image: cargoProduct,
      price: "R$ 179,90",
      originalPrice: "R$ 229,90",
      badge: "Limited"
    },
    {
      id: 4,
      title: "Street Jackets",
      description: "Proteção com attitude",
      image: jacketProduct,
      price: "R$ 249,90",
      originalPrice: "R$ 319,90",
      badge: "Limited"
    }
  ];

  const ProductCard = ({ product }: { product: typeof categories[0] }) => (
    <Card className="group bg-card border-border hover-glow overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/60 via-transparent to-transparent" />
        
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
            {product.badge}
          </span>
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="secondary" className="h-8 w-8">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
          <span className="text-sm text-muted-foreground ml-2">(4.9)</span>
        </div>
        
        <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              {product.price}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="produtos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-brand-accent/20 text-brand-light rounded-full border border-brand-accent/30">
            Produtos em Destaque
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-glow">
            Nossa Coleção
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra peças únicas que combinam conforto, estilo e autenticidade urbana
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {categories.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <Button size="lg" variant="outline" className="hover-glow border-brand-accent text-brand-light hover:bg-brand-accent/10">
            Ver Toda Coleção
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;