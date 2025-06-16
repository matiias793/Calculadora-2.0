import { Opcion } from "./Opcion";
import { Video } from "./Video";

export interface Procedimiento {
    opciones: Opcion[];
    tips?: string[];
    variantes?: string[];
    videos?: Video[];
}