// M3.11 Prepara un repositorio de práctica con un historial realista.
// Uso:  node niveles/nivel-3/m3.11-git-avanzado/preparar-practica.mjs
// Crea la carpeta en el directorio temporal del sistema e imprime la ruta. No toca este repo.

import { mkdtempSync, writeFileSync, appendFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const dir = mkdtempSync(join(tmpdir(), 'practica-git-'));
const git = (...args) => execFileSync('git', args, { cwd: dir, stdio: 'pipe' }).toString().trim();
const escribir = (archivo, texto) => writeFileSync(join(dir, archivo), texto);
const agregar = (archivo, texto) => appendFileSync(join(dir, archivo), texto);
const commit = (mensaje) => {
  git('add', '-A');
  git('commit', '-q', '-m', mensaje);
};

git('init', '-q', '-b', 'main');
git('config', 'user.name', 'Alumno QA');
git('config', 'user.email', 'alumno@ejemplo.com');

escribir('login.spec.ts', "test('login válido', async () => {});\n");
commit('Agrega prueba de login');
escribir('carrito.spec.ts', "test('agregar producto', async () => {});\n");
commit('Agrega prueba de carrito');
git('tag', 'v1.0');

// Rama de release con un hotfix.
git('switch', '-q', '-c', 'release/1.0');
agregar('login.spec.ts', "test('usuario bloqueado', async () => {});\n");
commit('Hotfix: prueba de usuario bloqueado');

// Rama de feature con commits desordenados para squash / interactive rebase.
git('switch', '-q', 'main');
git('switch', '-q', '-c', 'feature/checkout');
escribir('checkout.spec.ts', "test('checkout', async () => {});\n");
commit('wip');
agregar('checkout.spec.ts', "test('checkout sin cp', async () => {});\n");
commit('wip 2');
agregar('checkout.spec.ts', '// TODO quitar console.log\n');
commit('arreglo typo');

// main avanza mientras tanto, incluido un commit que rompe la suite.
git('switch', '-q', 'main');
agregar('carrito.spec.ts', "test('vaciar carrito', async () => {});\n");
commit('Agrega prueba de vaciar carrito');
escribir('playwright.config.ts', 'export default { retries: 5, timeout: 1000 };\n');
commit('Cambia configuración (rompe la suite en el CI)');

console.log(`Repositorio de práctica listo en:\n  ${dir}\n`);
console.log(git('log', '--oneline', '--graph', '--all', '--decorate'));
