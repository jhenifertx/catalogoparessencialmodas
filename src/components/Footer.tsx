import { Instagram } from "lucide-react";

const WA_FEMININO = `https://api.whatsapp.com/send/?phone=5514998406380&text=${encodeURIComponent("Olá! Vim pelo catálogo da Par Essencial e gostaria de atendimento para peças femininas 😊")}`;
const WA_MASCULINO = `https://api.whatsapp.com/send/?phone=5511913393095&text=${encodeURIComponent("Olá! Vim pelo catálogo da Par Essencial e gostaria de atendimento para peças masculinas 😊")}`;

const Footer = () => {
  return (
    <footer id="contato" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <img
              src="/uploads/6c2cfb1b-7b44-4e32-9918-95d41f73f2be.png"
              alt="Par Essencial Logo"
              className="h-7 w-auto"
            />
            <span className="text-sm font-bold text-primary tracking-wide">PAR ESSENCIAL</span>
          </div>

          {/* Contacts — WhatsApp links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
            <a href={WA_MASCULINO} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <span className="text-foreground font-medium">Nicolas:</span>{" "}(11) 91339-3095
            </a>
            <a href={WA_FEMININO} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <span className="text-foreground font-medium">Jhenifer:</span>{" "}(14) 99840-6380
            </a>
          </div>

          {/* Instagram with handle */}
          <a
            href="https://www.instagram.com/paressencialmodas/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span>@paressencialmodas</span>
          </a>
        </div>

        <div className="border-t border-border mt-6 md:mt-8 pt-4 md:pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Par Essencial. Todos os direitos reservados.
          </p>
        </div>
      </div>
      {/* Spacer for mobile bottom nav */}
      <div className="h-20 md:hidden" />
    </footer>
  );
};

export default Footer;
