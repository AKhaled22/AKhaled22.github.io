// HIC 
///////////////////////////////
const bodyWeight = document.querySelector(".bWeight")
const height = document.querySelector(".heightt")
const aptt = document.querySelector(".aptt")
const currRateH = document.querySelector(".currRateH")
const calcButt = document.querySelector(".HICbutton")
const gender = document.querySelector("#gender")


function usedBodyWeight(){
    let BMI = bodyWeight.value/(height.value/100)
    let IBW = (gender.value =="M")?(50+(2.3*((height.value/2.5)-60))):(45+(2.3*((height.value/2.5)-60)))
    if(BMI<40){
        return bodyWeight.value

    }else{
        return ((0.4*(bodyWeight.value - IBW))+IBW)
    }
}

function HICpage(){
    const iBoluselem = document.querySelector(".initbResult")
    const irateelem = document.querySelector(".initrResult")
    const result1 = document.querySelectorAll(".results").item(0)
    const result2 = document.querySelectorAll(".results").item(1)



    let x=0
    if(!bodyWeight.value){
        bodyWeight.style.borderColor = "red"
        x=1
    }else{
        bodyWeight.style.borderColor = ""
    }
    if(!height.value){
        height.style.borderColor = "red"
        x=1
    }else{
        height.style.borderColor = ""
    }
    if(!aptt.value){
        aptt.style.borderColor = "red"
        x=1
    }else{
        aptt.style.borderColor = ""

    }
    if(!currRateH.value){
        currRateH.style.borderColor = "red"
        x=1
    }else{
        currRateH.style.borderColor = ""
    }
    if(x==1){
        iBoluselem.textContent=""
        irateelem.textContent=""
        result1.textContent = ""
        result2.textContent = ""
        return;
    }

let usedBW = usedBodyWeight()
let initBolus =Math.round(80 * usedBW / 100)
let initRate = Math.round(18 * usedBW / 100)
iBoluselem.textContent = initBolus
irateelem.textContent = initRate
let extraBolus = 0
let changingRate = 0

if(aptt.value<35){
    extraBolus = 80*usedBW/100
    changingRate = Math.round(4*usedBW/100 + currRateH.value)

}else if(aptt.value<45){
    extraBolus = 40*usedBW/100
    changingRate = Math.round(4*usedBW/100 + currRateH.value)

}else if(aptt.value<70){
    changingRate="No Change"

}else if(aptt.value<90){
    changingRate = Math.round(currRateH.value - 2*usedBW/100)
    
}else{

    changingRate = "Stop infusion for 1 hour then resume by "+Math.round(currRateH.value - 3*usedBW/100)

}
// const body = document.querySelector("#body")
// const frag = document.createDocumentFragment();
result1.textContent = "Extra Bolus = " + Math.round(extraBolus)
result1.classList.add("results")
// frag.appendChild(result1)
result2.textContent = "Changing Rate = " + (changingRate)
result2.classList.add("results")
// frag.appendChild(result2)
// body.appendChild(frag)

}


///////////////////////////////


calcButt.addEventListener("click",HICpage);
///////////////////////////////