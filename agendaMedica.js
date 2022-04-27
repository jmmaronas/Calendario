export const profecionales = [
    {
        id: 1,
        nombre: "Juan",
        especialidad: "medico",
        agenda: [
            {
                id: 7,
                dia:"domingo",
                inicio: 8,
                fin: 14,
                activo:false
            },
            {
                id: 1,
                dia:"lunes",
                inicio: 8,
                fin: 14,
                activo:true
            },
            {
                id: 2,
                dia:"martes",
                inicio: 8,
                fin: 14,
                activo:true
            },
            {
                id: 3,
                dia:"miercoles",
                inicio: 8,
                fin: 14,
                activo:true
            },
            {
                id: 4,
                dia:"jueves",
                inicio: 8,
                fin: 14,
                activo:false

            },
            {
                id: 5,
                dia:"viernes",
                inicio: 8,
                fin: 14,
                activo:true
            },
            {
                id: 6,
                dia:"sabado",
                inicio: 8,
                fin: 14,
                activo:false
            }            
        ]
        ,
    },
    {
        id: 1,
        nombre: "Juan",
        especialidad: "medico",
        agenda: {
            lunes: 8 - 14,
            martes: 8 - 14,
            miercoles: null,
            jueves: null,
            viernes: null
        },
    },
]