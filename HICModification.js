// HIC 
///////////////////////////////
const bodyWeight = document.querySelector(".bWeight")
const height = document.querySelector(".heightt")
const aptt = document.querySelector(".aptt")
const currRateH = document.querySelector(".currRateH")
const calcModButt = document.querySelector(".HICModificationbutton")

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






function HICModificationEvent() {
    let extraBolus = 0
    let changingRate = 0
    let usedBW = usedBodyWeight()
    const result1 = document.querySelectorAll(".resultsHIC").item(0)
    const result2 = document.querySelectorAll(".resultsHIC").item(1)
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
    if (!aptt.value) {
        aptt.style.borderColor = "red"
        x = 1
    } else {
        aptt.style.borderColor = ""

    }
    const warning = document.querySelector(".OyEIQ")

    if (!currRateH.value || currRateH.value<0.5 || currRateH.value>20) {
        currRateH.style.borderColor = "red"
        x = 1
        if(currRateH.value>20){
            warning.style.display = "flex"
        }
    } else {
        currRateH.style.borderColor = ""
        warning.style.display = "none"
    }
    if (x == 1) {

        result1.textContent = ""
        result2.textContent = ""
        return;
    }
    if (aptt.value < 35) {
        extraBolus = 80 * usedBW / 100
        changingRate = Math.round(4 * Number(usedBW) / 100 + Number(currRateH.value))

    } else if (aptt.value < 46) {
        extraBolus = 40 * usedBW / 100
        changingRate = Math.round(2 * Number(usedBW) / 100 + Number(currRateH.value))

    } else if (aptt.value < 71) {
        changingRate = "No Change"

    } else if (aptt.value < 91) {
        changingRate = Math.round(Number(currRateH.value) - 2 * Number(usedBW) / 100)

    } else {

        changingRate = "Stop infusion for 1 hour then resume by " + Math.round(Number(currRateH.value) - 3 * Number(usedBW) / 100)

    }

    result1.textContent = "Extra Bolus = " + Math.round(extraBolus)
    result1.classList.add("resultsHIC")
    result2.textContent = "Changing Rate = " + (changingRate)
    result2.classList.add("resultsHIC")

}


///////////////////////////////
calcModButt.addEventListener("click", HICModificationEvent)

///////////////////////////////
