# M2.6 Excepciones y depuración (14 h)

## Objetivo

Encontrar la causa de una falla con el Trace Viewer y clasificarla, en lugar de corregir a prueba y error.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Leer un error de Playwright de arriba abajo |
| 30 min | Trace Viewer: acciones, snapshots antes y después, red, consola |
| 20 min | `try/catch`, errores propios y mensajes de aserción |
| 20 min | Clasificar fallas: prueba, datos, sincronización, ambiente o bug |

## Conceptos clave

```bash
npx playwright test m2.6                                   # el config guarda trace al fallar
npx playwright show-trace test-results/<carpeta>/trace.zip
npx playwright test m2.6 -g "2." --debug                   # paso a paso
```

| Clasificación | Señales | Qué haces |
|---|---|---|
| Error de la prueba | Locator ambiguo, valor esperado mal escrito, frame equivocado | Corriges la prueba |
| Datos | Pasa sola pero falla en paralelo; depende de lo que dejó otra prueba | Aíslas los datos |
| Sincronización | Falla a veces; el trace muestra que la acción fue antes de tiempo | Esperas el estado correcto |
| Ambiente | Falla en un ambiente y no en otro; errores de red o 500 | Lo reportas a quien opera el ambiente |
| Bug de la app | La app hace algo distinto a lo que dicen los requisitos | Reportas el bug con el trace adjunto |

**Errores propios con contexto:**

```ts
if (indice === -1) throw new Error(`La tabla no tiene la columna "${columna}"`);
expect(respuesta.status(), await respuesta.text()).toBe(201);   // el cuerpo aparece si falla
```

## Lab (4 h + 10 h de práctica)

Las 5 pruebas de `lab.spec.ts` fallan. Para cada una escribe en tu PR qué dice el error,
qué viste en el trace, la causa y su clasificación. Después corrígela.

## Preguntas de repaso

1. ¿Qué te muestra el trace que el screenshot no?
2. ¿Por qué Playwright cancela un `confirm` si no lo manejas?
3. (Pregunta C de Manual QE) ¿Cómo distingues si un defecto es de frontend, backend o ambiente?
