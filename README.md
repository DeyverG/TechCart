# TechCart 🛒

[![CI/CD Pipeline](https://github.com/DeyverG/TechCart/actions/workflows/ci.yml/badge.svg)](https://github.com/DeyverG/TechCart/actions/workflows/ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=techcart-project&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=techcart-project)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=techcart-project&metric=coverage)](https://sonarcloud.io/summary/new_code?id=techcart-project)

Este es el repositorio principal para el módulo de compras TechCart. Está construido utilizando React, Vite y Tailwind CSS, implementando reglas estrictas de lógica de negocio e integraciones de testing completas.

### 📐 Lógica de Redondeo Financiero
Todos los cálculos de subtotal, impuestos (19%) y totales aplican **redondeo estándar (`Math.round`)** a 2 decimales para garantizar consistencia absoluta en los reportes financieros.

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

El proyecto cuenta con pruebas unitarias para validar la lógica interna de los componentes React, como cálculos matemáticos y comportamiento de la interfaz gráfica sin levantar un navegador completo. Implementa un **umbral de cobertura mínimo del 80% (`coverageThreshold`)** de forma estricta.

- Las pruebas se encuentran dentro del directorio: `src/components/__tests__/`

### Medir Cobertura de Código
Para ejecutar las pruebas y verificar el reporte general de cobertura en todas las métricas (Statements, Branches, Functions, Lines):
```bash
npm run test:coverage
```

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

La automatización E2E está configurada para probar simultáneamente en los tres motores principales: **Chromium, Firefox y WebKit**.

Para descargar los binarios e instalar las dependencias de sistema operativo requeridas para los tres navegadores (Chromium, Firefox y WebKit):
```bash
npx playwright install
npx playwright install-deps
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
