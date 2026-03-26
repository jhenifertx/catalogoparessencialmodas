import { Button } from "@/components/ui/button";
import { Crown, ArrowRight } from "lucide-react";
import { VIP_GROUP_LINK } from "@/data/products";

const VIPSection = () => {
  return (
    <section id="vip" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.08) 0%, transparent 60%)`
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
            <Crown className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            Entre no Grupo VIP
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto">
            Receba lançamentos, novidades, reposições e ofertas exclusivas antes de todo mundo. 
            Acesso direto às melhores peças com preços especiais.
          </p>
          <a href={VIP_GROUP_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 text-sm tracking-wide uppercase">
              Entrar no Grupo VIP
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <p className="text-xs text-muted-foreground/60 mt-4">Grupo no WhatsApp · Gratuito · Sem spam</p>
        </div>
      </div>
    </section>
  );
};

export default VIPSection;
