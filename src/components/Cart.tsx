import { useState, useEffect, ChangeEvent } from 'react';
import { CartItem, Product } from './TechCart';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (product: Product, quantity: number) => void;
  onRemove: (productId: string) => void;
  stockError: string | null;
  badgeCount: number;
}

export default function Cart({ items, onUpdateQuantity, onRemove, stockError, badgeCount }: CartProps) {
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [, setDummy] = useState(0); // para forzar render en inputs invalidos

  useEffect(() => {
    const newSubtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const newTax = newSubtotal * 0.19;
    const newTotal = newSubtotal + newTax;

    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [items]);

  const handleChange = (item: CartItem, e: ChangeEvent<HTMLInputElement>) => {
    const valueStr = e.target.value;
    const value = parseInt(valueStr, 10);
    
    // Validar: si es invalido (NaN, cero o negativo), rechazar el input restaurando su valor anterior
    if (isNaN(value) || value <= 0) {
      setDummy(d => d + 1); // Fuerza render para descartar el input del DOM
      return;
    }
    
    onUpdateQuantity(item, value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-3">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          Tu Carrito
          <span id="cart-badge" className="bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            {badgeCount}
          </span>
        </h2>
        <span id="cart-status" className={badgeCount > 0 ? "text-emerald-400 font-medium tracking-wide text-sm" : "hidden"}>
          {badgeCount > 0 ? "Activo" : ""}
        </span>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        {items.length === 0 ? (
          <div id="empty-cart-message" className="text-center py-16 text-slate-500 flex flex-col items-center justify-center flex-grow">
            <div className="bg-slate-50 p-6 rounded-full mb-4">
              <svg className="w-16 h-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-xl font-medium text-slate-600">Carrito vacío</p>
            <p className="text-sm text-slate-400 mt-2">Agrega productos del catálogo para comenzar</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 mb-8 flex-grow">
            {items.map(item => (
              <li key={item.id} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                  <p className="text-sm font-medium text-slate-500">${item.price.toFixed(2)} c/u</p>
                  {stockError === item.id && (
                    <p id={`stock-error-${item.sku}`} className="text-sm text-rose-500 mt-1.5 font-medium flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Solo {item.maxStock} unidades disponibles
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end gap-1">
                    <label htmlFor={`qty-item-${item.sku}`} className="sr-only">Cantidad</label>
                    <input
                      id={`qty-item-${item.sku}`}
                      type="number"
                      min="1"
                      className="w-20 p-2 text-lg border-2 border-slate-200 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-center font-medium text-slate-700 outline-none transition-all"
                      value={item.quantity}
                      onChange={(e) => handleChange(item, e)}
                    />
                  </div>
                  <div className="text-right w-24">
                    <p className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    id={`remove-item-${item.sku}`}
                    onClick={() => onRemove(item.id)}
                    className="text-rose-400 hover:text-rose-600 p-2 rounded-full hover:bg-rose-50 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                    title="Eliminar ítem"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-auto">
          <div className="space-y-3">
            <div className="flex justify-between text-slate-600">
              <span className="font-medium">Subtotal</span>
              <span id="subtotal" className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600 pb-4 border-b border-slate-200/80">
              <span className="font-medium">Impuestos (19%)</span>
              <span id="tax" className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-bold text-slate-900">Total</span>
              <span id="total" className="text-2xl font-extrabold text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
