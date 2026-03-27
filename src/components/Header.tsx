import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, Search, X, Instagram } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import ContactModal from "@/components/ContactModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogo?busca=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Feminino", href: "/catalogo?genero=feminino" },
    { label: "Masculino", href: "/catalogo?genero=masculino" },
    { label: "Novidades", href: "/catalogo?filtro=novidades" },
    { label: "Grupo VIP", href: "/#vip" },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-1/2 -left-1/4 w-[60%] h-[200%] bg-gradient-to-r from-transparent via-primary/[0.03] to-transparent rotate-12 animate-[shimmer_8s_ease-in-out_infinite]" />
            </div>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/uploads/6c2cfb1b-7b44-4e32-9918-95d41f73f2be.png"
                alt="Par Essencial Logo"
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold text-primary tracking-wide">PAR ESSENCIAL</span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) =>
                link.href.startsWith("/") && !link.href.includes("#") ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase"
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-muted-foreground hover:text-primary"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-primary"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
              <a
                href="https://www.instagram.com/paressencialmodas/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex"
              >
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </Button>
              </a>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Search bar */}
          {isSearchOpen && (
            <form onSubmit={handleSearch} className="mt-3 animate-fade-in">
              <input
                type="text"
                placeholder="Buscar peças, categorias, estilos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </form>
          )}

          {/* Mobile nav */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) =>
                  link.href.startsWith("/") && !link.href.includes("#") ? (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
                    >
                      {link.label}
                    </a>
                  )
                )}
                <button
                  onClick={() => { setContactOpen(true); setIsMenuOpen(false); }}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide text-left"
                >
                  Contato
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
};

export default Header;
