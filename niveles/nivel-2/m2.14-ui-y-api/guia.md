# M2.14 UI + API juntos (14 h)

## Objetivo

Preparar datos y sesión por API y validar por UI solo lo que el usuario ve. Pruebas más rápidas y estables.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 20 min | Por qué no hacer todo por UI |
| 25 min | Iniciar sesión sin pantalla de login: `addInitScript` y `storageState` |
| 25 min | Crear datos por API y validar en UI, y al revés |
| 20 min | Limpieza de datos: crear único vs borrar al terminar |

## Conceptos clave

```ts
// Sesión por API: el token se pone en localStorage antes de que cargue la página
await page.addInitScript(([u, t]) => {
  localStorage.setItem('usuario', u);
  localStorage.setItem('token', t);
}, [usuario, token]);
await page.goto('/pedidos.html');
```

| Paso | Por API | Por UI |
|---|---|---|
| Iniciar sesión | ✅ (salvo en las pruebas del login) | |
| Crear datos de prueba | ✅ | |
| La acción que se prueba | | ✅ |
| Validar lo que ve el usuario | | ✅ |
| Validar el resultado real | ✅ (la API es la fuente de verdad) | |

En el Nivel 3 se usa `storageState` para guardar la sesión una vez y reutilizarla en toda la suite.

## Lab (4 h + 10 h de práctica)

Completa el fixture `paginaPedidos` en `framework/fixtures.ts`. Corre `npx playwright test m2.14`
y compara el tiempo con `npx playwright test m2.4`.

## Preguntas de repaso

1. ¿Qué pruebas sí deben iniciar sesión por la UI?
2. ¿Por qué la prueba "pagar por UI" valida también por API?
