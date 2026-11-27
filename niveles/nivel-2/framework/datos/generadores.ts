import type { NuevoPedido } from '../clientes/tipos';

// Generadores de datos de prueba. Ya están completos.
//
// Regla del Nivel 2: las pruebas que corren en paralelo contra el mismo servidor
// NUNCA modifican datos que otras pruebas usan. Cada prueba crea los suyos con un
// nombre único y busca solo por ese nombre.

let contador = 0;

/** Un nombre de cliente que no se repite entre pruebas ni entre ejecuciones. */
export function clienteUnico(prefijo = 'Cliente QA'): string {
  contador++;
  const sufijo = `${Date.now().toString(36)}${process.pid.toString(36)}${contador}`;
  return `${prefijo} ${sufijo}`.slice(0, 50);
}

/** Un pedido válido. Cambia solo lo que necesites con `cambios`. */
export function nuevoPedido(cambios: Partial<NuevoPedido> = {}): NuevoPedido {
  return {
    cliente: clienteUnico(),
    cp: '06600',
    productos: [{ id: 4, cantidad: 2 }], // 2 tazas térmicas = $498
    ...cambios,
  };
}
