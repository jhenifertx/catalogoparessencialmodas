export type Gender = "masculino" | "feminino";

export type ProductBadge = "novo" | "destaque" | "mais-pedido" | "ultimas-pecas";

export interface Product {
  id: string;
  name: string;
  category: string;
  gender: Gender;
  price: number;
  description: string;
  images: string[];
  badge?: ProductBadge;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  sizes?: string[];
  colors?: string[];
  sku?: string;
  fit?: string;
  occasions?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
