import { Product } from './TechCart';

interface ProductListProps {
  products: Product[];
  onAdd: (product: Product) => void;
}

export default function ProductList({ products, onAdd }: ProductListProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5">
        <h2 className="text-xl font-semibold tracking-wide">Catálogo de Productos</h2>
      </div>
      <div className="p-6">
        <div className="grid gap-5">
          {products.map(product => (
            <div key={product.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border-2 border-slate-100 hover:border-blue-100 transition-all bg-white hover:bg-blue-50/30 group gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{product.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-slate-600 font-semibold text-lg">${product.price.toFixed(2)}</p>
                  {product.maxStock !== null && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                      Stock: {product.maxStock}
                    </span>
                  )}
                </div>
              </div>
              <button
                id={product.id === 'SKU-999' ? 'add-SKU-999' : `add-item-${product.id}`}
                onClick={() => onAdd(product)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md shadow-blue-600/20 transition-all transform active:scale-95 flex items-center justify-center gap-2 sm:w-auto w-full"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Agregar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
