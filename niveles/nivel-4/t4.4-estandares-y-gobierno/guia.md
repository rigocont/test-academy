# T4.4 Estándares y gobierno

## Objetivo

Definir estándares de automatización y de API que los equipos sigan porque les ayudan, y
reforzarlos con herramientas (branch protection, CODEOWNERS, linters) en lugar de revisiones manuales.

## Exposición (30 min)

- **Un estándar bueno es corto, justificado y verificable por una máquina.** "Las pruebas no usan
  `waitForTimeout`" se verifica con ESLint (`playwright/no-wait-for-timeout`); "las pruebas son legibles" no.
- **Capas de gobierno en GitHub:**

| Herramienta | Para qué |
|---|---|
| Branch protection / rulesets | PR obligatorio, checks requeridos, sin push directo a `main` |
| `CODEOWNERS` | El TCoE revisa cambios en `framework/` o en la config de CI |
| Plantilla de PR | Checklist: ¿agregaste pruebas? ¿corriste `--repeat-each`? |
| Linters (`eslint-plugin-playwright`) | Estándares de código verificados en el CI |
| Permisos por equipo | Quién puede cambiar secrets y workflows |

- **Estándares de API para pruebas:** contrato publicado (OpenAPI), errores con forma `{ error }`, ids de
  correlación, paginación consistente, códigos de estado correctos (201, 204, 409).
- **Trazabilidad:** cada prueba enlaza a un requisito o riesgo (`test('...', { tag: '@pagos', annotation: { type: 'issue', description: 'JIRA-123' } })`).
- **Excepciones:** todo estándar tiene un proceso para pedir una excepción, con fecha de vencimiento.

```text
# .github/CODEOWNERS
/framework/          @org/tcoe-automation
/playwright.config.ts @org/tcoe-automation
/.github/workflows/  @org/tcoe-automation @org/devops
```

## Caso en grupo (60 min)

Cada participante trae 3 problemas que vio en PRs de pruebas el último mes. En grupo, decidan cuáles
se resuelven con un estándar, cuáles con herramienta y cuáles con capacitación.

## Plantilla del entregable: propuesta de estándares para el TCoE

```markdown
# Estándar de automatización v<versión>
**Autor:** ... · **Aprobado por:** Automation Governance Board · **Fecha:** ...

## Alcance
Repos y equipos a los que aplica.

## Reglas
| # | Regla | Por qué | Cómo se verifica (linter, check, CODEOWNERS, revisión) | Nivel (obligatorio / recomendado) |
|---|---|---|---|---|

## Configuración de repositorio requerida
Branch protection, checks requeridos, CODEOWNERS, plantilla de PR.

## Proceso de excepción
Cómo se pide, quién aprueba, vencimiento.

## Plan de adopción
Qué repos primero, cómo se mide el cumplimiento.

## Historial de cambios
| Versión | Cambio | Fecha |
|---|---|---|
```

**Criterio de "Competent":** al menos 3 reglas están verificadas automáticamente en un repo real.
