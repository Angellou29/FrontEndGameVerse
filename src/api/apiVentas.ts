export async function verificarCompra(usuarioId: number, juegoId: number) {
  const res = await fetch(`http://localhost:3001/api/ventas/verificar-compra/${usuarioId}/${juegoId}`);
  const data = await res.json();
  return data.comprado;
}