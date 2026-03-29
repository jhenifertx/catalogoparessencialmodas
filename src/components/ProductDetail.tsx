import { Button } from "@/components/ui/button";
import { X, ShoppingBag, MessageCircle, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, buildSingleProductMessage, openWhatsApp } from "@/lib/whatsapp";
import { useState, useRef, useCallback } from "react";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  initialColor?: string;
}

const ProductDetail = ({ product, onClose, initialColor }: ProductDetailProps) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.availableSizes ? product.availableSizes[0] : product.sizes?.[0]
  );
  
  // Use initialColor if provided, otherwise fallback to first color
  const [selectedColor, setSelectedColor] = useState<string | undefined>(initialColor || product.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  
  // Set initial image based on selected color
  const getInitialImageIndex = () => {
    if (initialColor && product.colorImages && product.colorImages[initialColor]) {
      const idx = product.images.indexOf(product.colorImages[initialColor]);
      return idx !== -1 ? idx : 0;
    }
    return 0;
  };
  
  const [currentImage, setCurrentImage] = useState(getInitialImageIndex());

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    
    // Update image if color-image mapping exists
    if (product.colorImages && product.colorImages[color]) {
      const imageIndex = product.images.indexOf(product.colorImages[color]);
      if (imageIndex !== -1) {
        setCurrentImage(imageIndex);
      }
    }

    // Update selected size if color-size mapping exists
    if (product.colorSizes && product.colorSizes[color]) {
      const availableSizesForColor = product.colorSizes[color];
      if (selectedSize && !availableSizesForColor.includes(selectedSize)) {
        setSelectedSize(availableSizesForColor[0]);
      }
    }
  };

  // Swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleSwipe = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (Math.abs(diff) < threshold) return;
    if (diff > 0 && currentImage < product.images.length - 1) {
      setCurrentImage(currentImage + 1);
    } else if (diff < 0 && currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  }, [currentImage, product.images.length]);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        className="relative bg-card border border-border rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-primary"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images with swipe */}
          <div
            className="aspect-[3/4] relative overflow-hidden touch-pan-y"
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => { touchEndX.current = e.changedTouches[0].clientX; handleSwipe(); }}
            onMouseDown={(e) => { touchStartX.current = e.clientX; }}
            onMouseUp={(e) => { touchEndX.current = e.clientX; handleSwipe(); }}
          >
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none transition-opacity duration-300"
              draggable={false}
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 text-[10px] font-semibold tracking-wider uppercase bg-primary text-primary-foreground rounded-sm">
                {product.badge === "novo" ? "Novo" : product.badge === "destaque" ? "Destaque" : product.badge === "mais-pedido" ? "Mais Pedido" : "Últimas Peças"}
              </span>
            )}
            {product.images.length > 1 && (
              <>
                {/* Prev arrow */}
                {currentImage > 0 && (
                  <button
                    onClick={() => setCurrentImage(currentImage - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 backdrop-blur-sm rounded-full p-1.5 transition-all"
                  >
                    <ChevronLeft className="h-4 w-4 text-foreground" />
                  </button>
                )}
                {/* Next arrow */}
                {currentImage < product.images.length - 1 && (
                  <button
                    onClick={() => setCurrentImage(currentImage + 1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 backdrop-blur-sm rounded-full p-1.5 transition-all"
                  >
                    <ChevronRight className="h-4 w-4 text-foreground" />
                  </button>
                )}
                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentImage ? "bg-primary scale-110" : "bg-muted-foreground/50"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Info */}
          <div className="p-6 md:p-8 flex flex-col">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category} · {product.gender === "masculino" ? "Masculino" : "Feminino"}</p>
            <h2 className="text-2xl font-bold text-primary mb-2">{product.name}</h2>
            <p className="text-2xl font-bold text-foreground mb-4">{formatPrice(product.price)}</p>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

            {product.fit && (
              <p className="text-xs text-muted-foreground mb-4">
                <span className="text-foreground font-medium">Caimento:</span> {product.fit}
              </p>
            )}

            {product.occasions && (
              <p className="text-xs text-muted-foreground mb-6">
                <span className="text-foreground font-medium">Ocasiões:</span> {product.occasions.join(", ")}
              </p>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-4">
                <p className="text-xs font-medium text-foreground mb-2 uppercase tracking-wider">Tamanho</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    let isAvailable = !product.availableSizes || product.availableSizes.includes(size);
                    
                    // If color-specific sizes exist, they override generic availableSizes
                    if (product.colorSizes && selectedColor && product.colorSizes[selectedColor]) {
                      isAvailable = product.colorSizes[selectedColor].includes(size);
                    }

                    return (
                      <button
                        key={size}
                        onClick={() => isAvailable && setSelectedSize(size)}
                        disabled={!isAvailable}
                        className={`px-3 py-1.5 text-xs border rounded transition-colors ${
                          selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground"
                            : isAvailable
                            ? "border-border text-muted-foreground hover:border-primary/50"
                            : "border-border/50 text-muted-foreground/30 cursor-not-allowed opacity-50"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && (
              <div className="mb-6">
                <p className="text-xs font-medium text-foreground mb-2 uppercase tracking-wider">Cor</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`px-3 py-1.5 text-xs border rounded transition-colors ${
                        selectedColor === color
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-xs font-medium text-foreground mb-2 uppercase tracking-wider">Quantidade</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 border border-border rounded flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-sm font-medium text-foreground w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 border border-border rounded flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <Button className="w-full bg-primary text-primary-foreground" onClick={handleAdd}>
                <ShoppingBag className="h-4 w-4 mr-2" />
                Adicionar ao Carrinho
              </Button>
              <Button
                variant="outline"
                className="w-full border-border"
                onClick={() => openWhatsApp(buildSingleProductMessage(product, selectedSize, selectedColor))}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Comprar no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
