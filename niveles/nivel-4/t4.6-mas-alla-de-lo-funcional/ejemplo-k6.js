// T4.6 Prueba de carga con k6 contra la tienda de práctica.
// Requiere k6 (https://grafana.com/docs/k6/latest/set-up/install-k6/). No corre con Playwright.
//   npm run app            (en otra terminal)
//   k6 run niveles/nivel-4/t4.6-mas-alla-de-lo-funcional/ejemplo-k6.js
//   k6 run -e BASE_URL=http://localhost:3100 ...   para otro puerto

import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const options = {
  scenarios: {
    carga: {
      executor: 'ramping-vus',
      stages: [
        { duration: '10s', target: 10 }, // sube a 10 usuarios virtuales
        { duration: '20s', target: 10 }, // se mantiene
        { duration: '5s', target: 0 }, // baja
      ],
    },
  },
  // Si un umbral no se cumple, k6 termina con código de error (sirve como quality gate en el CI).
  thresholds: {
    http_req_failed: ['rate<0.01'], // menos de 1 % de errores
    'http_req_duration{ruta:pedidos}': ['p(95)<300'], // p95 de pedidos bajo 300 ms
    'http_req_duration{ruta:productos}': ['p(95)<300'], // productos tiene 600 ms de retraso: este FALLA a propósito
  },
};

// Corre una vez antes de la carga: obtiene un token para todos los usuarios virtuales.
export function setup() {
  const respuesta = http.post(`${BASE_URL}/api/login`, JSON.stringify({ usuario: 'estandar', contrasena: 'secreto123' }), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(respuesta, { 'login 200': (r) => r.status === 200 });
  return { token: respuesta.json('token') };
}

export default function ({ token }) {
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const productos = http.get(`${BASE_URL}/api/productos`, { tags: { ruta: 'productos' } });
  check(productos, { 'productos 200': (r) => r.status === 200 });

  const pedidos = http.get(`${BASE_URL}/api/pedidos?porPagina=5`, { headers, tags: { ruta: 'pedidos' } });
  check(pedidos, { 'pedidos 200': (r) => r.status === 200 });

  sleep(1); // tiempo de "pensar" del usuario
}
