# Notas del ponente: M3.1 Arquitectura de un framework

## Antes de la clase

- Pide a 2 alumnos que compartan el framework de su Proyecto 2A para revisarlo en vivo.
- Ten en el pizarrón el diagrama de capas de la guía.

## Guion de la sesión

1. **Las capas (20 min).** Pruebas, páginas y clientes, datos y soporte. La regla: una capa solo conoce a las de abajo. Pregunta dónde iría una función `reintentar` y dónde un `crearPedidoPagado`.
2. **Revisión del framework del Nivel 2 (30 min).** Proyecta un framework real y busca imports que rompan la regla (una página que importa un cliente, una utilidad que conoce una página). Pregunta qué dolería al agregar la prueba 200.
3. **Patrones (30 min).** Builder para datos legibles (`new ConstructorPedido().paraCliente('Ana').conProducto(4, 2)`), Repository para fuentes de datos, Strategy para elegir ambiente. Para cada uno: qué problema resuelve.
4. **Genéricos y clases abstractas (20 min).** `reintentar<T>` conserva el tipo de lo que devuelve. Una clase abstracta vale la pena con 3 o más implementaciones parecidas; antes es sobreingeniería.
5. **Clean code en pruebas (20 min).** Nombres de negocio, una razón para fallar, sin `if` dentro de las pruebas.

## Errores comunes

- Un `utils.ts` de 800 líneas donde termina todo.
- Abstraer con la primera repetición en lugar de la tercera.
- Usar `reintentar` para esconder pruebas inestables.

## Respuestas de referencia

1. Porque mezcla dos responsabilidades: la página cambiaría cuando cambia la API, y la prueba deja de decidir cómo prepara sus datos.
2. El builder hace explícita la intención con métodos con nombre, acumula cambios paso a paso y valida al construir; con un objeto de cambios es fácil armar datos inválidos.
3. Cuando reintenta la acción que se está probando: si el sistema falla a veces, eso es un bug que hay que reportar.
4. Respuesta personal. Busca ejemplos de clases base con un solo uso o configuraciones genéricas que nadie usa.

## Cierre

Entregable: diagrama de capas de su framework y PR corrigiendo los imports que rompen la regla.
