// Verifica que las soluciones de referencia pasan todas las pruebas.
// Copia el repo a una carpeta temporal del sistema, pone cada solucion.ts en lugar de su ejercicio.ts
// cada solucion.spec.ts en lugar de su lab.spec.ts y cada X.solucion.ts en lugar de X.ts,
// y corre Playwright ahí.
// Uso: npm run verificar-soluciones  (acepta argumentos extra de Playwright)

import { cpSync, readdirSync, statSync, symlinkSync, copyFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const raiz = resolve(import.meta.dirname, '..');
const destino = mkdtempSync(join(tmpdir(), 'academia-soluciones-'));
const IGNORAR = new Set(['node_modules', '.git', '.tmp-verificacion', 'test-results', 'playwright-report']);


for (const nombre of readdirSync(raiz)) {
  if (IGNORAR.has(nombre)) continue;
  cpSync(join(raiz, nombre), join(destino, nombre), { recursive: true });
}
symlinkSync(join(raiz, 'node_modules'), join(destino, 'node_modules'), 'dir');

let reemplazos = 0;
function recorrer(dir) {
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) {
      recorrer(ruta);
    } else if (nombre === 'solucion.ts') {
      copyFileSync(ruta, join(dir, 'ejercicio.ts'));
      reemplazos++;
    } else if (nombre === 'solucion.spec.ts') {
      copyFileSync(ruta, join(dir, 'lab.spec.ts'));
      reemplazos++;
    } else if (nombre.endsWith('.solucion.ts')) {
      copyFileSync(ruta, join(dir, nombre.replace(/\.solucion\.ts$/, '.ts')));
      reemplazos++;
    }
  }
}
recorrer(join(destino, 'niveles'));
console.log(`Soluciones aplicadas: ${reemplazos}`);

const resultado = spawnSync('npx', ['playwright', 'test', '--reporter=list', ...process.argv.slice(2)], {
  cwd: destino,
  stdio: 'inherit',
  env: { ...process.env, PUERTO: process.env.PUERTO ?? '3100' },
});
console.log(`\nCopia temporal usada: ${destino}`);
process.exit(resultado.status ?? 1);
