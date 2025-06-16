import { Ingrediente } from "@/models/Ingrediente";
import { Receta } from "@/models/Receta";
import { RecetaCopaLeche } from "@/models/RecetaCopaLeche";
import { UnidadMasa } from "@/utils/enums/unidad-masa";
import { UnidadVolumen } from "@/utils/enums/unidad-volumen";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RecetaCopaLecheState {
    recetaOriginal: Receta | null;
    recetaPorciones: Receta | null;
    porciones: number;
    unidadVolumen: UnidadVolumen;
    unidadMasa: UnidadMasa;
}

const initialState: RecetaCopaLecheState = {
    recetaOriginal: null,
    recetaPorciones: null,
    porciones: 1,
    unidadVolumen: UnidadVolumen.CENTIMETROS_CUBICOS,
    unidadMasa: UnidadMasa.GRAMOS
}

const recetaCopaLecheSlice = createSlice({
    name: 'recetaCopaLeche',
    initialState,
    reducers: {
      setRecetaCopaLecheOriginal: ( state, action: PayloadAction<Receta | null> ) => {
          state.recetaOriginal = action.payload;
      },
      setRecetaCopaLechePorciones: ( state, action: PayloadAction<Receta | null> ) => {
          state.recetaPorciones = action.payload;
      },
      increment: ( state ) => {
          state.porciones += 1 ;
      },
      decrement: ( state ) => {
          if( state.porciones === 1 ) 
              return;
          state.porciones -= 1;
      },
      setPorciones: ( state, action: PayloadAction<number> ) => {
          state.porciones = action.payload;
      },
      setUnidadVolumen: ( state, action: PayloadAction<UnidadVolumen> ) => {
          state.unidadVolumen = action.payload;
      },
      setUnidadMasa: ( state, action: PayloadAction<UnidadMasa> ) => {
          state.unidadMasa = action.payload;
      }
    }
  });
  
  export const { setRecetaCopaLecheOriginal, setRecetaCopaLechePorciones, increment, decrement, setPorciones, setUnidadVolumen, setUnidadMasa } = recetaCopaLecheSlice.actions;
  
  export default recetaCopaLecheSlice.reducer;