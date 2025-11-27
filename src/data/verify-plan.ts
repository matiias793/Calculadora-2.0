
import { PLANIFICACION_VERANO } from './planificacion-verano';

console.log('Total dias:', PLANIFICACION_VERANO.length);
if (PLANIFICACION_VERANO.length > 0) {
    console.log('Primer dia:', PLANIFICACION_VERANO[0]);
    console.log('Ultimo dia:', PLANIFICACION_VERANO[PLANIFICACION_VERANO.length - 1]);
}
PLANIFICACION_VERANO.forEach(p => console.log(p.fecha));
