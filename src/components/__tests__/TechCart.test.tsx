import { render, screen, fireEvent } from '@testing-library/react';
import TechCart from '../TechCart';

describe('TechCart Integration', () => {
  it('adds product to cart and updates badge', () => {
    const { container } = render(<TechCart />);
    
    // Al inicio el carrito está vacío
    expect(screen.getByText('Carrito vacío')).toBeInTheDocument();
    
    // Agregar un producto sin límite
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    fireEvent.click(addButtons[0]); // Producto A ($50)
    
    // Verifica que el badge se actualizó
    const badge = screen.getByText('1');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-blue-500'); // Validar clase base
    
    // Verifica que el carrito ya no está vacío y tiene el producto
    expect(screen.queryByText('Carrito vacío')).not.toBeInTheDocument();
    expect(screen.getAllByText('Producto A').length).toBeGreaterThan(0);
    
    // Verifica totales básicos
    const subtotal = container.querySelector('#subtotal');
    expect(subtotal).toHaveTextContent('$50.00');
  });

  it('enforces maxStock constraints via add button', () => {
    const { container } = render(<TechCart />);
    
    // Agregar producto con stock limitado (SKU-999 tiene maxStock 5)
    const btnSku999 = container.querySelector('#add-SKU-999') as HTMLButtonElement;
    
    // Agregar 6 veces (Límite 5)
    for(let i=0; i<6; i++) {
      fireEvent.click(btnSku999);
    }
    
    // Verificar que aparece el mensaje de error de stock
    expect(screen.getByText('Solo 5 unidades disponibles')).toBeInTheDocument();
    
    // Verificar que la cantidad se quedó en 5 (Input value)
    const inputs = screen.getAllByRole('spinbutton', { name: /cantidad/i }) as HTMLInputElement[];
    expect(inputs[0].value).toBe('5');
  });

  it('removes item and resets totals', () => {
    render(<TechCart />);
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    fireEvent.click(addButtons[0]); // Agregar
    
    const removeBtn = screen.getByTitle('Eliminar ítem');
    fireEvent.click(removeBtn); // Eliminar
    
    // Carrito vacío nuevamente
    expect(screen.getByText('Carrito vacío')).toBeInTheDocument();
    
    // Totales en cero
    const subtotal = document.getElementById('subtotal');
    expect(subtotal).toHaveTextContent('$0.00');
  });

  it('updates quantity via input (handleUpdateQuantity normal path)', () => {
    render(<TechCart />);
    
    // Agregar Producto A (sin maxStock)
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    fireEvent.click(addButtons[0]); // Producto A ($50)
    
    // Cambiar la cantidad a 3 a través del input
    const qtyInput = screen.getByRole('spinbutton', { name: /cantidad/i }) as HTMLInputElement;
    fireEvent.change(qtyInput, { target: { value: '3' } });
    
    // Verificar que la cantidad se actualizó
    expect(qtyInput.value).toBe('3');
    
    // Verificar que el subtotal refleja la nueva cantidad: 50 * 3 = 150
    const subtotal = document.getElementById('subtotal');
    expect(subtotal).toHaveTextContent('$150.00');
  });

  it('enforces maxStock constraints via quantity input (handleUpdateQuantity exceeded)', () => {
    const { container } = render(<TechCart />);
    
    // Agregar Producto C (SKU-999, maxStock: 5)
    const btnSku999 = container.querySelector('#add-SKU-999') as HTMLButtonElement;
    fireEvent.click(btnSku999);
    
    // Intentar cambiar la cantidad a 10 (excede maxStock de 5)
    const qtyInput = screen.getByRole('spinbutton', { name: /cantidad/i }) as HTMLInputElement;
    fireEvent.change(qtyInput, { target: { value: '10' } });
    
    // Verificar que aparece el error de stock
    expect(screen.getByText('Solo 5 unidades disponibles')).toBeInTheDocument();
    
    // Verificar que la cantidad se clampeó al maxStock (5)
    expect(qtyInput.value).toBe('5');
  });

  it('clears stockError when removing the product that caused it', () => {
    const { container } = render(<TechCart />);
    
    // Agregar Producto C (SKU-999) hasta exceder el stock para generar error
    const btnSku999 = container.querySelector('#add-SKU-999') as HTMLButtonElement;
    for (let i = 0; i < 6; i++) {
      fireEvent.click(btnSku999);
    }
    
    // Verificar que el error existe
    expect(screen.getByText('Solo 5 unidades disponibles')).toBeInTheDocument();
    
    // Eliminar ese producto del carrito
    const removeBtn = container.querySelector('#remove-item-SKU-999') as HTMLButtonElement;
    fireEvent.click(removeBtn);
    
    // Verificar que el error de stock se limpió (ya no existe en el DOM)
    expect(screen.queryByText('Solo 5 unidades disponibles')).not.toBeInTheDocument();
    
    // Verificar que el carrito quedó vacío
    expect(screen.getByText('Carrito vacío')).toBeInTheDocument();
  });

  it('adds multiple different products and calculates totals correctly', () => {
    const { container } = render(<TechCart />);
    
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    
    // Agregar Producto A ($50) y Producto B ($100.50)
    fireEvent.click(addButtons[0]); // Producto A
    fireEvent.click(addButtons[1]); // Producto B
    
    // Badge debe mostrar 2 (dos productos distintos)
    expect(screen.getByText('2')).toBeInTheDocument();
    
    // Subtotal = 50 + 100.50 = 150.50
    const subtotal = container.querySelector('#subtotal');
    expect(subtotal).toHaveTextContent('$150.50');
    
    // Tax = floor(150.50 * 0.19 * 100) / 100 = floor(28.595 * 100) / 100 = floor(2859.5) / 100 = 28.59
    const tax = container.querySelector('#tax');
    expect(tax).toHaveTextContent('$28.59');
    
    // Total = 150.50 + 28.59 = 179.09
    const total = container.querySelector('#total');
    expect(total).toHaveTextContent('$179.09');
  });
});
