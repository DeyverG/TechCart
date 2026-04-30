import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../Cart';
import { CartItem } from '../TechCart';

const mockItems: CartItem[] = [
  { id: 'A', name: 'Product A', price: 50, sku: 'A', maxStock: null, quantity: 2 },
  { id: 'B', name: 'Product B', price: 100.5, sku: 'B', maxStock: null, quantity: 1 },
];

describe('Cart', () => {
  it('calculates totals correctly with truncated tax', () => {
    const mockUpdate = jest.fn();
    const mockRemove = jest.fn();
    
    render(<Cart items={mockItems} onUpdateQuantity={mockUpdate} onRemove={mockRemove} stockError={null} badgeCount={3} />);
    
    expect(screen.getByText('$200.50')).toBeInTheDocument(); // Subtotal
    expect(screen.getByText('$38.09')).toBeInTheDocument(); // Tax truncated
    expect(screen.getByText('$238.59')).toBeInTheDocument(); // Total
  });

  it('renders empty cart message when no items', () => {
    render(<Cart items={[]} onUpdateQuantity={jest.fn()} onRemove={jest.fn()} stockError={null} badgeCount={0} />);
    expect(screen.getByText('Carrito vacío')).toBeInTheDocument();
  });

  it('calls onUpdateQuantity when input changes', () => {
    const mockUpdate = jest.fn();
    render(<Cart items={[mockItems[0]]} onUpdateQuantity={mockUpdate} onRemove={jest.fn()} stockError={null} badgeCount={2} />);
    
    const input = screen.getByRole('spinbutton', { name: /cantidad/i });
    fireEvent.change(input, { target: { value: '3' } });
    
    expect(mockUpdate).toHaveBeenCalledWith(mockItems[0], 3);
  });

  it('calls onRemove when remove button is clicked', () => {
    const mockRemove = jest.fn();
    render(<Cart items={[mockItems[0]]} onUpdateQuantity={jest.fn()} onRemove={mockRemove} stockError={null} badgeCount={2} />);
    
    const removeBtn = screen.getByTitle('Eliminar ítem');
    fireEvent.click(removeBtn);
    
    expect(mockRemove).toHaveBeenCalledWith(mockItems[0].id);
  });
});
