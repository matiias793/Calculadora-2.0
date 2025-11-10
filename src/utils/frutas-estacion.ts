export type Mes =
  | 'Enero' | 'Febrero' | 'Marzo' | 'Abril' | 'Mayo' | 'Junio'
  | 'Julio' | 'Agosto' | 'Septiembre' | 'Octubre' | 'Noviembre' | 'Diciembre';

export const frutasPorMes: Record<Mes, string[]> = {
  Enero: ['Durazno', 'Ciruela', 'Sandía', 'Melón', 'Higo', 'Uva', 'Frutilla'],
  Febrero: ['Durazno', 'Melón', 'Sandía', 'Higo', 'Uva', 'Frutilla'],
  Marzo: ['Manzana', 'Pera', 'Uva', 'Higo', 'Durazno'],
  Abril: ['Manzana', 'Pera', 'Mandarina'],
  Mayo: ['Mandarina', 'Naranja', 'Manzana'],
  Junio: ['Mandarina', 'Naranja', 'Pomelo', 'Manzana'],
  Julio: ['Mandarina', 'Naranja', 'Pomelo', 'Manzana'],
  Agosto: ['Naranja', 'Pomelo', 'Manzana', 'Pera'],
  Septiembre: ['Manzana', 'Pera', 'Frutilla'],
  Octubre: ['Frutilla', 'Naranja', 'Durazno'],
  Noviembre: ['Frutilla', 'Durazno', 'Ciruela', 'Melón'],
  Diciembre: ['Durazno', 'Ciruela', 'Sandía', 'Melón', 'Frutilla', 'Higo'],
};

export const obtenerMesActual = (): Mes => {
  const meses: Mes[] = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const idx = new Date().getMonth();
  return meses[idx];
};

export const getFrutasDeEstacion = (mes: Mes, fallback: string[] = []): string[] => {
  const frutas = frutasPorMes[mes] || [];
  return frutas.length > 0 ? frutas : fallback;
};


