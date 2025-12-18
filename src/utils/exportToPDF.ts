import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { convertirFluidaAPolvo } from '@/utils/conversion-leche';
import { UnidadMasa } from '@/utils/enums/unidad-masa';
import { UnidadVolumen } from '@/utils/enums/unidad-volumen';

export function exportRecetaToPDF(
  titulo: string,
  porciones: { chica: number, mediana: number, grande: number },
  ingredientes: { name: string, quantity: number | string, unit: string }[],
  variantes: { name: string, quantity: number | string, unit: string }[] | undefined,
  usarLechePolvo: boolean = false,
  unidadMasa: UnidadMasa = UnidadMasa.GRAMOS,
  unidadVolumen: UnidadVolumen = UnidadVolumen.CENTIMETROS_CUBICOS
) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(titulo, 14, 20);

  doc.setFontSize(12);
  doc.text(`Porciones chicas: ${porciones.chica}`, 14, 30);
  doc.text(`Porciones medianas: ${porciones.mediana}`, 14, 36);
  doc.text(`Porciones grandes: ${porciones.grande}`, 14, 42);

  const formatWithPrecision = (num: number) => {
    if (num === 0) return '0';
    return num.toLocaleString('es-UY', { maximumFractionDigits: 4, minimumFractionDigits: 0 });
  };

  autoTable(doc, {
    startY: 50,
    head: [['Ingrediente', 'Cantidad', 'Unidad']],
    body: ingredientes.flatMap(i => {
      const nombreNorm = i.name.toLowerCase();

      // LOGICA DE LECHE EN POLVO
      if (usarLechePolvo && (nombreNorm === 'leche' || nombreNorm === 'leche fluida')) {
        const cantidadNumerica = typeof i.quantity === 'number' ? i.quantity : parseFloat(i.quantity as string) || 0;
        const esLitros = ['l', 'litro', 'litros'].includes(i.unit.toLowerCase());
        const cantidadEnMlInput = esLitros ? cantidadNumerica * 1000 : cantidadNumerica;

        const { gramosPolvo, mlAgua } = convertirFluidaAPolvo(cantidadEnMlInput);

        // Agua output
        const aguaMostrar = esLitros ? mlAgua / 1000 : mlAgua;
        const unidadAgua = esLitros ? 'l' : 'ml';

        // Polvo output
        let polvoMostrar = gramosPolvo;
        let unidadPolvo = 'g';
        if (unidadMasa === UnidadMasa.KILOGRAMOS) {
          polvoMostrar = gramosPolvo / 1000;
          unidadPolvo = 'kg';
        }

        return [
          ['Leche en Polvo', formatWithPrecision(polvoMostrar), unidadPolvo],
          ['Agua (para leche en polvo)', formatWithPrecision(aguaMostrar), unidadAgua]
        ];
      }

      return [[
        i.name,
        typeof i.quantity === 'number'
          ? formatWithPrecision(i.quantity)
          : i.quantity,
        i.unit
      ]];
    }),
  });

  // Añadir variantes si existen
  if (variantes && variantes.length > 0) {
    const lastY = (doc as any).lastAutoTable.finalY || 60; // fallback por si falla
    autoTable(doc, {
      startY: lastY + 10,
      head: [['Variante', 'Cantidad', 'Unidad']],
      body: variantes.map(v => [
        v.name,
        typeof v.quantity === 'number'
          ? formatWithPrecision(v.quantity)
          : v.quantity,
        v.unit
      ]),
    });
  }

  doc.save(`${titulo}.pdf`);
}
