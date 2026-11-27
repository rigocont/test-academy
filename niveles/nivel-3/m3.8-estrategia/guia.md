# M3.8 Estrategia de automatización (18 h)

## Objetivo

Decidir qué se automatiza, en qué capa y en qué orden, con base en riesgo, y defenderlo por
escrito ante tu equipo.

## Sesión en vivo (2.5 h, discutir la estrategia de un producto real)

| Tiempo | Tema |
|---|---|
| 25 min | Pirámide (y trofeo) de pruebas: costo, velocidad y confianza por capa |
| 30 min | Qué va en unit, API, componente y UI. Ejemplos de la tienda |
| 30 min | Priorizar por riesgo: impacto × probabilidad |
| 20 min | Pruebas redundantes: cómo encontrarlas y cuándo borrar |
| 45 min | En grupo: estrategia de un producto real de uno de los alumnos |

## Conceptos clave

```text
        UI E2E        pocas, lentas: solo flujos críticos de punta a punta
      ───────────
     API / servicio   la mayoría de las reglas de negocio
   ─────────────────
  unit / componente   rápidas, las escriben los devs; QA revisa qué cubren
```

- **Una regla, una capa.** "El cp debe tener 5 dígitos" se prueba en API con todas sus variantes
  (data-driven) y en UI solo una vez, para confirmar que el error se muestra.
- **Riesgo = impacto × probabilidad.** El pago (impacto 5) que cambió este sprint (probabilidad 4) va antes
  que el pie de página (1 × 1).
- **Prueba redundante:** dos pruebas que fallarían siempre juntas por la misma causa. Quédate con la más barata.
- **Lo que NO se automatiza:** pruebas exploratorias, usabilidad, flujos que cambian cada semana, cosas que
  se prueban una sola vez.
- **La estrategia es un documento vivo**: se revisa cada trimestre con las métricas de M3.9.

## Lab (5 h + 11 h de práctica)

1. En grupo, clasifica los flujos de la tienda de práctica (login, productos, carrito, checkout, pedidos,
   reportes) con la matriz de riesgo y decide la capa de cada prueba.
2. **Entregable:** la estrategia de automatización de TU equipo con la [plantilla](plantilla-estrategia.md).
   Máximo 4 páginas. Se revisa en la sesión siguiente con otro alumno como "stakeholder".

## Preguntas de repaso

1. ¿Por qué una suite con 80 % de pruebas de UI es frágil aunque todas pasen?
2. Tu PM pide "automatizar todo". ¿Qué le respondes?
3. ¿Cómo detectas que dos pruebas son redundantes?
