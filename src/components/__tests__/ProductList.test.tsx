import { render, screen, fireEvent } from '@testing-library/react';
import ProductList from '../ProductList';
import { Product } from '../TechCart';

const mockProducts: Product[] = [
  { id: '1', name: 'Test Product', price: 10, sku: 'SKU-1', maxStock: null },
  { id: '2', name: 'Limited Product', price: 20, sku: 'SKU-2', maxStock: 5 },
];

describe('ProductList', () => {
  it('renders correctly', () => {
    const mockOnAdd = jest.fn();
    render(<ProductList products={mockProducts} onAdd={mockOnAdd} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('Stock: 5')).toBeInTheDocument();
  });

  it('calls onAdd when click add button', () => {
    const mockOnAdd = jest.fn();
    render(<ProductList products={mockProducts} onAdd={mockOnAdd} />);
    
    const addButtons = screen.getAllByRole('button', { name: /agregar/i });
    fireEvent.click(addButtons[0]);
    
    expect(mockOnAdd).toHaveBeenCalledWith(mockProducts[0]);
  });
});
