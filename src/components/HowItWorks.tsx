import { ShoppingBag, MessageCircle, Send, Handshake } from "lucide-react";

const steps = [
  { icon: ShoppingBag, title: "Escolha suas peças", desc: "Navegue pelo catálogo e encontre o que combina com você" },
  { icon: Send, title: "Adicione ao carrinho", desc: "Selecione tamanho, cor e quantidade das peças desejadas" },
  { icon: MessageCircle, title: "Envie pelo WhatsApp", desc: "Com um clique, envie seu pedido direto para nosso atendimento" },
  { icon: Handshake, title: "Finalize com a gente", desc: "Nosso time cuida de tudo: pagamento, envio e acompanhamento" },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Como Comprar</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Simples, rápido e com atendimento humano do início ao fim
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground/50 font-bold mb-2">0{i + 1}</div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
