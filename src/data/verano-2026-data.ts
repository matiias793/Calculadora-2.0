export interface VeranoMenuDia {
    fecha: Date;
    fechaString: string;
    nombreMenu: string;
    esFeriado?: boolean;
}

// Menús rotativos para asignar
const MENUS_VERANO = [
    "Salpicón de ave con arroz primavera",
    "Milanesa de carne con ensalada mixta",
    "Pastel de carne con puré de calabaza",
    "Pollo al horno con papas doradas",
    "Fideos con tuco y carne picada",
    "Guiso de lentejas (versión verano)",
    "Hamburguesas caseras con tomate y lechuga",
    "Tarta de jamón y queso con ensalada",
    "Arroz con atún y huevo",
    "Carne al jugo con puré de papas"
];

export const generarCalendarioVerano = (): VeranoMenuDia[] => {
    const calendario: VeranoMenuDia[] = [];
    const fechaInicio = new Date(2026, 0, 8); // 8 de Enero 2026 (Mes es 0-indexado)
    const fechaFin = new Date(2026, 1, 5);    // 5 de Febrero 2026

    let fechaActual = new Date(fechaInicio);
    let menuIndex = 0;

    const formatter = new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    while (fechaActual <= fechaFin) {
        const diaSemana = fechaActual.getDay();

        // 0 = Domingo, 6 = Sábado
        // Solo procesar Lunes (1) a Viernes (5)
        if (diaSemana !== 0 && diaSemana !== 6) {
            // Capitalizar primera letra
            const fechaStr = formatter.format(fechaActual);
            const fechaCapitalizada = fechaStr.charAt(0).toUpperCase() + fechaStr.slice(1);

            calendario.push({
                fecha: new Date(fechaActual),
                fechaString: fechaCapitalizada,
                nombreMenu: MENUS_VERANO[menuIndex % MENUS_VERANO.length]
            });

            menuIndex++;
        }

        // Avanzar al siguiente día
        fechaActual.setDate(fechaActual.getDate() + 1);
    }

    return calendario;
};

export const DATOS_VERANO_2026 = generarCalendarioVerano();
