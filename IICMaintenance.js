//IIC Page
///////////////////////////////
// const currCBGInit = document.querySelector("#currCBGInit")
const prevCBGMaint = document.querySelector("#prevCBGMaint")
const currCBGMaint = document.querySelector("#currCBGMaint")
const currRateMaint = document.querySelector(".currRateH")
// const initButton =  document.querySelector(".initbutton")
const maintButton = document.querySelector(".maintbutton")
// const initbResult =  document.querySelector(".initbResult")
// const initrResult =  document.querySelector(".initrResult")
const resultsElement = document.querySelector(".resultsIIC")
// let initBolus = 0
// let initRate = 0

function roundHalf(num) {
    return Math.round(num * 2) / 2;
}

function calculateDelta() {
    let currentRateMaint = currRateMaint.value
    if (currentRateMaint < 3) {

        return 0.5

    } else if (currentRateMaint < 6.5) {

        return 1

    } else if (currentRateMaint < 10) {

        return 1.5

    } else if (currentRateMaint < 15) {

        return 2

    } else if (currentRateMaint < 20) {

        return 3

    } else {

        return 4

    }

}

// function initiationEvent(){
//     let x = roundHalf(currCBGInit.value/100)
//     if(!currCBGInit.value){
//         currCBGInit.style.borderColor = "red"
//         initbResult.textContent = ""
//         initrResult.textContent = ""

//     }else{
//         currCBGInit.style.borderColor = ""
//     }

//     if(currCBGInit.value<180){
//         initbResult.textContent = "NA"
//         initrResult.textContent = "NA"

//     }else if(currCBGInit.value<300){
//         initrResult.textContent = x
//         initbResult.textContent = "NA"

//     }else{
//         initrResult.textContent = x
//         initbResult.textContent = x

//     }

// } 

function maintetnanceEvent() {
    const delta = roundHalf(calculateDelta())
    const currCBG = currCBGMaint.value
    const prevCBG = prevCBGMaint.value
    const currRate = currRateMaint.value
    let x = 0
    if (!prevCBGMaint.value) {
        prevCBGMaint.style.borderColor = "red"
        x = 1
    } else {
        prevCBGMaint.style.borderColor = ""
    }
    if (!currCBGMaint.value) {
        currCBGMaint.style.borderColor = "red"
        x = 1
    } else {
        currCBGMaint.style.borderColor = ""
    }

    const warning = document.querySelector(".OyEIQ")
    if (!currRateMaint.value || currRateMaint.value < 1 || currRateMaint.value > 20) {
        currRateMaint.style.borderColor = "red"
        x = 1
        if (currRateMaint.value > 20) {
            warning.style.display = "flex"
        }
    } else {
        currRateMaint.style.borderColor = ""
        warning.style.display = "none"
    }
    if (x == 1) {
        resultsElement.textContent = ""
        return
    }

    let differenceCBG = currCBG - prevCBG
    let y = 0
    if (currCBG < 100) {
        resultsElement.textContent = "DC insulin and give 100 mL D10, recheck every 15 minutes, when CBG > 100 mg%, wait for 1 hour and resume insulin by " + 0.5*currRateMaint.value + " m/hr"

    } else
        if (currCBG >= 100 && currCBG <= 139) {
            if (differenceCBG > 0) {
                resultsElement.textContent = "No Change"

            } else if (differenceCBG <= 0 && differenceCBG >= -20) {
                y = (Number(currRate) - delta)

                resultsElement.textContent = "Decrease rate to " + (y) + " ml/hr"

            } else {
                resultsElement.textContent = "DC insulin -> CBG/30 min -> when CBG > 140 mg/dL -> restart at rate =  " + (roundHalf(0.50 * currRate)) + " ml/hr"

            }

        } else if (currCBG == 140) {
            if (differenceCBG > 40) {
                y = (Number(currRate) + delta)
                if(y<=20){
                    resultsElement.textContent = "Increase rate to " + y + " ml/hr"
                }else{
                    resultsElement.textContent = "New rate is greater than 20 ml/hr, please contact relevant physician"

                }
            } else if (differenceCBG >= -20) {
                resultsElement.textContent = "No Change"


            } else if (differenceCBG >= -40) {
                y = (Number(currRate) - delta)
                resultsElement.textContent = "Decrease rate to " + y + " ml/hr"


            } else {
                y = (Number(currRate) - 2 * delta)
                resultsElement.textContent = "Hold infusion for 30 minutes then decrease rate to " + y + " ml/hr"


            }

        } else if (currCBG <= 200) {

            if (differenceCBG > 60) {
                y = (Number(currRate) + 2 * delta)
                if(y<=20){
                    resultsElement.textContent = "Increase rate to " + y + " ml/hr"
                }else{
                    resultsElement.textContent = "New rate is greater than 20 ml/hr, please contact relevant physician"

                }

            } else if (differenceCBG >= 0) {
                y = (Number(currRate) + delta)
                if(y<=20){
                    resultsElement.textContent = "Increase rate to " + y + " ml/hr"
                }else{
                    resultsElement.textContent = "New rate is greater than 20 ml/hr, please contact relevant physician"

                }


            } else if (differenceCBG >= -40) {
                resultsElement.textContent = "No Change"


            } else if (differenceCBG >= -60) {
                y = (Number(currRate) - delta)
                resultsElement.textContent = "Decrease rate to " + y + " ml/hr"


            } else {
                y = (Number(currRate) - delta)
                resultsElement.textContent = "Hold infusion for 30 minutes then decrease rate to " + y + " ml/hr"


            }

        } else {
            if (differenceCBG > 0) {
                y = (Number(currRate) + 2 * delta)
                if(y<=20){
                    resultsElement.textContent = "Increase rate to " + y + " ml/hr"
                }else{
                    resultsElement.textContent = "New rate is greater than 20 ml/hr, please contact relevant physician"

                }

            } else if (differenceCBG >= -20) {
                y = (Number(currRate) + delta)
                if(y<=20){
                    resultsElement.textContent = "Increase rate to " + y + " ml/hr"
                }else{
                    resultsElement.textContent = "New rate is greater than 20 ml/hr, please contact relevant physician"

                }


            } else if (differenceCBG >= -60) {
                resultsElement.textContent = "No Change"


            } else if (differenceCBG >= -80) {
                y = (Number(currRate) - delta)
                resultsElement.textContent = "Decrease rate to " + y + " ml/hr"


            } else {
                y = (Number(currRate) - 2 * delta)
                resultsElement.textContent = "Hold infusion for 30 minutes then decrease rate to " + y + " ml/hr"


            }

        }


}


// initButton.addEventListener("click" , initiationEvent)
maintButton.addEventListener("click", maintetnanceEvent)
