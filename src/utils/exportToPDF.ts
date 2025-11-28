import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { convertirFluidaAPolvo } from '@/utils/conversion-leche';

export function exportRecetaToPDF(
  titulo: string,
  porciones: { chica: number, mediana: number, grande: number },
  ingredientes: { name: string, quantity: number | string, unit: string }[],
  variantes?: { name: string, quantity: number | string, unit: string }[],
  usarLechePolvo: boolean = false
) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(titulo, 14, 20);

  doc.setFontSize(12);
  doc.text(`Porciones chicas: ${porciones.chica}`, 14, 30);
  doc.text(`Porciones medianas: ${porciones.mediana}`, 14, 36);
  doc.text(`Porciones grandes: ${porciones.grande}`, 14, 42);

  autoTable(doc, {
    startY: 50,
    head: [['Ingrediente', 'Cantidad', 'Unidad']],
    body: ingredientes.flatMap(i => {
      const nombreNorm = i.name.toLowerCase();
      if (usarLechePolvo && (nombreNorm === 'leche' || nombreNorm === 'leche fluida') && typeof i.quantity === 'number') {
        const { gramosPolvo, mlAgua } = convertirFluidaAPolvo(i.quantity);
        return [
          ['Leche en Polvo', gramosPolvo.toLocaleString('es-ES', { maximumFractionDigits: 2 }), 'g'],
          ['Agua (para leche en polvo)', mlAgua.toLocaleString('es-ES', { maximumFractionDigits: 2 }), 'ml']
        ];
      }
      return [[
        i.name,
        typeof i.quantity === 'number'
          ? i.quantity.toLocaleString('es-ES', { maximumFractionDigits: 2 })
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
          ? v.quantity.toLocaleString('es-ES', { maximumFractionDigits: 2 })
          : v.quantity,
        v.unit
      ]),
    });
  }

  doc.save(`${titulo}.pdf`);
}
