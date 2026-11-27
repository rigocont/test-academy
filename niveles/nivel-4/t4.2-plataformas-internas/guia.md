# T4.2 Plataformas internas de automatización

## Objetivo

Convertir lo que funciona en un equipo en un activo que otros equipos adopten sin copiar y pegar:
paquetes, plantillas y versionado.

## Exposición (30 min)

- **Qué se comparte y qué no:** se comparte lo genérico (login, clientes de API base, reporters, utilidades
  de datos, configuración de CI). No se comparten los page objects de un producto.
- **Formas de compartir:**

| Forma | Cuándo | Costo de mantener |
|---|---|---|
| Plantilla de repo (`create-<algo>` o repo template) | Arrancar proyectos nuevos | Bajo: se copia una vez |
| Paquete npm interno (`@tcoe/playwright-base`) | Código que debe actualizarse en todos | Medio: versionado y releases |
| Workflow reutilizable de GitHub Actions (`workflow_call`) | Pipelines iguales en varios repos | Bajo |
| Documentación y guías | Prácticas, no código | Bajo |

- **Versionado semántico:** `MAYOR.MENOR.PARCHE`. Un cambio que rompe a los usuarios sube MAYOR y trae guía de migración.
- **Adopción:** un activo sin usuarios es un costo. Empieza con un equipo piloto, mide, y luego ofrece.
- **Ejemplo de paquete:**

```text
@tcoe/playwright-base/
├── src/fixtures.ts        test extendido con usuario, token y cliente de API
├── src/ClienteApi.ts      clase base (como la del Nivel 2)
├── src/reporters/         reporter de métricas (M3.9)
├── src/config.ts          defineConfigBase({ ambientes }) con cargarAmbiente (M3.2)
├── CHANGELOG.md
└── package.json           "peerDependencies": { "@playwright/test": "^1.50.0" }
```

## Caso en grupo (60 min)

Compara los frameworks de 2 o 3 equipos de los participantes. ¿Qué tienen en común? ¿Qué se podría
extraer a un paquete? ¿Qué no?

## Plantilla del entregable: diseño de un activo compartido

```markdown
# Activo compartido: <nombre>
**Autor:** ... · **Equipos piloto:** ... · **Fecha:** ...

## Problema
Qué se repite hoy entre equipos y cuánto cuesta (horas, inconsistencias, bugs).

## Propuesta
Forma (paquete, plantilla, workflow reutilizable) y por qué esa.

## Alcance de la versión 1.0
Incluye: ...   No incluye: ...

## API pública
Qué importan los usuarios. Ejemplo de uso en 10 líneas.

## Versionado y releases
Quién publica, cada cuánto, cómo se anuncian cambios que rompen.

## Plan de adopción
| Fase | Equipos | Métrica de éxito | Fecha |
|---|---|---|---|

## Dueños y soporte
Quién lo mantiene, dónde se piden cambios, tiempo de respuesta.
```

**Criterio de "Competent":** un equipo piloto lo usa en su CI.
