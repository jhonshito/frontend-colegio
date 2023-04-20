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

        // traer estudiantes que se postularon a matricula los ultimos 7 dias ⬇⬇
        getEstudiantesDeLosUltimosSieteDias: buider.query({
            query: () => 'fechaRegistro',
            providesTags: ["Usuarios"]
        }),

        // traer todos los salones
        getSalones: buider.query({
            query: () => 'salones',
            providesTags: ['Salones']
        }),

        // traer a todos los periodos
        getPeriodos: buider.query({
            query: () => 'periodos',
            providesTags: ['Periodos']
        }),

        // traer todas las clases del periodo seleccionado
        getClase: buider.query({
            query: ({ id }) => ({
              url: `clases/${id}`,
              method: 'GET',
            }),
          }),

        // traer todos los años letivos
        getLetivo: buider.query({
            query: () => 'letivosGet',
            providesTags: ['Letivos']
        }),

        // traer a los periodos del año letivo seleccionado
        getPeriodosLetivos: buider.query({
            query: ({ idLetivo }) => `periodosForLetivos/${idLetivo}`
        }),

        crearLetivo: buider.mutation({
            query: ({ nombre, inicio, fin, jornada }) => ({
                url: 'letivo',
                method: 'POST',
                body: { nombre, inicio, fin, jornada }
            }),
            invalidatesTags: ['Letivos']
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
        }),

        createPeriodo: buider.mutation({
            query: ({ nombre, inicio, fin, idLetivo }) => ({
                url: 'agregarPeriodo',
                method: 'POST',
                body: { nombre, inicio, fin, idLetivo }
            }),
            invalidatesTags: ['Periodos', 'Letivos']
        }),

        // crear materia
        createMateria: buider.mutation({
            query: ({ nombre, idLetivo, tipo }) => ({
                url: 'crearMaterias',
                method: 'POST',
                body: { nombre, idLetivo, tipo }
            }),
            invalidatesTags:['materias']
        }),

        // materias creadas
        getMaterias: buider.query({
            query: () => 'materiasCreadas',
            providesTags:['materias']
        }),

        // crear asignatura
        createAsignatura: buider.mutation({
            query: ({ nombre, idLetivo, tipo, materias }) => ({
                url: 'crearAsignaturas',
                method: 'POST',
                body: { nombre, idLetivo, tipo, materias }
            }),
            invalidatesTags: ['asignaturas']
        }),

        // traer todas las asignatura creadas
        getAsignaturas: buider.query({
            query: () => 'asignaturasCreadas',
            providesTags: ['asignaturas']
        }),

        putMateria: buider.mutation({
            query: ({ docenteId, materiaId }) => ({
                url: 'addMateria',
                method: 'PUT',
                body: { docenteId, materiaId }
            })
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
    useGetSalonesQuery,
    useGetPeriodosQuery,
    useCreatePeriodoMutation,
    useGetClaseQuery,
    useGetLetivoQuery,
    useCrearLetivoMutation,
    useGetPeriodosLetivosQuery,
    useCreateMateriaMutation,
    useGetMateriasQuery,
    useCreateAsignaturaMutation,
    useGetAsignaturasQuery,
    usePutMateriaMutation
} = apiSlice