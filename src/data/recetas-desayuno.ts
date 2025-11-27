export interface Ingrediente {
    name: string;
    quantity: number | string;
    unit: string;
}

export interface Receta {
    title: string;
    ingredients: Ingrediente[];
    procedimiento?: string[];
}

export const recetasDesayuno: Record<string, Receta> = {
    'copa-leche': {
        title: 'Copa de Leche',
        ingredients: [
            { name: 'Leche en polvo', quantity: 20, unit: 'g' },
            { name: 'Agua', quantity: 180, unit: 'ml' },
            { name: 'Azúcar', quantity: 10, unit: 'g' },
            { name: 'Cacao (opcional)', quantity: 5, unit: 'g' }
        ],
        procedimiento: [
            'Usar agua previamente hervida y entibiada para evitar la contaminación microbiológica del producto final.',
            'Preparar la cantidad ajustada al promedio de comensales.',
            'Si por algún motivo sobra leche preparada del desayuno, puede refrigerarse en jarras y ofrecer en la merienda pero nunca guardar para el día siguiente.'
        ]
    },
    'faina-queso': {
        title: 'Fainá de Queso',
        ingredients: [
            { name: 'Harina de garbanzos', quantity: 30, unit: 'g' },
            { name: 'Harina de trigo', quantity: 10, unit: 'g' },
            { name: 'Queso rallado', quantity: 10, unit: 'g' },
            { name: 'Aceite', quantity: 5, unit: 'ml' },
            { name: 'Agua', quantity: 80, unit: 'ml' },
            { name: 'Sal', quantity: 0.5, unit: 'g' }
        ],
        procedimiento: [
            'Mezclar las harinas con la sal y el queso rallado.',
            'Agregar el agua y el aceite, batiendo para evitar grumos.',
            'Dejar reposar la mezcla 20 minutos.',
            'Hornear en asadera aceitada hasta que esté dorado.'
        ]
    },
    'pan-dulce': {
        title: 'Pan con Dulce',
        ingredients: [
            { name: 'Pan flauta', quantity: 50, unit: 'g' },
            { name: 'Dulce de membrillo', quantity: 20, unit: 'g' }
        ],
        procedimiento: [
            'Cortar el pan en rebanadas.',
            'Untar o colocar el dulce de membrillo.'
        ]
    },
    'bizcochuelo': {
        title: 'Bizcochuelo Casero',
        ingredients: [
            { name: 'Harina', quantity: 40, unit: 'g' },
            { name: 'Azúcar', quantity: 20, unit: 'g' },
            { name: 'Huevo', quantity: 15, unit: 'g' },
            { name: 'Aceite', quantity: 5, unit: 'ml' },
            { name: 'Leche', quantity: 10, unit: 'ml' },
            { name: 'Polvo de hornear', quantity: 1, unit: 'g' },
            { name: 'Vainilla', quantity: 0.5, unit: 'ml' }
        ],
        procedimiento: [
            'Batir los huevos con el azúcar hasta punto letra.',
            'Agregar los líquidos y la vainilla.',
            'Incorporar los secos tamizados con movimientos envolventes.',
            'Hornear a temperatura media por 30-40 minutos.'
        ]
    },
    'galletas-avena': {
        title: 'Galletas de Avena',
        ingredients: [
            { name: 'Avena', quantity: 30, unit: 'g' },
            { name: 'Harina', quantity: 20, unit: 'g' },
            { name: 'Azúcar', quantity: 15, unit: 'g' },
            { name: 'Aceite', quantity: 10, unit: 'ml' },
            { name: 'Huevo', quantity: 10, unit: 'g' },
            { name: 'Coco rallado (opcional)', quantity: 5, unit: 'g' }
        ],
        procedimiento: [
            'Mezclar todos los ingredientes hasta formar una masa.',
            'Formar bolitas y aplastarlas en asadera aceitada.',
            'Hornear hasta que estén doradas.'
        ]
    }
};
