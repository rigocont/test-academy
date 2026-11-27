# Nivel 0. Bases

**Para quién:** QA manual que no programa o que nunca ha usado Git ni una terminal.
**Meta:** tener la programación y las herramientas mínimas para empezar a automatizar. No es un curso de desarrollo.
**Horas guiadas:** 80 h (~14 semanas a 6 h/semana).
**Prerrequisito:** fundamentos de QA manual (STLC, tipos de prueba, casos de prueba, reporte de defectos). Si no los tiene, toma primero el módulo M0.0.

## Módulos

| # | Módulo | Temas | En vivo | Lab | Horas |
|---|---|---|---|---|---|
| M0.0 | Fundamentos de QA (opcional) | STLC, principios de testing, tipos de prueba, caja negra, ciclo de vida del defecto, caso vs escenario, buen reporte de bug | Repaso con ejemplos reales | Escribir 10 casos de prueba para una app de práctica | Fuera de las 80 h |
| M0.1 | Entorno de trabajo | Terminal básica, Node.js, npm, VS Code y extensiones, ejecutar un archivo `.ts` | Instalación guiada | Dejar el entorno listo y correr "hola mundo" | 6 h |
| M0.2 | Git para el día a día | Repo local vs remoto, `clone`, `status`, `add`, `commit`, `push`, `pull`, primera pull request | Demo del flujo completo | Hacer fork, clonar y entregar el primer PR | 10 h |
| M0.3 | Variables y tipos | `let`, `const`, `string`, `number`, `boolean`, `null`/`undefined`, inferencia de tipos, template strings | Por qué TypeScript avisa errores antes de correr | Ejercicios con pruebas que validan la respuesta | 8 h |
| M0.4 | Decisiones y ciclos | `if`/`else`, `switch`, operadores de comparación y lógicos, `for`, `for...of`, `while` | Casos de QA: validar rangos, recorrer listas | Ejercicios de valores límite y listas de datos | 10 h |
| M0.5 | Funciones | Parámetros, retorno, tipos en funciones, arrow functions, alcance, funciones puras | "Una prueba es una función" | Escribir funciones de validación reutilizables | 10 h |
| M0.6 | Arreglos y objetos | Arreglos, `map`, `filter`, `find`, objetos, interfaces y `type` | Datos de prueba como objetos | Transformar datos de prueba en JSON | 10 h |
| M0.7 | Clases básicas | Clase, propiedades, métodos, constructor, `this` | La base del Page Object del Nivel 2 | Modelar un "usuario" y un "carrito" | 8 h |
| M0.8 | Asincronía (introducción) | Qué es una promesa, `async`/`await`, por qué el navegador es asíncrono | Lo mínimo para entender Playwright | Leer y corregir código con `await` faltante | 6 h |
| M0.9 | HTTP y APIs sin código | Métodos HTTP, request y response, códigos de estado, headers, query params, body, JSON | Explorar una API pública en el navegador y en un cliente HTTP | Documentar 5 endpoints con su request y response | 12 h |

## Proyecto final

**"Validador de datos de prueba":** un pequeño programa en TypeScript que lee un archivo JSON
de usuarios, valida reglas (correo, edad en rango, campos obligatorios) y muestra un
reporte en consola. Se entrega como pull request con al menos 3 commits.

## Criterios de salida

La persona puede, sin ayuda:

- Escribir y ejecutar un archivo TypeScript con funciones, ciclos y condicionales.
- Explicar qué hace `await` y cuándo hace falta.
- Clonar un repo, crear un commit y abrir un pull request.
- Leer una respuesta JSON de una API y decir qué código de estado esperaba.
- Responder las preguntas A de Git y de API del examen de ubicación como "Competent".
