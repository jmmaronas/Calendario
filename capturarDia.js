const diasContainer = document.querySelector("#dias")
const diasReservados={
    id:1,
    reservas:[]
}

diasContainer.addEventListener("click", (e) => {
    let diaNuermo=Number(e.target.textContent)
    const diaSeleccionado= new Date()
    diaSeleccionado.setFullYear(currentYear, monthNumber, diaNuermo)
    console.log(diaSeleccionado)
    let ubicacion=primerDia() + diaNuermo -1
    let numeroDia=document.querySelectorAll(".nuemroDia")
    numeroDia[ubicacion].classList.add("bg-blue-900")
    almacenarDia(diaSeleccionado)
    renderMeses(monthNumber)
})

function almacenarDia(fecha){
    const diasReservadosStorage=JSON.parse(localStorage.getItem("diaSeleccionado"))||diasReservados
    const dia=fecha.getDate()
    const mes=fecha.getMonth()
    const anio=fecha.getFullYear()
    console.log(dia, mes, anio)
    diasReservadosStorage.reservas.push({
        id:1,
        dia:fecha,
        paciente:"juan"
    })    
    localStorage.setItem("diaSeleccionado", JSON.stringify(diasReservadosStorage))
}