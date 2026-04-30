import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('TechCart Environment');
  });

  it('renders the subtitle text', () => {
    render(<App />);
    
    expect(screen.getByText('Test environment for E2E automation')).toBeInTheDocument();
  });

  it('renders the TechCart component inside App', () => {
    render(<App />);
    
    // TechCart renderiza el catálogo y el carrito
    expect(screen.getByText('Catálogo de Productos')).toBeInTheDocument();
    expect(screen.getByText('Tu Carrito')).toBeInTheDocument();
    expect(screen.getByText('Carrito vacío')).toBeInTheDocument();
  });

  it('renders the product catalog with all products', () => {
    render(<App />);
    
    // Verificar que los 3 productos están presentes
    expect(screen.getByText('Producto A')).toBeInTheDocument();
    expect(screen.getByText('Producto B')).toBeInTheDocument();
    expect(screen.getByText('Producto C')).toBeInTheDocument();
  });

  it('renders with correct layout structure', () => {
    const { container } = render(<App />);
    
    // Verificar estructura del contenedor principal
    const mainContainer = container.firstElementChild as HTMLElement;
    expect(mainContainer).toHaveClass('max-w-7xl', 'mx-auto');
    
    // Verificar que el header existe
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('mb-8', 'text-center');
  });

  it('renders financial summary section with initial zero values', () => {
    render(<App />);
    
    // Verificar que los totales están en cero al inicio
    const subtotal = document.getElementById('subtotal');
    const tax = document.getElementById('tax');
    const total = document.getElementById('total');
    
    expect(subtotal).toHaveTextContent('$0.00');
    expect(tax).toHaveTextContent('$0.00');
    expect(total).toHaveTextContent('$0.00');
  });
});
