import { test, expect } from '@playwright/test';

test.describe('TechCart - Casos de Prueba de Optimización', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navegar a la aplicación antes de cada prueba
    await page.goto('/');
  });

  // CP-OPT-01: Validación matemática integral (Cálculo financiero).
  test('CP-OPT-01: Validación matemática integral (Cálculo financiero)', async ({ page }) => {
    // Agregar Producto A ($50) dos veces
    const addProductA = page.locator('#add-item-A');
    await addProductA.click();
    await addProductA.click();

    // Agregar Producto B ($100.50) una vez
    const addProductB = page.locator('#add-item-B');
    await addProductB.click();

    // Validar Subtotal: $200.50
    await expect(page.locator('#subtotal')).toHaveText('$200.50');

    // Validar Impuestos (19%): $38.09 (Nota: 200.50 * 0.19 = 38.095 -> truncado a 38.09)
    await expect(page.locator('#tax')).toHaveText('$38.09');

    // Validar Total: $238.59
    await expect(page.locator('#total')).toHaveText('$238.59');
  });

  // CP-OPT-02: Inicialización del carrito y transición de estado.
  test('CP-OPT-02: Inicialización del carrito y transición de estado', async ({ page }) => {
    // Acción: "Agregar" SKU-999 (1 clic)
    const addSku999 = page.locator('#add-SKU-999');
    await addSku999.click();

    // Validar: El ícono global actualiza el badge a "1"
    const cartBadge = page.locator('#cart-badge');
    await expect(cartBadge).toHaveText('1');

    // Validar: El estado del carrito pasa a "Activo"
    const cartStatus = page.locator('#cart-status');
    await expect(cartStatus).toHaveText('Activo');
    // Validar que ya no esté la clase 'hidden'
    await expect(cartStatus).not.toHaveClass(/hidden/);
  });

  // CP-OPT-03: Control de concurrencia y límite de inventario.
  test('CP-OPT-03: Control de concurrencia y límite de inventario', async ({ page }) => {
    // Producto SKU-999 tiene Stock = 5.
    const addSku999 = page.locator('#add-SKU-999');
    
    // Intentar agregar 6 unidades haciendo clic 6 veces
    for (let i = 0; i < 6; i++) {
      await addSku999.click();
    }

    // Validar: Se bloquea el incremento o muestra: "Solo 5 unidades disponibles"
    const stockError = page.locator('#stock-error-SKU-999');
    await expect(stockError).toHaveText('Solo 5 unidades disponibles');
    await expect(stockError).toBeVisible();

    // Validar: Cantidad retenida en 5.
    const qtyInput = page.locator('#qty-item-SKU-999');
    await expect(qtyInput).toHaveValue('5');
  });

  // CP-OPT-04: Remoción de ítems y limpieza financiera.
  test('CP-OPT-04: Remoción de ítems y limpieza financiera', async ({ page }) => {
    // Carrito activo con 1 ítem de $50 (Producto A)
    await page.locator('#add-item-A').click();
    await expect(page.locator('#subtotal')).toHaveText('$50.00');

    // Acción: Eliminar ítem
    const removeBtn = page.locator('#remove-item-A');
    await removeBtn.click();

    // Validar: El producto se elimina (el input de cantidad ya no debe existir)
    await expect(page.locator('#qty-item-A')).not.toBeVisible();

    // Validar: Subtotal e impuestos se restablecen a $0.00
    await expect(page.locator('#subtotal')).toHaveText('$0.00');
    await expect(page.locator('#tax')).toHaveText('$0.00');
    await expect(page.locator('#total')).toHaveText('$0.00');
  });

  // CP-OPT-05: Sanitización de inputs (Partición inválida).
  test('CP-OPT-05: Sanitización de inputs (Partición inválida)', async ({ page }) => {
    // Agregar un producto para tener el input
    await page.locator('#add-item-A').click();
    const qtyInput = page.locator('#qty-item-A');

    // Valor válido inicial es 1
    await expect(qtyInput).toHaveValue('1');

    // Input manual en cantidad: 0
    await qtyInput.fill('0');
    // Forzar blur o enter para disparar validación si fuera necesario (React lo hace on change)
    await qtyInput.press('Enter');
    // Validar: Rechaza el input y restaura valor anterior válido (1)
    await expect(qtyInput).toHaveValue('1');

    // Input manual en cantidad: -1
    await qtyInput.fill('-1');
    await qtyInput.press('Enter');
    await expect(qtyInput).toHaveValue('1');

    // Input manual en cantidad: texto abc
    // Utilizamos evaluate porque Playwright rechaza estrictamente .fill() con texto en inputs type="number"
    await qtyInput.evaluate((el: HTMLInputElement) => {
      el.value = 'abc'; // El navegador lo interpretará como vacío ("") internamente por ser type number
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await qtyInput.press('Enter');
    await expect(qtyInput).toHaveValue('1');
  });

});
