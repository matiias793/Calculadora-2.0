import { Procedimiento } from '@/models/Procedimiento';
import { Receta } from '@/models/Receta';
import { UnidadMasa } from '@/utils/enums/unidad-masa';
import { UnidadVolumen } from '@/utils/enums/unidad-volumen';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PorcionesTipo {
  chica: number;
  mediana: number;
  grande: number;
}

interface RecetaState {
  recetaOriginal: Receta | null;
  recetaPorciones: Receta | null;
  procedimiento: Procedimiento | null;
  porciones: number;
  unidadVolumen: UnidadVolumen;
  unidadMasa: UnidadMasa;
  porcionesTipo: PorcionesTipo;
}

const initialState: RecetaState = {
  recetaOriginal: null,
  recetaPorciones: null,
  procedimiento: null,
  porciones: 1,
  unidadVolumen: UnidadVolumen.CENTIMETROS_CUBICOS,
  unidadMasa: UnidadMasa.GRAMOS,
  porcionesTipo: { chica: 0, mediana: 1, grande: 0 }
};

const recetaSlice = createSlice({
  name: 'receta',
  initialState,
  reducers: {
    setRecetaOriginal: (state, action: PayloadAction<Receta | null>) => {
      state.recetaOriginal = action.payload;
    },
    setRecetaPorciones: (state, action: PayloadAction<Receta | null>) => {
      state.recetaPorciones = action.payload;
    },
    setProcedimiento: (state, action: PayloadAction<Procedimiento | null>) => {
      state.procedimiento = action.payload;
    },
    increment: (state, action: PayloadAction<number>) => {
      state.porciones += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      if (state.porciones > action.payload) {
        state.porciones -= action.payload;
      }
    },
    setPorciones: (state, action: PayloadAction<number>) => {
      state.porciones = action.payload;
    },
    setPorcionesTipo: (state, action: PayloadAction<PorcionesTipo>) => {
      state.porcionesTipo = action.payload;
    },
    setUnidadVolumen: (state, action: PayloadAction<UnidadVolumen>) => {
      state.unidadVolumen = action.payload;
    },
    setUnidadMasa: (state, action: PayloadAction<UnidadMasa>) => {
      state.unidadMasa = action.payload;
    }
  }
});

export const {
  setPorciones,
  setRecetaPorciones,
  setRecetaOriginal,
  setProcedimiento,
  increment,
  decrement,
  setPorcionesTipo,
  setUnidadVolumen,
  setUnidadMasa
} = recetaSlice.actions;

export default recetaSlice.reducer;
