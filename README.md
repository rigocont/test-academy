# Academia de Automatización de Pruebas

Ruta de aprendizaje para ingenieros QA que quieren crecer en automatización, desde cero
(sin programar) hasta nivel experto.

- **Stack:** TypeScript + Playwright, para pruebas de UI y de API.
- **Formato:** mixto. Sesiones en vivo cortas y labs autoguiados.
- **Niveles:** 0 a 4, alineados con el *QA Experience Assessment Framework*.

| Nivel | Nombre | Rol al terminar |
|---|---|---|
| 0 | Bases | Listo para automatizar |
| 1 | Beginner | QA Jr |
| 2 | Intermediate | QA Mid |
| 3 | Advanced | QA Sr |
| 4 | Expert | Lead / Principal |

## Cómo empezar

Necesitas Node.js 20 o mayor y Git.

```bash
git clone https://github.com/rigocont/test-academy.git
cd test-academy
npm install
npx playwright install chromium
npm run test:nivel0     # ejercicios del Nivel 0 (al inicio casi todos fallan: es normal)
npm run app             # abre la tienda de práctica en http://localhost:3000
```

## Estructura del repo

| Carpeta | Qué hay |
|---|---|
| `docs/` | Matriz de competencias, examen de ubicación y temario por nivel |
| `niveles/nivel-0/` | Guías de clase y ejercicios de TypeScript con pruebas que validan |
| `niveles/nivel-1/` | Guías de clase y labs de Playwright (UI y API) |
| `niveles/nivel-2/` | Framework propio (Page Objects, fixtures, clientes de API) y sus labs |
| `niveles/nivel-3/` | Arquitectura, ambientes, CI/CD, mocking, esquemas, seguridad, estrategia y métricas |
| `niveles/nivel-4/` | Talleres de liderazgo, mentoría y plantillas de entregables |
| `material-ponente/` | PDF de exposición por clase (diapositivas y notas para el ponente) y presentación ejecutiva |
| `app/` | Tienda de práctica: login, productos, carrito, checkout, pedidos, herramientas y API REST con token, sin dependencias |
| `scripts/` | `verificar-soluciones.mjs`: comprueba que todas las soluciones pasan |

| Comando | Qué hace |
|---|---|
| `npm run test:nivel0` a `test:nivel3` | Corre los ejercicios o labs de un nivel |
| `npx playwright test m1.3 --ui` | Corre un módulo en modo UI |
| `npm run app` | Levanta la tienda de práctica |
| `npm run reporte` | Abre el último reporte HTML |
| `npm run pdfs` | Regenera los PDF de exposición y la presentación ejecutiva |
| `npm run verificar-soluciones` | Para instructores: corre las pruebas con las soluciones de referencia |

> Las soluciones (`solucion.ts`, `solucion.spec.ts` y `*.solucion.ts`) están en el mismo repo para que los
> instructores las mantengan junto al material. Para un grupo real conviene publicar a los
> alumnos una copia sin esas carpetas o mover las soluciones a un repo privado.

## Documentos

- [Matriz de competencias por nivel](docs/00-matriz-competencias.md)
- [Examen de ubicación](docs/01-examen-ubicacion.md)
- [Temario por nivel](docs/temario/README.md)
- [Material del Nivel 0](niveles/nivel-0/README.md)
- [Material del Nivel 1](niveles/nivel-1/README.md)
- [Material del Nivel 2](niveles/nivel-2/README.md)
- [Material del Nivel 3](niveles/nivel-3/README.md)
- [Programa del Nivel 4](niveles/nivel-4/README.md)
- [Material de exposición en PDF](material-ponente/README.md)
- [Presentación ejecutiva (PDF)](material-ponente/academia-presentacion-ejecutiva.pdf)

## Estado

1. ✅ Matriz de competencias y examen de ubicación
2. ✅ Temario detallado por nivel
3. ✅ Material piloto de Nivel 0 y Nivel 1
4. ✅ Material de Niveles 2 a 4
