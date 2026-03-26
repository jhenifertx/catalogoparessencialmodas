import { CartItem, Product } from "@/types/product";
import { WHATSAPP_NUMBER } from "@/data/products";

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function buildSingleProductMessage(product: Product): string {
  const msg = `Olá! Tenho interesse nesta peça da Par Essencial:

Produto: ${product.name}
Categoria: ${product.category}
Preço: ${formatPrice(product.price)}

Pode me passar mais informações?`;
  return msg;
}

export function buildCartMessage(items: CartItem[]): string {
  const itemLines = items.map((item) => {
    let line = `- Produto: ${item.product.name}
  Categoria: ${item.product.category}
  Quantidade: ${item.quantity}`;
    if (item.selectedSize) line += `\n  Tamanho: ${item.selectedSize}`;
    if (item.selectedColor) line += `\n  Cor: ${item.selectedColor}`;
    line += `\n  Preço: ${formatPrice(item.product.price * item.quantity)}`;
    return line;
  });

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return `Olá! Tenho interesse nas seguintes peças da Par Essencial:

${itemLines.join("\n\n")}

Total estimado: ${formatPrice(total)}

Gostaria de finalizar meu atendimento 😊`;
}

export function openWhatsApp(message: string) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
}
