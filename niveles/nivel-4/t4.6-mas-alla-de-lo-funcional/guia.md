# T4.6 Calidad más allá de lo funcional

## Objetivo

Conocer lo suficiente de performance, contract testing y seguridad para decidir qué necesita la
organización, y evaluar herramientas con un método en lugar de por moda.

## Exposición (30 min)

- **Performance con k6:** escenarios en JavaScript, umbrales (*thresholds*) que hacen fallar la corrida si
  el p95 pasa de un límite. Ejemplo listo contra la tienda de práctica: [`ejemplo-k6.js`](ejemplo-k6.js).
  ```bash
  npm run app                       # en otra terminal
  k6 run niveles/nivel-4/t4.6-mas-alla-de-lo-funcional/ejemplo-k6.js
  ```
  Tipos de prueba: *smoke* (1 usuario), *load* (carga esperada), *stress* (hasta romper), *soak* (horas).
- **Contract testing (Pact):** el consumidor publica lo que espera de la API; el proveedor verifica en su CI
  que lo cumple. Atrapa cambios que rompen antes del deploy, sin ambiente compartido. Es el siguiente paso
  después de los esquemas de M3.5.
- **Seguridad:** QA cubre las pruebas de M3.7 en cada PR. El escaneo dinámico (OWASP ZAP), el análisis de
  dependencias (Dependabot, `npm audit`) y el pentest son de seguridad; QA ayuda a integrarlos al pipeline.
- **Accesibilidad:** `@axe-core/playwright` agrega revisiones automáticas a pruebas existentes.

### Método de evaluación de herramientas

1. Escribe el problema antes de ver herramientas.
2. Define criterios con peso **antes** de probar (evita enamorarte de la primera).
3. Prueba de concepto con el **mismo caso real** en cada candidata, con tiempo fijo.
4. Incluye el costo total: licencias, curva de aprendizaje, mantenimiento, salida (¿qué pasa si la dejas?).

## Caso en grupo (60 min)

Corre `ejemplo-k6.js` contra la tienda, interpreta el resultado y cambia el umbral para que falle. Luego
discute: ¿quién en tu organización debería ser dueño de las pruebas de performance?

## Plantilla del entregable: evaluación comparativa de una herramienta

```markdown
# Evaluación: <problema a resolver>
**Autor:** ... · **Fecha:** ... · **Decisión requerida para:** <fecha>

## Problema
Qué no podemos hacer hoy y cuánto cuesta.

## Criterios (definidos antes de probar)
| Criterio | Peso (%) | Cómo se mide |
|---|---|---|

## Candidatas
| Herramienta | Versión | Licencia y costo |
|---|---|---|

## Prueba de concepto
Caso usado, tiempo dedicado por herramienta, repositorio con el código.

## Resultados
| Criterio | Peso | Herramienta A | Herramienta B | Herramienta C |
|---|---|---|---|---|
| **Total ponderado** | 100 % | | | |

## Recomendación
Cuál, por qué, y qué haría cambiar la decisión.

## Plan de adopción y de salida
```

**Criterio de "Competent":** la evaluación llevó a una decisión documentada (adoptar o descartar).
