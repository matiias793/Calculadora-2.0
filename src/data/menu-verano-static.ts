export const menuVerano = [
    // SEMANA 1
    {
        fecha: "2026-01-08",
        semana: 1,
        copaLeche: "Leche con cocoa, Pan integral con dulce de leche, Fruta.",
        almuerzo: "Pasta con verdusalsa, Ensalada de vegetales, Fruta , Pan , Agua."
    },
    {
        fecha: "2026-01-09",
        semana: 1,
        copaLeche: "Leche con vainilla, Pan de maíz con queso.",
        almuerzo: "Ensalada completa de Atún, Fruta , Pan , Agua."
    },
    // SEMANA 2
    {
        fecha: "2026-01-12",
        semana: 2,
        copaLeche: "Leche con cocoa, Pan con dulce o mermelada.",
        almuerzo: "Hamburguesa de carne, Puré triple, Ensalada de vegetales, Postre de leche, Pan, Agua."
    },
    {
        fecha: "2026-01-13",
        semana: 2,
        copaLeche: "Leche con vainilla, Galletas de avena y pasas, Fruta.",
        almuerzo: "Ensalada completa de pollo, Fruta, Pan, Agua."
    },
    {
        fecha: "2026-01-14",
        semana: 2,
        copaLeche: "Leche con cebada, Pan integral con queso en fetas o de corte.",
        almuerzo: "Cerdo a la portuguesa con papa al natural, Fruta, Pan, Agua."
    },
    {
        fecha: "2026-01-15",
        semana: 2,
        copaLeche: "Leche con cocoa, Pan con dulce de leche.",
        almuerzo: "Pasta sorpresa, Postre de leche, Pan, Agua."
    },
    {
        fecha: "2026-01-16",
        semana: 2,
        copaLeche: "Licuado de leche con frutas o Leche con cocoa, Grisines/Galletas.",
        almuerzo: "Budín de pescado, Arroz con vegetales salteados, Fruta, Pan, Agua."
    },
    // SEMANA 3
    {
        fecha: "2026-01-19",
        semana: 3,
        copaLeche: "Leche con vainilla, Pan con dulce de leche.",
        almuerzo: "Pollo con salsa blanca y vegetales con fideos, Fruta, Pan, Agua."
    },
    {
        fecha: "2026-01-20",
        semana: 3,
        copaLeche: "Leche con cocoa, Scons salados.",
        almuerzo: "Pan de carne con lentejas, Puré de papa, Ensalada de vegetales, Fruta, Pan, Agua."
    },
    {
        fecha: "2026-01-21",
        semana: 3,
        copaLeche: "Leche con cebada, Pan integral con dulce o mermelada, Fruta.",
        almuerzo: "Torta de atún, Ensalada primavera, Fruta, Agua."
    },
    {
        fecha: "2026-01-22",
        semana: 3,
        copaLeche: "Leche con cocoa, Pan de maíz con queso de untar.",
        almuerzo: "Tortilla de papa, pollo y zapallitos, Ensalada de vegetales, Fruta, Pan, Agua."
    },
    {
        fecha: "2026-01-23",
        semana: 3,
        copaLeche: "Licuado de leche con frutas o leche con cocoa, Pan con dulce o mermelada.",
        almuerzo: "Pasta con verdusalsa de cerdo, Postre de leche, Pan, Agua."
    },
    // SEMANA 4
    {
        fecha: "2026-01-26",
        semana: 4,
        copaLeche: "Leche con cocoa, Pan con dulce o mermelada, Fruta.",
        almuerzo: "Cerdo a la portuguesa con papa al natural, Postre de leche, Pan, Agua."
    },
    {
        fecha: "2026-01-27",
        semana: 4,
        copaLeche: "Leche con vainilla, Pan integral con manteca.",
        almuerzo: "Hamburguesa de pescado, Arroz con vegetales salteados, Fruta, Pan, Agua."
    },
    {
        fecha: "2026-01-28",
        semana: 4,
        copaLeche: "Leche con cebada, Pan con queso de untar.",
        almuerzo: "Pasta con verdusalsa de pollo, Fruta, Pan, Agua."
    },
    {
        fecha: "2026-01-29",
        semana: 4,
        copaLeche: "Leche con cocoa, Torta básica de vainilla.",
        almuerzo: "Pastel de carne y papa, Ensalada de vegetales, Postre de leche, Pan, Agua."
    },
    {
        fecha: "2026-01-30",
        semana: 4,
        copaLeche: "Licuado con leche y frutas o Leche con cocoa, Grisines/Galletas.",
        almuerzo: "Ensalada completa de pollo, Fruta, Pan, Agua."
    },
    // SEMANA 5
    {
        fecha: "2026-02-02",
        semana: 5,
        copaLeche: "Leche con cocoa, Pan con queso en fetas o de corte",
        almuerzo: "Pollo colorido con arroz, Postre de leche, Pan, Agua"
    },
    {
        fecha: "2026-02-03",
        semana: 5,
        copaLeche: "Leche con vainilla, Grisines/Galletas",
        almuerzo: "Pan de carne con puré mixto, Fruta, Pan, Agua"
    },
    {
        fecha: "2026-02-04",
        semana: 5,
        copaLeche: "Leche con cebada, Pan de maíz con dulce o mermelada",
        almuerzo: "Pasta sorpresa, Postre de leche, Pan, Agua"
    },
    {
        fecha: "2026-02-05",
        semana: 5,
        copaLeche: "Licuado de leche con frutas o Leche con cocoa, Torta marmolada",
        almuerzo: "Menú Especial"
    }
];

export const getMenuPorFecha = (fechaBuscada: string) => {
    return menuVerano.find(m => m.fecha === fechaBuscada) || null;
};
