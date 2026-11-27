# Matriz de competencias por nivel

Esta matriz es la base de toda la academia. Toma las áreas, habilidades y horas del
**QA Experience Assessment Framework** y las asigna a los cinco niveles de la academia.
Cada habilidad aparece en el nivel donde se enseña por primera vez y se considera
dominada.

- **Stack:** TypeScript + Playwright (UI y API).
- **Formato:** mixto. Sesiones en vivo cortas para conceptos y demos, labs autoguiados para practicar.
- **Ubicación:** el examen de ubicación ([01-examen-ubicacion.md](01-examen-ubicacion.md)) decide en qué nivel entra cada persona.

## 1. Niveles

La escala es la misma del framework (0 a 4). Para la academia, cada nivel es un curso
que lleva a la persona **hasta** esa competencia.

| Nivel | Nombre (framework) | Qué significa | Rol típico al terminarlo |
|---|---|---|---|
| 0 | No Exposure → Bases | Solo conocimiento teórico. El curso da programación y herramientas mínimas para poder automatizar. | QA manual listo para empezar a automatizar |
| 1 | Beginner | Automatiza con guía y supervisión. | QA Jr |
| 2 | Intermediate | Trabaja de forma independiente en tareas estándar. | QA Mid |
| 3 | Advanced | Resuelve escenarios complejos y optimiza procesos. | QA Sr |
| 4 | Expert | Lidera, mentorea y define estándares. | Lead / Principal |

> **Interpretación propuesta.** El framework pone la programación básica (variables, bucles,
> funciones) dentro de *Automation Beginner*. En la academia la separamos en el **Nivel 0**
> para que el Nivel 1 se dedique a Playwright desde el primer día. Si prefieres juntarlos,
> el Nivel 0 se convierte en un módulo inicial del Nivel 1.

## 2. Áreas

El framework evalúa cuatro áreas. La academia gira alrededor de **Automatización**, y las
otras tres se enseñan como módulos de apoyo dentro de cada nivel.

| Área | Rol en la academia |
|---|---|
| Automatización (UI) | Eje principal |
| REST API Testing | Eje secundario, también con Playwright (`request`) |
| Git / Control de versiones | Módulo de apoyo |
| Testing manual / QE | Fundamento transversal (diseño de pruebas, estrategia) |

## 3. Matriz por nivel

### Nivel 0. Bases (sin exposición → listo para automatizar)

**Meta:** no ser desarrollador, solo lo necesario para escribir pruebas automatizadas.

| Área | Habilidades | En TypeScript / Playwright | Horas estimadas |
|---|---|---|---|
| Programación | Variables, tipos de datos, condicionales, bucles, funciones, arreglos y objetos, conceptos básicos de OOP (clases, propiedades, métodos) | `let`/`const`, tipos básicos, `if`/`switch`, `for`/`for...of`, funciones y arrow functions, clases, `async`/`await` (introducción) | 40–50 h |
| Entorno | Terminal, Node.js, npm, VS Code, ejecutar un script | `node`, `npm init`, `npx`, `tsc`, extensión de Playwright para VS Code | 5–8 h |
| Git | Repositorio local vs remoto, estructura del repo, comandos básicos | `git clone`, `status`, `add`, `commit`, `push`, `pull` | 10–20 h |
| REST API | Métodos HTTP, request vs response, códigos de estado, headers, query params, body, JSON | Explorar APIs públicas con el navegador o un cliente HTTP, leer JSON | 15–20 h |
| QE manual | STLC, principios de testing, tipos de prueba, caja negra, ciclo de vida del defecto, documentación de pruebas | Escribir casos de prueba que luego se automatizan en el Nivel 1 | Prerrequisito (40–80 h si no lo tiene) |

**Total Nivel 0:** ~70–100 h (sin contar QE manual).

### Nivel 1. Beginner (fundamentos de automatización)

**Meta:** escribir y ejecutar pruebas automatizadas básicas con guía.

| Área | Habilidades | En TypeScript / Playwright | Horas estimadas |
|---|---|---|---|
| Automatización | Entender locators, escribir pruebas básicas, aserciones y validaciones, manejo de esperas, ejecutar scripts | `npm init playwright`, `test()`, `expect()`, `getByRole`/`getByText`/`getByTestId`, CSS y XPath, auto-waiting, web-first assertions, `npx playwright test`, UI mode, reporte HTML, codegen | 60–80 h |
| REST API | Llamadas básicas y validación de status y JSON | `request.get/post`, `expect(response).toBeOK()`, leer `response.json()` | 15–20 h |
| Git | Uso diario seguro en su propia rama | `.gitignore`, commits pequeños, ramas simples | Incluido |
| QE manual | Convertir casos de prueba en pruebas automatizadas | Casos del Nivel 0 → specs de Playwright | Incluido |

**Total Nivel 1:** ~75–100 h.

### Nivel 2. Intermediate (independiente en tareas estándar)

**Meta:** pasar de ejecutar pruebas a diseñarlas y mantenerlas sin supervisión.

| Área | Habilidades | En TypeScript / Playwright | Horas estimadas |
|---|---|---|---|
| Automatización | OOP aplicada, manejo de excepciones, colecciones, leer y refactorizar código, depurar fallas, estrategias sólidas de locators, Page Object Model, sincronización, popups y diálogos | Clases de Page Object, `try/catch`, `Map`/`Set`/arreglos, Trace Viewer, `--debug`, `page.on('dialog')`, iframes, múltiples pestañas, `test.describe`, hooks (`beforeEach`), fixtures básicos | 160–240 h |
| REST API | Usar librerías de REST, aserciones en body, headers y status, pruebas data-driven, parametrización, utilidades reutilizables | `APIRequestContext`, pruebas parametrizadas con arreglos de datos, helpers de API, combinar API + UI (crear datos por API, validar por UI) | 120–160 h |
| Git | Trabajo en equipo: ramas, merge, identificar y resolver conflictos simples | `branch`, `switch`, `merge`, pull requests, resolver conflictos | 10–15 h |
| QE manual | Técnicas de diseño: valores límite, particiones de equivalencia, tablas de decisión, transición de estados, análisis de criterios de aceptación, exploratorio, riesgo básico | Elegir qué automatizar y con qué datos | 120–160 h (en paralelo) |

**Total Nivel 2:** ~290–415 h de automatización y API. Es el nivel más largo, conviene dividirlo en dos bloques (2A UI + POM, 2B API + datos).

### Nivel 3. Advanced (escenarios complejos y frameworks)

**Meta:** ser dueño de la calidad de la automatización a escala y liderar técnicamente dentro del equipo.

| Área | Habilidades | En TypeScript / Playwright | Horas estimadas |
|---|---|---|---|
| Automatización | Diseñar estrategias de automatización, medir su efectividad, clean code en pruebas, OOP avanzada y diseño modular, frameworks, CI/CD, múltiples ambientes | Fixtures personalizados, `playwright.config.ts` con `projects` y ambientes, `.env`, paralelismo y sharding, retries y manejo de flakiness, tagging, GitHub Actions, reportes, pruebas visuales | 300+ h |
| REST API | Estrategia de cobertura de API, request builders y validadores propios, APIs asíncronas, mocking y virtualización, pruebas en pipelines | Validación de esquemas (p. ej. Zod/AJV), `page.route()` para mocks, polling con `expect.poll`, autenticación reutilizable (`storageState`) | 200+ h |
| Git | Ramas de release y hotfix, ramas de vida larga vs corta, conflictos complejos, estrategias de rollback | `rebase`, `cherry-pick`, `revert`, squash | 15–20 h |
| QE manual | Definir estrategias de prueba, evaluar y mitigar riesgos, influir en decisiones de calidad | Pirámide de pruebas, qué va en UI vs API vs unit | 200+ h (experiencia) |

**Total Nivel 3:** 500+ h, gran parte con experiencia en proyecto real.

### Nivel 4. Expert (estrategia y arquitectura)

**Meta:** definir y escalar la ingeniería de calidad a nivel organización o plataforma.

| Área | Habilidades | En TypeScript / Playwright | Horas estimadas |
|---|---|---|---|
| Automatización | Influir en el diseño del sistema para que sea testeable, detectar riesgos sistémicos temprano, colaborar con arquitectos y plataforma, diseñar plataformas internas de automatización, resolver escalabilidad | Framework compartido como paquete npm, plantillas, métricas y dashboards, quality gates, automatización en sistemas legacy | Basado en experiencia |
| REST API | Estándares empresariales de pruebas de API, alinear con el negocio, evaluar herramientas, medir calidad y efectividad, performance y seguridad | Contract testing, introducción a performance (p. ej. k6) y seguridad de APIs | Basado en experiencia |
| Git | Estándares de Git entre equipos, gobierno de repos y permisos, políticas de PR, revisión y aprobación | Branch protection, CODEOWNERS, plantillas de PR, convenciones de commits | Basado en experiencia |
| QE manual | Estándares de calidad entre equipos, selección de herramientas, alinear calidad con objetivos del negocio, prevenir defectos desde el diseño, colaborar con arquitectos y SRE | Alineado con los objetivos del TCoE | Basado en experiencia |

El Nivel 4 funciona mejor como **programa de mentoría y proyectos** que como curso: talleres,
revisiones de arquitectura y la construcción de los activos compartidos del TCoE
(framework, plantillas, métricas).

## 4. Resumen de horas

| Nivel | Horas (automatización + API + Git) | Duración sugerida a 6 h/semana |
|---|---|---|
| 0 | 70–100 h | 3–4 meses |
| 1 | 75–100 h | 3–4 meses |
| 2 | 290–415 h | 12–16 meses (dividido en 2A y 2B) |
| 3 | 500+ h | Programa continuo con proyecto real |
| 4 | Experiencia | Mentoría |

Las horas vienen del framework e incluyen práctica en proyecto real. En la academia, las
sesiones en vivo cubren una parte pequeña. El resto son labs y trabajo aplicado. El paso 2
(temario detallado) va a fijar las horas de cada módulo.

## 5. Relación con el TCoE

La academia cubre los **Training Services** del charter del TCoE (learning paths, workshops,
certificaciones, coaching) y ayuda a la meta de capacidad del año 1: 80 % de ingenieros
capacitados y 50 % certificados en el framework. Los Niveles 3 y 4 forman a los
*Automation Consultants* y *Quality Champions* que el charter deja como TBD.

## 6. Puntos a revisar

Encontré estas diferencias entre los documentos. Conviene decidirlas antes del paso 2.

1. **Git y horas.** El framework solo da horas para Git Beginner (10–20 h). Las de los otros niveles son una propuesta mía.
2. **Preguntas de API nivel C.** HATEOAS, vulnerabilidades y distributed tracing no aparecen en las habilidades de API Advanced del framework. Propongo agregar "seguridad básica de APIs" y "observabilidad" al Nivel 3, o mover esas preguntas al nivel D.
3. **Preguntas de Git nivel B.** Merge vs rebase y force push son temas que la matriz pone en Nivel 3 (rebase) y Nivel 2 (merge). Propongo dejar rebase en Nivel 3 y cambiar esa pregunta B.
4. **Data-driven vs keyword-driven.** Está en las preguntas B de automatización, pero no en las habilidades del framework. La matriz la cubre en el Nivel 2 (parametrización).
5. **Performance y seguridad.** El framework los pone en API Expert. Si los quieres como ruta propia, sería una especialización aparte.
