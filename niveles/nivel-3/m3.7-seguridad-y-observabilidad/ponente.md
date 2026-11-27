# Notas del ponente: M3.7 Seguridad y observabilidad de APIs

## Antes de la clase

- Arranca la tienda con `LOG_PETICIONES=1 npm run app` para mostrar los ids en el log.
- Prepara el reto: una copia de `pedidos.html` sin `escapar()` para mostrar el XSS en acción (no la subas).

## Guion de la sesión

1. **OWASP API Top 10 desde las pruebas (30 min).** Recorre la tabla de la guía. Para cada riesgo, pregunta qué prueba concreta escribirían en su API.
2. **Matriz de autorización (20 min).** Arma `RUTAS_PROTEGIDAS` y genera con un `for` las pruebas sin token y con token inválido. Cuando alguien agrega una ruta, la agrega a la lista y obtiene sus pruebas.
3. **XSS (15 min).** Crea un pedido con un cliente `<img src=x onerror=...>`. En la página sin escapar, el script corre; con `escapar()`, se ve como texto. Valida las dos cosas en la prueba.
4. **Observabilidad (25 min).** Manda `X-Request-Id` desde la prueba y búscalo en el log del servidor. Explica distributed tracing: el mismo id viaja por todos los servicios. Cierra con "un 200 que está mal": datos de otro usuario o un total mal calculado.

## Errores comunes

- Probar solo "sin token" y no "token inválido" o "de otro usuario".
- Validar que el XSS "no se ve" en lugar de validar que el script no corrió.
- Prometer que estas pruebas reemplazan una auditoría de seguridad.

## Respuestas de referencia

1. Porque 403 confirma que el recurso existe; 404 no le da información a quien está probando ids ajenos.
2. Autenticación: quién eres. Autorización: qué puedes hacer.
3. Busca el id en los logs de los servicios o en la herramienta de tracing para ver qué servicio falló y con qué error.
4. Pentesting, escaneo dinámico profundo, revisión de dependencias y de infraestructura: le tocan al equipo de seguridad. QA ayuda a integrarlos al pipeline.

## Cierre

Reto: quitar `escapar()` localmente, ver la prueba fallar y regresar el cambio.
