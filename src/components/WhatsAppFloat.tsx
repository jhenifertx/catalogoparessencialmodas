import { MessageCircle } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";

const WhatsAppFloat = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      {/* Only show on desktop — mobile uses bottom nav */}
      <button
        onClick={() => setContactOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full items-center justify-center shadow-lg hover:scale-110 transition-transform hidden md:flex"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </button>
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
};

export default WhatsAppFloat;
