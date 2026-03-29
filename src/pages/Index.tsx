import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedSection from "@/components/FeaturedSection";
import HowItWorks from "@/components/HowItWorks";
import VIPSection from "@/components/VIPSection";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBottomNav from "@/components/MobileBottomNav";
import ScrollToTop from "@/components/ScrollToTop";
import ProductDetail from "@/components/ProductDetail";
import { Product } from "@/types/product";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<{ product: Product; color?: string } | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <FeaturedSection 
          onViewDetails={(product, color) => setSelectedProduct({ product, color })} 
        />
        <HowItWorks />
        <VIPSection />
        <About />
      </main>
      <Footer />
      <Cart />
      <WhatsAppFloat />
      <MobileBottomNav />
      <ScrollToTop />
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct.product} 
          initialColor={selectedProduct.color}
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default Index;
