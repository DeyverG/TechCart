import { useState } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';

export interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
  maxStock: number | null;
}

export interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  { id: 'A', name: 'Producto A', price: 50.00, sku: 'A', maxStock: null },
  { id: 'B', name: 'Producto B', price: 100.50, sku: 'B', maxStock: null },
  { id: 'SKU-999', name: 'Producto C', price: 20.00, sku: 'SKU-999', maxStock: 5 },
];

export default function TechCart() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [stockError, setStockError] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const currentQty = prev[product.id] || 0;
      const nextQty = currentQty + 1;
      
      if (product.maxStock !== null && nextQty > product.maxStock) {
        setStockError(product.id);
        return prev;
      }
      
      setStockError(null);
      return { ...prev, [product.id]: nextQty };
    });
  };

  const handleUpdateQuantity = (product: Product, value: number) => {
    if (product.maxStock !== null && value > product.maxStock) {
      setStockError(product.id);
      setCart(prev => ({ ...prev, [product.id]: product.maxStock! }));
      return;
    }

    setStockError(null);
    setCart(prev => ({ ...prev, [product.id]: value }));
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
    if (stockError === productId) {
      setStockError(null);
    }
  };

  const cartItems: CartItem[] = Object.keys(cart).map(id => {
    const product = PRODUCTS.find(p => p.id === id)!;
    return { ...product, quantity: cart[id] };
  });

  const cartBadgeCount = cartItems.length;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      <div className="xl:col-span-5">
        <ProductList products={PRODUCTS} onAdd={handleAddToCart} />
      </div>
      <div className="xl:col-span-7">
        <Cart 
          items={cartItems} 
          onUpdateQuantity={handleUpdateQuantity} 
          onRemove={handleRemoveItem}
          stockError={stockError}
          badgeCount={cartBadgeCount}
        />
      </div>
    </div>
  );
}
