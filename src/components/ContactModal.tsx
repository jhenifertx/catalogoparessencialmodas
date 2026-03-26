import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-primary text-center">
            Fale com a Par Essencial
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center">
            Escolha o atendimento ideal para você
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 mt-4">
          <a
            href={`https://api.whatsapp.com/send/?phone=5514998406380&text=${encodeURIComponent("Olá! Vim pelo catálogo da Par Essencial e gostaria de atendimento para peças femininas 😊")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              variant="outline"
              className="w-full h-auto py-5 border-border hover:border-primary/40 hover:bg-primary/5 transition-all flex flex-col items-center gap-2"
            >
              <MessageCircle className="h-6 w-6 text-primary" />
              <span className="text-base font-semibold text-foreground">Feminino</span>
              <span className="text-xs text-muted-foreground">Atendimento com Jhenifer</span>
            </Button>
          </a>
          <a
            href={`https://api.whatsapp.com/send/?phone=5511913393095&text=${encodeURIComponent("Olá! Vim pelo catálogo da Par Essencial e gostaria de atendimento para peças masculinas 😊")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              variant="outline"
              className="w-full h-auto py-5 border-border hover:border-primary/40 hover:bg-primary/5 transition-all flex flex-col items-center gap-2"
            >
              <MessageCircle className="h-6 w-6 text-primary" />
              <span className="text-base font-semibold text-foreground">Masculino</span>
              <span className="text-xs text-muted-foreground">Atendimento com Nicolas</span>
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
