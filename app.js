import { profecionales } from "./agendaMedica.js"
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septimbre", "Octubre", "Noviembre", "Diciembre"]


let currentDate = new Date()
let [currentDay, monthNumber, currentYear] = [currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()]


const dias = document.querySelector("#dias")
const mes = document.querySelector("#mes")
const anio = document.querySelector("#anio")

const mesPrevio = document.querySelector("#mesPrevio")
const mesSiguiente = document.querySelector("#mesSiguiente")

mes.innerHTML = meses[monthNumber]
anio.innerHTML = currentYear.toString()

function renderMeses(mes) {
    let dato=primerDia()
    const diasReservadosStorage= JSON.parse(localStorage.getItem("diaSeleccionado"))
    dias.innerHTML=""
    for(let i = primerDia(); i>0; i--){
        dias.innerHTML+= `
        <div class="nuemroDia m-auto p-2 hover:bg-gray-500 cursor-pointer text-slate-400">${totalDias(monthNumber-1)-(i-1)}</div>
        `
    }
    for(let i = 1; i<= totalDias(mes); i++){
        const mesAcutal=new Date().getMonth()
        
        if(profecionales[0].agenda[(dato++)%7].activo){
            dias.innerHTML+=`
            <div class="nuemroDia m-auto bg-blue-500 rounded-full p-2">${i}</div>
            `    
            continue
        }
        
        if(i===currentDay&&monthNumber==mesAcutal){
            dias.innerHTML+=`
            <div class="nuemroDia m-auto bg-green-500 rounded-full p-2">${i}</div>
            `    
            continue
        }
        if(diasReservadosStorage && diasReservadosStorage.reservas.some(e=>new Date(e.dia).getDate()==i)){
            dias.innerHTML+=`
                <div class="nuemroDia m-auto bg-red-500 rounded-full p-2">${i}</div>
                `    
            continue
        }
        dias.innerHTML+=`
        <div class="nuemroDia m-auto p-2 hover:bg-gray-500 cursor-pointer">${i}</div>
        `
            
    }
}

function totalDias(mes) {
    if(mes===-1) mes=11;
    if((mes==0)||(mes==2)||(mes==4)||(mes==6)||(mes==7)||(mes==9)||(mes==11)){
        return 31
    }else if((mes==3)||(mes==5)||(mes==8)||(mes==10))
    return 30
    else{
        return anioBiciesto() ? 29 : 28
    }
}

function anioBiciesto() {
    return ((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0))
}

function primerDia() {
    let start=new Date(currentYear, monthNumber, 1)
    return (start.getDay())
}

function mesPasado() {
    if(monthNumber!==0){
        monthNumber--
    }else{
        monthNumber=11
        currentYear--
    }
    cargarNuevaFecha()
}

function mesProximo() {
    if(monthNumber!==11){
        monthNumber++
    }else{
        monthNumber=0
        currentYear++
    }
    cargarNuevaFecha()
}

function cargarNuevaFecha() {
    currentDate.setFullYear(currentYear, monthNumber, currentDay)
    mes.innerHTML=meses[monthNumber]
    anio.innerHTML=currentYear.toString()
    renderMeses(monthNumber)
}

mesPrevio.addEventListener("click", ()=>{
    mesPasado()
})

mesSiguiente.addEventListener("click", ()=>{
    mesProximo()
})

renderMeses(monthNumber)