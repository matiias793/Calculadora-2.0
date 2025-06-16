import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportRecetaToPDF(
  titulo: string,
  porciones: { chica: number, mediana: number, grande: number },
  ingredientes: { name: string, quantity: number | string, unit: string }[]
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
    body: ingredientes.map(i => {
      const cantidad =
        typeof i.quantity === 'number'
          ? Number(i.quantity).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
          : i.quantity;

      return [i.name, cantidad, i.unit];
    }),
  });

  doc.save(`${titulo}.pdf`);
}
