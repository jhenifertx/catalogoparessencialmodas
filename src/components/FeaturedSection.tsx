import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface FeaturedSectionProps {
  onViewDetails: (product: Product, color?: string) => void;
}

const ProductRow = ({
  title,
  subtitle,
  items,
  linkTo,
  onViewDetails,
  isMobile,
}: {
  title: string;
  subtitle: string;
  items: Product[];
  linkTo: string;
  onViewDetails: (p: Product, color?: string) => void;
  isMobile: boolean;
}) => {
  // Expand items to include color variants if they have colorImages defined
  const expandedItems = items.flatMap(product => {
    if (product.colors && product.colors.length > 0 && product.colorImages) {
      return product.colors.map(color => ({
        ...product,
        displayColor: color,
        // Unique key for the variant
        variantKey: `${product.id}-${color}`
      }));
    }
    return [{ ...product, variantKey: product.id }];
  });

  return (
  <div className="mb-20 last:mb-0">
    <Carousel 
      opts={{ align: "start", loop: false }} 
      className="w-full"
    >
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link to={linkTo}>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary text-xs uppercase tracking-wider">
              Ver tudo <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>
          <div className="hidden md:flex gap-1.5 ml-2">
            <CarouselPrevious className="static translate-y-0 h-8 w-8 border-primary/20 hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="static translate-y-0 h-8 w-8 border-primary/20 hover:bg-primary hover:text-primary-foreground" />
          </div>
        </div>
      </div>
      <CarouselContent className="-ml-4">
        {expandedItems.map((item) => (
          <CarouselItem 
            key={item.variantKey} 
            className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <ProductCard 
              product={item} 
              onViewDetails={onViewDetails} 
              displayColor={(item as any).displayColor}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      </Carousel>
    </div>
  );
};

const FeaturedSection = ({ onViewDetails }: FeaturedSectionProps) => {
  const isMobile = useIsMobile();
  const newProducts = products.filter((p) => p.isNew).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);

  const shownIds = new Set([
    ...newProducts,
    ...bestSellers,
    ...featured,
  ].map((p) => p.id));

  const masculino = products
    .filter((p) => p.gender === "masculino" && !shownIds.has(p.id))
    .slice(0, 8);
  const feminino = products
    .filter((p) => p.gender === "feminino" && !shownIds.has(p.id))
    .slice(0, 8);

  const sections = [
    { title: "Novidades", subtitle: "Acabaram de chegar", items: newProducts, link: "/catalogo?filtro=novidades" },
    { title: "Mais Pedidos", subtitle: "Favoritos dos clientes", items: bestSellers, link: "/catalogo?filtro=mais-vendidos" },
    { title: "Destaques", subtitle: "Seleção curada", items: featured, link: "/catalogo" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {sections.map((section) => (
          <ProductRow
            key={section.title}
            title={section.title}
            subtitle={section.subtitle}
            items={section.items}
            linkTo={section.link}
            onViewDetails={onViewDetails}
            isMobile={isMobile}
          />
        ))}

        <ProductRow
          title="Masculino"
          subtitle="Para ele"
          items={masculino}
          linkTo="/catalogo?genero=masculino"
          onViewDetails={onViewDetails}
          isMobile={isMobile}
        />

        <ProductRow
          title="Feminino"
          subtitle="Para ela"
          items={feminino}
          linkTo="/catalogo?genero=feminino"
          onViewDetails={onViewDetails}
          isMobile={isMobile}
        />
      </div>
    </section>
  );
};

export default FeaturedSection;
