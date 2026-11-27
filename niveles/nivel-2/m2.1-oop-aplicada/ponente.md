# Notas del ponente: M2.1 OOP aplicada a pruebas

## Antes de la clase

- Abre `framework/paginas/PaginaBase.ts` y `framework/componentes/Encabezado.ts`.
- Prepara un ejemplo de suite sin diseño: 3 pruebas con el mismo login y los mismos locators copiados.

## Guion de la sesión

1. **Por qué diseño (15 min).** Muestra las 3 pruebas duplicadas y cambia el texto del botón "Entrar": hay que tocar 3 lugares. Multiplícalo por 200 pruebas.
2. **Herencia y clases abstractas (25 min).** Recorre `PaginaBase`: `abstract ruta` obliga a cada página a definirla y `abrir()` se hereda. Intenta `new PaginaBase(page)` y lee el error.
3. **Sobrescritura (20 min).** Construye `ReporteConLentas` que sobrescribe `formatear` y llama a `super.formatear()`. Quita el `super` y muestra que se pierde el comportamiento del padre.
4. **Composición vs herencia (30 min).** "Es un" vs "tiene un". `PaginaBase` *tiene un* `Encabezado`; las páginas no heredan de él. Pregunta: ¿`PaginaCarrito` debería heredar de `PaginaProductos` porque las dos muestran productos? (No: no *es* una página de productos.)

## Errores comunes

- Jerarquías profundas (`PaginaConTabla` → `PaginaConTablaYFiltros` → ...) que nadie entiende.
- Olvidar `override` y que TypeScript no avise cuando el método del padre cambia de nombre.
- Exponer arreglos internos sin copia: la prueba los modifica sin querer.

## Respuestas de referencia

1. Porque define el esqueleto común y obliga a cada tipo de reporte a implementar su propio `formatear`; no tiene sentido un reporte "genérico".
2. Se reemplaza todo el comportamiento del padre: solo queda lo que escribiste en la hija.
3. Para que quien la llama no pueda modificar el estado interno de la clase.
4. Una subclase redefine un método heredado con la misma firma para cambiar o extender su comportamiento; puede reutilizar el original con `super`.

## Cierre

Tarea extra: en `PaginaBase` y `Encabezado`, marcar dónde hay herencia y dónde composición. Lo usarán en M2.2.
