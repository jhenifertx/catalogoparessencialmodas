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
} from "@/components/ui/carousel";

interface FeaturedSectionProps {
  onViewDetails: (product: Product) => void;
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
  onViewDetails: (p: Product) => void;
  isMobile: boolean;
}) => (
  <div className="mb-20 last:mb-0">
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
      <Link to={linkTo}>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary text-xs uppercase tracking-wider">
          Ver tudo <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Button>
      </Link>
    </div>

    {isMobile ? (
      <Carousel opts={{ align: "start", loop: false, skipSnaps: false }} className="-mx-4">
        <CarouselContent className="-ml-3 px-4">
          {items.map((product) => (
            <CarouselItem key={product.id} className="pl-3 basis-[78%]">
              <ProductCard product={product} onViewDetails={onViewDetails} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} onViewDetails={onViewDetails} />
        ))}
      </div>
    )}
  </div>
);

const FeaturedSection = ({ onViewDetails }: FeaturedSectionProps) => {
  const isMobile = useIsMobile();
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const featured = products.filter((p) => p.isFeatured).slice(0, 4);
  const masculino = products.filter((p) => p.gender === "masculino").slice(0, 4);
  const feminino = products.filter((p) => p.gender === "feminino").slice(0, 4);

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
