# M0.1 Entorno de trabajo (6 h)

## Objetivo

Dejar lista la computadora para todo el curso y entender para qué sirve cada herramienta.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 15 min | Qué vamos a construir en la academia y por qué TypeScript + Playwright |
| 30 min | Instalación guiada: Node.js LTS, Git, VS Code |
| 30 min | La terminal: moverse entre carpetas y correr comandos |
| 15 min | Clonar este repo, `npm install` y correr las primeras pruebas |

## Conceptos clave

| Herramienta | Para qué sirve |
|---|---|
| **Node.js** | Ejecuta JavaScript y TypeScript fuera del navegador. Playwright corre sobre Node. |
| **npm** | Instala librerías (como Playwright) y corre los scripts del `package.json`. |
| **npx** | Ejecuta una herramienta instalada en el proyecto: `npx playwright test`. |
| **TypeScript** | JavaScript con tipos. Te avisa de errores antes de correr la prueba. |
| **VS Code** | Editor. Instala la extensión oficial **Playwright Test for VS Code**. |

Comandos de terminal que vas a usar todo el curso:

```bash
pwd                 # ¿en qué carpeta estoy?
ls                  # ¿qué hay aquí? (en Windows PowerShell también funciona)
cd niveles/nivel-0  # entrar a una carpeta
cd ..               # subir una carpeta
node --version      # ¿está instalado Node?
```

## Lab (4 h)

1. Instala Node.js LTS (versión 20 o mayor), Git y VS Code.
2. Clona el repo y entra a la carpeta:

   ```bash
   git clone https://github.com/rigocont/test-academy.git
   cd test-academy
   npm install
   npx playwright install chromium
   ```

3. Corre las pruebas del Nivel 0. Es normal que casi todas fallen: todavía no haces los ejercicios.

   ```bash
   npm run test:nivel0
   ```

4. Levanta la tienda de práctica y ábrela en el navegador en `http://localhost:3000`:

   ```bash
   npm run app
   ```

5. Entra con el usuario `estandar` y la contraseña `secreto123`. Recorre todas las páginas.
6. Crea un archivo `hola.ts` con `console.log('Hola, QA')` y córrelo con `npx tsx hola.ts`.

**Listo cuando:** las pruebas corren (aunque fallen), la tienda abre y `hola.ts` imprime el mensaje.

## Preguntas de repaso

1. ¿Qué diferencia hay entre `npm` y `npx`?
2. ¿Por qué TypeScript y no JavaScript solo?
3. ¿Qué hace `npm install` con el archivo `package.json`?

## Para el instructor

- El error más común es instalar Node viejo. Pide `node --version` en la sesión.
- En Windows, recomienda usar la terminal integrada de VS Code para evitar problemas de rutas.
