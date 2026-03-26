import { Button } from "@/components/ui/button";
import { X, Minus, Plus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, buildCartMessage, openWhatsApp } from "@/lib/whatsapp";

const Cart = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)}>
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      <div
        className="absolute top-0 right-0 h-full w-full max-w-md bg-card border-l border-border flex flex-col animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-primary">Carrinho</h2>
            <span className="text-xs text-muted-foreground">({totalItems} {totalItems === 1 ? "item" : "itens"})</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-primary">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-sm">Seu carrinho está vazio</p>
              <p className="text-muted-foreground/60 text-xs mt-1">Explore o catálogo e adicione peças</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 bg-background/50 rounded-lg p-3 border border-border">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-24 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground truncate">{item.product.name}</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.product.category}</p>
                  {item.selectedSize && <p className="text-xs text-muted-foreground mt-0.5">Tam: {item.selectedSize}</p>}
                  {item.selectedColor && <p className="text-xs text-muted-foreground">Cor: {item.selectedColor}</p>}
                  <p className="text-sm font-bold text-primary mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 border border-border rounded flex items-center justify-center text-muted-foreground hover:text-primary text-xs"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 border border-border rounded flex items-center justify-center text-muted-foreground hover:text-primary text-xs"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="ml-auto text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total estimado</span>
              <span className="text-xl font-bold text-primary">{formatPrice(totalPrice)}</span>
            </div>
            <Button
              className="w-full bg-primary text-primary-foreground"
              onClick={() => {
                openWhatsApp(buildCartMessage(items));
              }}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Finalizar no WhatsApp
            </Button>
            <Button variant="ghost" size="sm" className="w-full text-muted-foreground text-xs" onClick={clearCart}>
              Limpar carrinho
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
