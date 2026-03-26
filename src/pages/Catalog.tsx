import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBottomNav from "@/components/MobileBottomNav";
import ScrollToTop from "@/components/ScrollToTop";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import { products, maleCategories, femaleCategories } from "@/data/products";
import { Product, Gender } from "@/types/product";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const FilterContent = ({
  selectedGender,
  handleGender,
  selectedCategory,
  setSelectedCategory,
  updateFilter,
  categories,
  priceRange,
  setPriceRange,
  selectedFilter,
  setSelectedFilter,
  hasActiveFilters,
  clearFilters,
}: any) => (
  <>
    {/* Gender */}
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Gênero</h3>
      <div className="space-y-1">
        {(["todos", "masculino", "feminino"] as const).map((g) => (
          <button
            key={g}
            onClick={() => handleGender(g)}
            className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
              selectedGender === g ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-card"
            }`}
          >
            {g === "todos" ? "Todos" : g === "masculino" ? "Masculino" : "Feminino"}
          </button>
        ))}
      </div>
    </div>

    {/* Category */}
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Categoria</h3>
      <div className="space-y-1">
        <button
          onClick={() => { setSelectedCategory("todas"); updateFilter("categoria", "todas"); }}
          className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
            selectedCategory === "todas" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-card"
          }`}
        >
          Todas
        </button>
        {categories.map((c: string) => (
          <button
            key={c}
            onClick={() => { setSelectedCategory(c); updateFilter("categoria", c); }}
            className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
              selectedCategory === c ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-card"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>

    {/* Price */}
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Faixa de Preço</h3>
      <div className="space-y-1">
        {[
          { value: "todos", label: "Todas" },
          { value: "ate-100", label: "Até R$ 100" },
          { value: "100-200", label: "R$ 100 - R$ 200" },
          { value: "acima-200", label: "Acima de R$ 200" },
        ].map((p) => (
          <button
            key={p.value}
            onClick={() => setPriceRange(p.value)}
            className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
              priceRange === p.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-card"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>

    {/* Special */}
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Filtrar por</h3>
      <div className="space-y-1">
        {[
          { value: "todos", label: "Todos" },
          { value: "novidades", label: "Novidades" },
          { value: "mais-vendidos", label: "Mais Vendidos" },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => { setSelectedFilter(f.value); updateFilter("filtro", f.value); }}
            className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
              selectedFilter === f.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-card"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>

    {hasActiveFilters && (
      <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground" onClick={clearFilters}>
        Limpar filtros
      </Button>
    )}
  </>
);

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const genderParam = searchParams.get("genero") as Gender | null;
  const categoryParam = searchParams.get("categoria");
  const filterParam = searchParams.get("filtro");
  const searchQuery = searchParams.get("busca") || "";

  const [selectedGender, setSelectedGender] = useState<Gender | "todos">(genderParam || "todos");
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "todas");
  const [selectedFilter, setSelectedFilter] = useState<string>(filterParam || "todos");
  const [priceRange, setPriceRange] = useState<string>("todos");

  const categories = useMemo(() => {
    if (selectedGender === "masculino") return maleCategories;
    if (selectedGender === "feminino") return femaleCategories;
    return [...new Set([...maleCategories, ...femaleCategories])];
  }, [selectedGender]);

  const filtered = useMemo(() => {
    let result = products;
    if (selectedGender !== "todos") result = result.filter((p) => p.gender === selectedGender);
    if (selectedCategory !== "todas") result = result.filter((p) => p.category === selectedCategory);
    if (selectedFilter === "novidades") result = result.filter((p) => p.isNew);
    else if (selectedFilter === "mais-vendidos") result = result.filter((p) => p.isBestSeller);
    if (priceRange === "ate-100") result = result.filter((p) => p.price <= 100);
    else if (priceRange === "100-200") result = result.filter((p) => p.price > 100 && p.price <= 200);
    else if (priceRange === "acima-200") result = result.filter((p) => p.price > 200);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [selectedGender, selectedCategory, selectedFilter, priceRange, searchQuery]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "todos" || value === "todas") params.delete(key);
    else params.set(key, value);
    setSearchParams(params);
  };

  const handleGender = (g: Gender | "todos") => {
    setSelectedGender(g);
    setSelectedCategory("todas");
    updateFilter("genero", g);
  };

  const clearFilters = () => {
    setSelectedGender("todos");
    setSelectedCategory("todas");
    setSelectedFilter("todos");
    setPriceRange("todos");
    setSearchParams({});
  };

  const hasActiveFilters = selectedGender !== "todos" || selectedCategory !== "todas" || selectedFilter !== "todos" || priceRange !== "todos" || searchQuery;

  const filterProps = {
    selectedGender, handleGender, selectedCategory, setSelectedCategory,
    updateFilter, categories, priceRange, setPriceRange, selectedFilter,
    setSelectedFilter, hasActiveFilters, clearFilters,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Page header */}
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-primary">Catálogo</h1>
              <p className="text-sm text-muted-foreground mt-1">{filtered.length} {filtered.length === 1 ? "peça" : "peças"}</p>
            </div>

            {/* Mobile filter trigger — Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden border-border text-muted-foreground"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-card border-border w-72 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="text-primary">Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent {...filterProps} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-8">
            {/* Desktop filters sidebar */}
            <aside className="hidden lg:block w-56 shrink-0">
              <FilterContent {...filterProps} />
            </aside>

            {/* Product grid */}
            <div className="flex-1">
              {searchQuery && (
                <div className="mb-6 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Resultados para: <span className="text-foreground font-medium">"{searchQuery}"</span></span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setSearchParams({})}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">Nenhuma peça encontrada</p>
                  <Button variant="ghost" size="sm" className="mt-4 text-xs" onClick={clearFilters}>
                    Limpar filtros
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} onViewDetails={setSelectedProduct} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Cart />
      <WhatsAppFloat />
      <MobileBottomNav />
      <ScrollToTop />
      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default Catalog;
