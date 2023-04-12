import { createSlice } from "@reduxjs/toolkit";

const usuariosSlice = createSlice({
    name: 'users',
    initialState: {
        estudiantes: [],
    },
    reducers: {
        usuarios: (state, action) => {
            state.estudiantes = action.payload
            // console.log(action.payload)
        }
    }
});

export const { usuarios } = usuariosSlice.actions

export default usuariosSlice.reducer