# Notas del ponente: M3.8 Estrategia de automatización

## Antes de la clase

- Pide a un alumno que traiga un producto real de su trabajo (con permiso) para el ejercicio en grupo.
- Imprime o comparte la plantilla de estrategia.

## Guion de la sesión

1. **Pirámide y trofeo (25 min).** Costo, velocidad y confianza por capa. Muestra una suite "cono de helado" (casi todo UI) y pregunta cuánto tarda y cuánto se rompe.
2. **Qué va en cada capa (30 min).** Con la tienda: "el cp debe tener 5 dígitos" va en API con todas las variantes y una sola vez en UI. "El usuario puede comprar" va en UI de punta a punta.
3. **Priorizar por riesgo (30 min).** Impacto × probabilidad. Llenen juntos la matriz de riesgo de los flujos de la tienda.
4. **Pruebas redundantes (20 min).** Dos pruebas que siempre fallan juntas por la misma causa: quédate con la más barata. Cuándo es sano borrar pruebas.
5. **Estrategia de un producto real (45 min).** El alumno presenta su producto en 5 minutos y el grupo arma la estrategia con la plantilla. Al final, ¿qué NO automatizarían?

## Errores comunes

- Estrategias que solo listan herramientas.
- Metas sin número ("mejorar la cobertura").
- Documentos de 20 páginas que nadie lee. Máximo 4.

## Respuestas de referencia

1. Porque las pruebas de UI son lentas, dependen de muchas piezas y fallan por causas ajenas a lo que prueban; el costo de mantenerlas crece más rápido que su valor.
2. Que automatizar todo cuesta más de lo que ahorra; propón priorizar por riesgo, mostrar el costo de cada capa y medir con métricas acordadas.
3. Si fallan siempre juntas por la misma causa, o si una cubre por completo lo que valida la otra en una capa más barata.

## Cierre

Entregable: la estrategia de su equipo con la plantilla, máximo 4 páginas. Se revisa en la siguiente sesión con otro alumno como stakeholder.
