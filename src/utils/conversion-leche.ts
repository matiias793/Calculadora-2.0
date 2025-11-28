/**
 * Convierte mililitros de leche fluida a gramos de leche en polvo y mililitros de agua.
 * Fórmula: 1000 ml Leche Fluida = 100 g Leche en Polvo + 900 ml Agua.
 * @param mlLecheFluida Cantidad de leche fluida en mililitros.
 * @returns Objeto con gramos de polvo y ml de agua (redondeados).
 */
export const convertirFluidaAPolvo = (mlLecheFluida: number): { gramosPolvo: number; mlAgua: number } => {
  const gramosPolvo = Math.round(mlLecheFluida * 0.1);
  const mlAgua = Math.round(mlLecheFluida * 0.9);
  return { gramosPolvo, mlAgua };
};
