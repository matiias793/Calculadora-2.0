import { Ingrediente } from "./Ingrediente";

export interface Receta {
    title: string;
    ingredients: Ingrediente[];
    variants?: Ingrediente[];
}