// HIC 
///////////////////////////////
const bodyWeight = document.querySelector(".bWeight")
const height = document.querySelector(".heightt")
// const aptt = document.querySelector(".aptt")
// const currRateH = document.querySelector(".currRateH")
const calcInitButt = document.querySelector(".HICInitializationbutton")

const gender = document.querySelector("#gender")



function usedBodyWeight() {
    let BMI = bodyWeight.value / (Math.pow(height.value/100,2))
    let IBW = (gender.value == "M") ? (50 + (2.3 * ((height.value / 2.5) - 60))) : (45 + (2.3 * ((height.value / 2.5) - 60)))
    if (BMI < 40) {
        return bodyWeight.value

    } else {
        return ((0.4 * (bodyWeight.value - IBW)) + IBW)
    }
}



function HICInitializationEvent() {
    const iBoluselem = document.querySelector(".initbResult")
    const irateelem = document.querySelector(".initrResult")
    let usedBW = usedBodyWeight()
    let x = 0
    if (!bodyWeight.value) {
        bodyWeight.style.borderColor = "red"
        x = 1
    } else {
        bodyWeight.style.borderColor = ""
    }
    if (!height.value) {
        height.style.borderColor = "red"
        x = 1
    } else {
        height.style.borderColor = ""
    }
    
    const warning = document.querySelector(".OyEIQ")


    if (x == 1) {
        iBoluselem.textContent = ""
        irateelem.textContent = ""

        return;
    }


    let initBolus = Math.round(80 * usedBW / 100)
    let initRate = Math.round(18 * usedBW / 100)
    iBoluselem.textContent = initBolus
    irateelem.textContent = initRate
}




///////////////////////////////
calcInitButt.addEventListener("click", HICInitializationEvent)

///////////////////////////////
