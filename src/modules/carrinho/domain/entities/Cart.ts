export interface CartItem { id: string; productId: string; qty: number; unitPrice: string; }
export interface Cart { id: string; userId: string; items: CartItem[]; }
