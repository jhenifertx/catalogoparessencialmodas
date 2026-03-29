import { Button } from "@/components/ui/button";
import { ShoppingBag, Eye, MessageCircle } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, buildSingleProductMessage, openWhatsApp } from "@/lib/whatsapp";

const badgeLabels: Record<string, string> = {
  novo: "Novo",
  destaque: "Destaque",
  "mais-pedido": "Mais Pedido",
  "ultimas-pecas": "Últimas Peças",
};

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product, color?: string) => void;
  displayColor?: string;
}

const ProductCard = ({ product, onViewDetails, displayColor }: ProductCardProps) => {
  const { addItem } = useCart();

  // Determine which image to show
  const displayImage = (displayColor && product.colorImages?.[displayColor]) 
    ? product.colorImages[displayColor] 
    : product.images[0];

  return (
    <div className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden cursor-pointer" onClick={() => onViewDetails(product, displayColor)}>
        <img
          src={displayImage}
          alt={`${product.name} ${displayColor ? `- ${displayColor}` : ""}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase bg-primary text-primary-foreground rounded-sm">
              {badgeLabels[product.badge]}
            </span>
          </div>
        )}

        {displayColor && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 text-[9px] font-medium tracking-wide uppercase bg-black/60 text-white backdrop-blur-sm rounded-sm">
              {displayColor}
            </span>
          </div>
        )}

        {/* Hover actions */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <Button
            size="sm"
            className="flex-1 bg-primary text-primary-foreground text-xs"
            onClick={(e) => { e.stopPropagation(); addItem(product, undefined, displayColor); }}
          >
            <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
            Adicionar
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="text-xs"
            onClick={(e) => { e.stopPropagation(); onViewDetails(product, displayColor); }}
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-primary">{formatPrice(product.price)}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
            onClick={() => openWhatsApp(buildSingleProductMessage(product))}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
