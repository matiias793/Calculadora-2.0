import { Ingrediente } from "./Ingrediente";
import { IngredientesCopaLeche } from "./IngredientesCopaLecha";

export interface RecetaCopaLeche {
    title: string;
    ingredients: Ingrediente[];
    procedimiento?: string[];
}