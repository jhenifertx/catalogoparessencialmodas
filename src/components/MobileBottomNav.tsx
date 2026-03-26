import { Home, Grid3X3, Crown, ShoppingBag, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";
import { VIP_GROUP_LINK } from "@/data/products";

const MobileBottomNav = () => {
  const location = useLocation();
  const { totalItems, setIsOpen } = useCart();
  const [contactOpen, setContactOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border md:hidden pb-safe">
        <div className="flex items-end justify-around px-2 pt-2 pb-3">
          {/* Home */}
          <Link to="/" className="flex flex-col items-center gap-1 min-w-[3rem]">
            <Home className={`h-5 w-5 ${isActive("/") ? "text-primary" : "text-muted-foreground"}`} />
            <span className={`text-[10px] ${isActive("/") ? "text-primary font-medium" : "text-muted-foreground"}`}>Home</span>
          </Link>

          {/* Catálogo */}
          <Link to="/catalogo" className="flex flex-col items-center gap-1 min-w-[3rem]">
            <Grid3X3 className={`h-5 w-5 ${isActive("/catalogo") ? "text-primary" : "text-muted-foreground"}`} />
            <span className={`text-[10px] ${isActive("/catalogo") ? "text-primary font-medium" : "text-muted-foreground"}`}>Catálogo</span>
          </Link>

          {/* WhatsApp - Center CTA */}
          <button
            onClick={() => setContactOpen(true)}
            className="flex flex-col items-center -mt-5"
          >
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <MessageCircle className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-[10px] text-primary font-medium mt-1">Contato</span>
          </button>

          {/* VIP */}
          <a href={VIP_GROUP_LINK} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[3rem]">
            <Crown className="h-5 w-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">VIP</span>
          </a>

          {/* Carrinho */}
          <button onClick={() => setIsOpen(true)} className="flex flex-col items-center gap-1 min-w-[3rem] relative">
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
            <span className="text-[10px] text-muted-foreground">Carrinho</span>
          </button>
        </div>
      </nav>
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
};

export default MobileBottomNav;
