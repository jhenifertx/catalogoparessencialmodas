import { Button } from "@/components/ui/button";
import { ArrowRight, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { VIP_GROUP_LINK } from "@/data/products";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-card to-background">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.08) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, hsl(var(--primary) / 0.05) 0%, transparent 40%)`
        }} />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-2 mb-6 md:mb-8 text-xs font-medium tracking-[0.2em] uppercase bg-card text-muted-foreground rounded-full border border-border">
              Catálogo Inteligente
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-primary leading-[0.85] tracking-[-0.04em] animate-fade-up" style={{ animationDelay: "0.15s", fontFamily: "'Inter', system-ui, sans-serif" }}>
            SEU ESTILO,
            <br />
            <span className="text-muted-foreground font-light tracking-[-0.02em]">SUA ESSÊNCIA</span>
          </h1>

          <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed animate-fade-up px-2" style={{ animationDelay: "0.3s" }}>
            Peças selecionadas para quem busca estilo, presença e autenticidade no dia a dia. 
            Moda masculina e feminina com curadoria premium.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-up px-4 sm:px-0" style={{ animationDelay: "0.45s" }}>
            <Link to="/catalogo">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-sm tracking-wide uppercase">
                Explorar Catálogo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href={VIP_GROUP_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-border text-foreground hover:bg-card px-8 text-sm tracking-wide uppercase">
                <Crown className="mr-2 h-4 w-4" />
                Grupo VIP
              </Button>
            </a>
          </div>

          {/* Brand pillars instead of fake stats */}
          <div className="flex items-center justify-center gap-6 md:gap-12 mt-12 md:mt-16 animate-fade-up flex-wrap" style={{ animationDelay: "0.6s" }}>
            {[
              "Curadoria Premium",
              "Moda Urbana",
              "Atendimento Direto",
              "Novidades Frequentes",
            ].map((pillar) => (
              <span key={pillar} className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.15em] border-b border-border pb-1">
                {pillar}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
