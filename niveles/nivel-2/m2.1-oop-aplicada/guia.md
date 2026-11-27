# M2.1 OOP aplicada a pruebas (12 h)

## Objetivo

Usar clases abstractas, herencia, sobrescritura y composición para que el código de pruebas sea reutilizable.

## Sesión en vivo (1.5 h)

| Tiempo | Tema |
|---|---|
| 15 min | Por qué las pruebas también necesitan diseño: el costo de mantener código duplicado |
| 25 min | Herencia y clases abstractas: `PaginaBase` del framework |
| 20 min | Sobrescritura (`override`, `super`) |
| 30 min | Composición vs herencia: "es un" vs "tiene un" |

## Conceptos clave

```ts
abstract class PaginaBase {              // no se puede crear con new: es una plantilla
  abstract readonly ruta: string;        // cada hija la DEBE definir
  constructor(protected readonly page: Page) {}
  async abrir() { await this.page.goto(this.ruta); }   // heredado por todas
}

class PaginaLogin extends PaginaBase {   // PaginaLogin ES UNA PaginaBase
  readonly ruta = '/';
}

class ReporteConLentas extends ReporteTexto {
  override formatear(r: Resultado[]) {
    return super.formatear(r) + ' | lentas: ...';  // reutiliza lo del padre y agrega
  }
}

class Ejecucion {                        // Ejecucion TIENE UN Reporte (composición)
  constructor(private readonly reporte: Reporte) {}
}
```

| Modificador | Quién lo ve |
|---|---|
| `public` (por defecto) | Todos |
| `protected` | La clase y sus hijas |
| `private` | Solo la clase |
| `readonly` | Se asigna una vez y no cambia |

**Regla práctica:** usa herencia para relaciones "es un" estables (cada página es una página).
Usa composición para todo lo demás (una página *tiene* un encabezado). En el framework,
`PaginaBase` tiene un `Encabezado`: las páginas no heredan de él.

## Lab (4 h + práctica)

Completa `ejercicio.ts` y corre `npx playwright test m2.1`. Después lee
`framework/paginas/PaginaBase.ts` y `framework/componentes/Encabezado.ts` e identifica
dónde hay herencia y dónde composición.

## Preguntas de repaso

1. ¿Por qué `Reporte` es abstracta?
2. ¿Qué pasa si no llamas `super.formatear()` en la sobrescritura?
3. ¿Por qué `resultados()` devuelve una copia?
4. (Pregunta C del examen) Explica la sobrescritura de funciones.
