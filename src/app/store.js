import { configureStore } from "@reduxjs/toolkit";
import usuariosReducer from '../components/feacture/Usuarios'
import { apiSlice } from "../api/apiSlice";

export const store = configureStore({
    reducer: {
        users: usuariosReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})