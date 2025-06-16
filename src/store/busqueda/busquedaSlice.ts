import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BusquedaState {
    search: string;
}

const initialState: BusquedaState = {
    search: ''
}

const busquedaSlice = createSlice({
  name: 'busqueda',
  initialState,
  reducers: {
    setBusqueda: ( state, action: PayloadAction<string> ) => {
        state.search = action.payload;
    }
  }
});

export const { setBusqueda } = busquedaSlice.actions;

export default busquedaSlice.reducer;