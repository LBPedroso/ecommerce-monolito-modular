export interface OrderItem { id: string; productId: string; qty: number; unitPrice: string; }
export interface Order { id: string; userId: string; total: string; status: string; createdAt: Date; items: OrderItem[]; }
