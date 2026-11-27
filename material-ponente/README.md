# Material de exposición

PDFs listos para quien imparte cada clase, y la presentación ejecutiva de la academia.

| Archivo | Para quién |
|---|---|
| [`academia-presentacion-ejecutiva.pdf`](academia-presentacion-ejecutiva.pdf) | Managers y head accounts: plan, tiempos, metas, hitos, ventajas e inversión |
| `nivel-0/` a `nivel-3/` | Ponentes: un PDF por clase (M0.1 a M3.12) |
| `nivel-4/` | Facilitadores: un PDF por taller (T4.1 a T4.6) |

## Qué trae cada PDF de clase

1. **Diapositivas para proyectar:** portada, objetivo, agenda con tiempos, conceptos y código,
   práctica (lab), preguntas de repaso y cierre.
2. **Notas para el ponente** (al final, no se proyectan): preparación antes de la clase, guion
   por bloque de la agenda, errores comunes de los alumnos, respuestas de referencia y cierre.

## Cómo se generan

Los PDFs no se editan a mano. Salen de dos archivos por clase:

- `niveles/<nivel>/<clase>/guia.md` → diapositivas
- `niveles/<nivel>/<clase>/ponente.md` → notas para el ponente

y la presentación ejecutiva sale de `docs/presentacion-ejecutiva.html`.

```bash
npm run pdfs                 # regenera todo
npm run pdfs -- m2.3 m3.5    # solo esas clases
npm run pdfs -- ejecutivo    # solo la presentación ejecutiva
```

Si cambias una guía o unas notas, regenera su PDF y súbelo en el mismo PR.
