# Notas del facilitador: T4.2 Plataformas internas de automatización

## Antes del taller

- Pide a 2 o 3 participantes que compartan la estructura de carpetas de su framework (solo el árbol, sin código sensible).
- Ten preparado un ejemplo mínimo de paquete npm interno o de workflow reutilizable (`workflow_call`).

## Guion (3 h)

1. **Exposición (30 min).** Qué se comparte y qué no. Las 4 formas de compartir y su costo. Versionado semántico con un ejemplo: renombrar un fixture es un cambio MAYOR. La adopción se gana con un piloto, no con un correo.
2. **Caso en grupo (60 min).** Comparen los árboles de los frameworks. Marquen con un color lo que se repite (login, cliente base, reporters, config) y con otro lo que es propio del producto. Diseñen la API pública de un paquete con lo repetido.
3. **Presentación y crítica (45 min).** Cada grupo presenta su paquete. Preguntas obligatorias del resto: ¿quién lo mantiene?, ¿cómo se publica una versión?, ¿qué pasa si un equipo necesita algo distinto?
4. **Arranque del entregable (45 min).** Cada quien empieza el diseño de su activo compartido con la plantilla.

## Preguntas para provocar la discusión

- ¿Cuántas veces se ha escrito el mismo login en su organización?
- ¿Qué pasó la última vez que alguien cambió una utilidad compartida sin avisar?
- ¿Qué es más fácil de adoptar: un paquete o una plantilla? ¿Por qué?

## Señales de un buen entregable

- Alcance pequeño en la versión 1.0, con una lista explícita de lo que no incluye.
- Un equipo piloto con nombre y una métrica de éxito.
- Dueños, canal de soporte y proceso de releases definidos.

## Seguimiento en la mentoría

El criterio es que un equipo piloto lo use en su CI. Si en dos mentorías no hay piloto, revisen juntos si el activo resuelve un problema real.
