import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000",

        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');
            if (token) {
              headers.set('x-access-token', token)
            }
            return headers
          }

    }),
    tagTypes: ["Users"],
    endpoints: (buider) => ({
        // traer usuarios ⬇⬇
        getUser: buider.query({
            query: () => "user",
        }),

        // traer a los estudiantes que fueron matriculados por la secretaria ⬇⬇
        getEstudiantes: buider.query({
            query: () => 'estudiantes'
        }),

        // traer a todos los docentes
        getDocentes: buider.query({
            query: () => 'docentes'
        }),

        // traore estudiantes que se postularon a matricula los ultimos 7 dias ⬇⬇
        getEstudiantesDeLosUltimosSieteDias: buider.query({
            query: () => 'fechaRegistro',
            providesTags: ["Usuarios"]
        }),

        // traer todos los salones
        getSalones: buider.query({
            query: () => 'salones',
            providesTags: ['Salones']
        }),

        // matricular estudiantes ⬇⬇
        putMatricular: buider.mutation({
            query: ({ id, texto }) => ({
                url: 'matriculado',
                method: 'PUT',
                body: { id, texto }
            }),
            invalidatesTags: ["Usuarios"]
        }),

        // rechazar la matricula
        deleteMatricula: buider.mutation({
            query: ({ id, texto }) => ({
                url: 'rechazar',
                method: 'DELETE',
                body: { id, texto }
            }),
            invalidatesTags: ["Usuarios"]
        }),

        // crear salones y asignarles un dorictor de grupo
        createSalon: buider.mutation({
            query: ({ nombre, descripcion, id }) => ({
                url: 'crearSalon',
                method: 'POST',
                body: { nombre, descripcion, id }
            }),
            invalidatesTags: ['Salones']
        })

    })
});

export const { 
    useGetUserQuery, 
    useGetEstudiantesQuery, 
    useGetEstudiantesDeLosUltimosSieteDiasQuery, 
    usePutMatricularMutation, 
    useDeleteMatriculaMutation, 
    useGetDocentesQuery, 
    useCreateSalonMutation,
    useGetSalonesQuery
} = apiSlice