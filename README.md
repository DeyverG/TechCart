# TechCart 🛒

Este es el repositorio principal para el módulo de compras TechCart. Está construido utilizando React, Vite y Tailwind CSS, implementando reglas estrictas de lógica de negocio e integraciones de testing completas.

## 🚀 Empezando

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

---

## 🧪 Pruebas Unitarias (Jest)

El proyecto cuenta con pruebas unitarias para validar la lógica interna de los componentes React, como cálculos matemáticos y comportamiento de la interfaz gráfica sin levantar un navegador completo.

- Las pruebas se encuentran dentro del directorio: `src/components/__tests__/`

### Ejecutar Pruebas Unitarias

Para correr las pruebas una sola vez en la consola:
```bash
npm run test
```

Si estás desarrollando y quieres que Jest re-ejecute las pruebas automáticamente cada vez que guardas un archivo (Modo Watch):
```bash
npm run test:watch
```

**Ver Resultados:** Los resultados aparecerán detallados directamente en tu terminal, indicando qué tests pasaron (verde) y cuáles fallaron (rojo).

---

## 🌐 Pruebas End-to-End E2E (Playwright)

Utilizamos [Playwright](https://playwright.dev/) para simular interacciones reales de usuario en el navegador y validar los flujos completos y las restricciones de concurrencia.

- Las pruebas E2E están ubicadas en el directorio: `e2e/`
- La configuración se encuentra en: `playwright.config.ts`

### Configurar Playwright (Solo la primera vez)

Debes descargar los binarios del navegador (Chromium) para que Playwright pueda abrirlo:
```bash
npx playwright install chromium
```

### Ejecutar Pruebas E2E

Para ejecutar las pruebas E2E en modo invisible/rápido (ideal para pipelines de CI/CD):
```bash
npm run test:e2e
```

Para visualizar paso a paso lo que hace el navegador y utilizar la herramienta visual de Playwright:
```bash
npm run test:e2e:ui
```

### Ver el Reporte de Playwright
Después de ejecutar `npm run test:e2e`, Playwright genera un reporte HTML detallado. Si quieres visualizar los resultados, trazas de errores o videos de la ejecución:
```bash
npx playwright show-report
```
Esto levantará un servidor temporal y abrirá automáticamente el reporte en tu navegador.
