# Examen de ubicación

El examen usa las preguntas A a D de `assesment.docx` para decidir en qué nivel de la
academia entra cada persona. No es un examen para subir de nivel: solo ubica.

Las preguntas se dejan en su idioma original (inglés), como están en el documento fuente.

## 1. Cómo se relacionan las letras con los niveles

| Letra | Nivel que demuestra | Rol |
|---|---|---|
| Ninguna aprobada | 0. No Exposure | Entra a Nivel 0 |
| A | 1. Beginner | Jr |
| B | 2. Intermediate | Mid |
| C | 3. Advanced | Sr |
| D | 4. Expert | Lead / Principal |

## 2. Cómo se califica

Cada respuesta se califica con la escala que ya trae el documento:

- **Basic:** conoce el concepto pero no lo puede aplicar o explicar con un ejemplo.
- **Competent:** lo explica bien y da un ejemplo real o práctico.
- **Advanced:** además de explicarlo, compara alternativas, menciona riesgos o cuenta cuándo no aplica.

**Regla por área.** Una persona tiene un nivel en un área cuando responde al menos
**2 de 3 preguntas como Competent o mejor** en esa letra **y** en todas las letras anteriores.
El evaluador avanza de A a D y se detiene en la primera letra que no se aprueba.

**Puntaje total.** Se suman los niveles de las cuatro áreas (0 a 4 cada una, 0 a 16 en total)
y se usa la tabla del framework:

| Puntaje total | Clasificación |
|---|---|
| 0–4 | Junior |
| 5–9 | Mid-level |
| 10–13 | Senior |
| 14–16 | Lead / Principal |

## 3. Cómo se decide el nivel de entrada

1. **El área de Automatización decide el nivel de entrada.** La persona entra al nivel
   siguiente al que demostró, como muestra la tabla de abajo.
2. **Las otras áreas generan refuerzos.** Si API, Git o QE manual quedan por debajo del
   nivel de entrada, la persona toma los módulos de esas áreas de los niveles anteriores
   como labs de refuerzo, sin repetir el nivel completo.
3. **Un "Advanced" en las tres preguntas de una letra** permite saltar al siguiente nivel si
   el instructor lo confirma con un lab práctico corto.

| Nivel demostrado en Automatización | Nivel de entrada |
|---|---|
| 0 (no aprobó A) | Nivel 0 si no programa. Nivel 1 si ya programa en algún lenguaje. |
| 1 (aprobó A) | Nivel 2 |
| 2 (aprobó B) | Nivel 3 |
| 3 (aprobó C) | Nivel 4 |
| 4 (aprobó D) | Mentor o instructor de la academia |

> La pregunta "¿ya programa en algún lenguaje?" separa Nivel 0 de Nivel 1 porque las
> preguntas A de automatización no evalúan programación a fondo.

## 4. Preguntas por área y nivel

### Automatización

| Letra / Nivel | Pregunta | Tema en la matriz |
|---|---|---|
| A / 1 | What is a function and why is it useful in automation? | Nivel 0: funciones |
| A / 1 | How do you locate elements on a webpage (ID, XPath, CSS selector)? | Nivel 1: locators |
| A / 1 | How do you wait for elements to load before interacting? | Nivel 1: esperas |
| B / 2 | What is Page Object Model (POM)? | Nivel 2: POM |
| B / 2 | What is the difference between data-driven and keyword-driven frameworks? | Nivel 2: parametrización |
| B / 2 | How do you handle asynchronous behavior in UI automation? | Nivel 2: sincronización |
| C / 3 | How do you design your framework to support multiple environments and configurations? | Nivel 3: múltiples ambientes |
| C / 3 | Explain function overriding | Nivel 3: OOP avanzada |
| C / 3 | How do you prevent over-testing or redundant test coverage? | Nivel 3: estrategia de automatización |
| D / 4 | How do you align automation strategy with business goals and delivery timelines? | Nivel 4: alinear con el negocio |
| D / 4 | What metrics do you use for reporting automation effectiveness? | Nivel 3–4: medir efectividad |
| D / 4 | How do you introduce automation into a legacy system with poor testability? | Nivel 4: testabilidad del sistema |

### REST API

| Letra / Nivel | Pregunta | Tema en la matriz |
|---|---|---|
| A / 1 | What are the most common HTTP methods used in REST APIs? | Nivel 0: métodos HTTP |
| A / 1 | What does a GET request do? | Nivel 0: métodos HTTP |
| A / 1 | What is a status code? Can you name some common ones? | Nivel 0: códigos de estado |
| B / 2 | What does it mean for an HTTP method to be idempotent? | Nivel 2 |
| B / 2 | What are headers, and why are they important in API requests? | Nivel 0–2: headers |
| B / 2 | How do you validate an API response beyond just checking status codes? | Nivel 2: aserciones en body y headers |
| C / 3 | What is HATEOAS, and when is it practically useful? | No está en el framework (ver punto 2 de la matriz) |
| C / 3 | What are common API vulnerabilities? | Nivel 4 en el framework (seguridad) |
| C / 3 | What is distributed tracing, and why is it critical in modern APIs? | No está en el framework |
| D / 4 | How do you design a comprehensive API test strategy for a new product? | Nivel 3–4: estrategia de cobertura |
| D / 4 | How do you manage test data for API testing in shared environments? | Nivel 3: datos de prueba |
| D / 4 | How do you test APIs that depend on multiple downstream services? | Nivel 3: mocking y virtualización |

### Git

| Letra / Nivel | Pregunta | Tema en la matriz |
|---|---|---|
| A / 1 | What is a branch in Git, and why is it used? | Nivel 0–2: ramas |
| A / 1 | What is the purpose of git clone? | Nivel 0: comandos básicos |
| A / 1 | What does git status show? | Nivel 0: comandos básicos |
| B / 2 | What is the difference between merge and rebase? | Nivel 2 (merge) y 3 (rebase) |
| B / 2 | What happens if you try to git push and your branch is behind the remote? | Nivel 2: trabajo en equipo |
| B / 2 | What is a force push (git push --force)? | Nivel 2–3 |
| C / 3 | What is the Git index? | Nivel 3 |
| C / 3 | Explain interactive rebase | Nivel 3: rebase |
| C / 3 | What are cherry-picking and squashing? | Nivel 3: cherry-pick, squash |
| D / 4 | How do you design and enforce pull request (PR) standards? | Nivel 4: políticas de PR |
| D / 4 | What policies do you implement to ensure high-quality commits and traceability? | Nivel 4: estándares de Git |
| D / 4 | How do you manage access control and permissions in Git repositories? | Nivel 4: gobierno y permisos |

### QE manual

| Letra / Nivel | Pregunta | Tema en la matriz |
|---|---|---|
| A / 1 | What is the difference between a test case and a test scenario? | Nivel 0: documentación de pruebas |
| A / 1 | What information should a good bug report include? | Nivel 0: ciclo de vida del defecto |
| A / 1 | What types of testing have you heard of, and when would you use them? | Nivel 0: tipos de prueba |
| B / 2 | Explain the difference between severity and priority, with an example. | Nivel 2 |
| B / 2 | How do you ensure your test coverage is sufficient for a feature? | Nivel 2: técnicas de diseño |
| B / 2 | Describe a situation where you missed a bug. | Nivel 2: exploratorio y riesgo |
| C / 3 | How do you determine whether a defect is caused by frontend, backend, or environment issues? | Nivel 3 |
| C / 3 | A production defect wasn't caught in QA. How do you perform root cause analysis? | Nivel 3: riesgo y mitigación |
| C / 3 | You found an intermittent bug that cannot be consistently reproduced. How do you proceed? | Nivel 3 |
| D / 4 | How do you handle situations where business pushes for release despite known defects? | Nivel 4: alinear calidad con el negocio |
| D / 4 | What strategies do you use to reduce friction between QA, Dev, and Product teams? | Nivel 4: influencia |
| D / 4 | How do you handle intermittent production bugs with limited data? | Nivel 4 |

## 5. Hoja de resultado (plantilla)

| Área | A | B | C | D | Nivel del área |
|---|---|---|---|---|---|
| Automatización | | | | | |
| REST API | | | | | |
| Git | | | | | |
| QE manual | | | | | |
| **Total (0–16)** | | | | | |

- **Clasificación:** Junior / Mid / Senior / Lead
- **¿Ya programa?:** Sí / No
- **Nivel de entrada:**
- **Refuerzos asignados:**
