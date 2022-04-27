import { profecionales } from "./agendaMedica.js"
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septimbre", "Octubre", "Noviembre", "Diciembre"]

document.querySelector("#profecional").innerHTML=profecionales[0].nombre
let currentDate = new Date()
export let [currentDay, monthNumber, currentYear] = [currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()]


const diasContainer = document.querySelector("#dias")
const mesContainer = document.querySelector("#mes")
const anioContainer = document.querySelector("#anio")

const mesPrevio = document.querySelector("#mesPrevio")
const mesSiguiente = document.querySelector("#mesSiguiente")

mesContainer.innerHTML = meses[monthNumber]
anioContainer.innerHTML = currentYear.toString()

export function renderMeses(mes) {
    let dato=primerDia()
    const diasReservadosStorage= JSON.parse(localStorage.getItem("diaSeleccionado"))
    dias.innerHTML=""
    for(let i = primerDia(); i>0; i--){
        diasContainer.innerHTML+= `
        <div class="nuemroDia w-full text-center p-2 hover:bg-gray-500 cursor-pointer text-slate-400 border-2 border-slate-500"><span>${totalDias(monthNumber-1)-(i-1)}</span></div>
        `
    }
    for(let i = 1; i<= totalDias(mes); i++){
        const mesAcutal=new Date().getMonth()
        
        if((i===currentDay&&monthNumber==mesAcutal) && (profecionales[0].agenda[(dato++)%7].activo)){
            diasContainer.innerHTML+=`
            <div class="nuemroDia w-full flex flex-center bg-blue-400 border-2 border-slate-500"><span class="m-auto bg-green-500 rounded-full p-1">${i}</span></div>
            `
            continue
        }else if (i===currentDay&&monthNumber==mesAcutal){    
            diasContainer.innerHTML+=`
            <div class="nuemroDia w-full flex flex-center"><span class="m-auto">${i}</span></div>
            `
            continue
        }
        if(profecionales[0].agenda[(dato++)%7].activo){
            diasContainer.innerHTML+=`
            <div class="nuemroDia w-full flex flex-center bg-blue-400 cursor-pointer border-2 border-slate-500 p-2"><span class="m-auto">${i}</span></div>
            `    
            continue
        }
        
        if(diasReservadosStorage && diasReservadosStorage.reservas.some(e=>new Date(e.dia).getDate()==i)){
            diasContainer.innerHTML+=`
                <div class="nuemroDia w-full text-center bg-red-500 cursor-pointer border-2 border-slate-500 p-2"><span class="">${i}</span></div>
                `    
            continue
        }
        diasContainer.innerHTML+=`
        <div class="nuemroDia w-full text-center p-2 hover:bg-gray-500 cursor-pointer border-2 border-slate-500 p-2"><span class="">${i}</span></div>
        `
    }
    let lastDay=new Date(currentYear, monthNumber, totalDias(monthNumber))
    let posicionLastDay=lastDay.getDay()
    let count=1
    for(let i = posicionLastDay; i<6; i++){
        diasContainer.innerHTML+= `
        <div class="nuemroDia w-full text-center p-2 hover:bg-gray-500 cursor-pointer text-slate-400 border-2 border-slate-500">${count++}</div>
        `
    }
    
}

function totalDias(mes) {
    if(mes===-1) mes=11;
    if((mes==0)||(mes==2)||(mes==4)||(mes==6)||(mes==7)||(mes==9)||(mes==11)){
        return 31
    }else if((mes==3)||(mes==5)||(mes==8)||(mes==10)){
        return 30
    }
    else{
        return anioBiciesto() ? 29 : 28
    }
}

function anioBiciesto() {
    return (((currentYear % 100 !== 0) && (currentYear % 4 === 0)) || (currentYear % 400 === 0))
}

export function primerDia() {
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
    mesContainer.innerHTML=meses[monthNumber]
    anioContainer.innerHTML=currentYear.toString()
    renderMeses(monthNumber)
}

mesPrevio.addEventListener("click", ()=>{
    mesPasado()
})

mesSiguiente.addEventListener("click", ()=>{
    mesProximo()
})

renderMeses(monthNumber)