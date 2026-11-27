# M2.13 Pruebas data-driven (14 h)

## Objetivo

Escribir una prueba una vez y correrla con muchos datos, desde arreglos o archivos.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Data-driven vs keyword-driven |
| 25 min | Generar pruebas con un ciclo y nombres dinámicos |
| 25 min | Datos desde archivos (JSON, CSV) |
| 20 min | Valores límite y particiones como tablas de datos |

## Conceptos clave

```ts
const casos = [
  { cp: '0660', valido: false },
  { cp: '06600', valido: true },
];

for (const { cp, valido } of casos) {
  test(`código postal ${cp} → ${valido ? 'acepta' : 'rechaza'}`, async ({ pedidos }) => {
    const respuesta = await pedidos.crear(nuevoPedido({ cp }));
    expect(respuesta.status()).toBe(valido ? 201 : 400);
  });
}
```

Cada caso es una prueba independiente en el reporte. `npx playwright test m2.13 --list` las muestra todas.
El nombre debe incluir el dato: si falla "cantidad 11 → 400", sabes cuál sin abrir el reporte.

| Enfoque | Qué cambia entre casos | Ejemplo |
|---|---|---|
| **Data-driven** | Los datos | La misma validación con 10 códigos postales |
| **Keyword-driven** | Los pasos, descritos con palabras clave en una tabla | "Abrir login · Entrar como · Agregar producto" |

Playwright favorece data-driven con código. Keyword-driven suele venir de herramientas
como Robot Framework, o se arma con funciones de alto nivel.

## Lab (4 h + 10 h de práctica)

Completa las secciones 2, 3 y 4 de `lab.spec.ts`: valores límite de la cantidad,
particiones del nombre del cliente y casos desde `productos.csv`.

## Preguntas de repaso (pregunta B de Automatización del examen)

1. ¿Qué diferencia hay entre un framework data-driven y uno keyword-driven?
2. ¿Por qué el dato debe ir en el nombre de la prueba?
