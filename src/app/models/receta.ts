import { Ingrediente } from "./ingrediente";

export interface Receta {
    title: string;
    ingredients: Ingrediente[];
    variants?: Ingrediente[];
}