//IIC Page
///////////////////////////////
const currCBGInit = document.querySelector("#currCBGInit")
const prevCBGMaint =  document.querySelector("#prevCBGMaint")
const currCBGMaint =  document.querySelector("#currCBGMaint")
const currRateMaint =  document.querySelector("#currRateMaint")
const initButton =  document.querySelector(".initbutton")
const maintButton =  document.querySelector(".maintbutton")
const initbResult =  document.querySelector(".initbResult")
const initrResult =  document.querySelector(".initrResult")
const resultsElement = document.querySelector(".results")
let initBolus = 0
let initRate = 0

function roundHalf(num) {
    return Math.round(num*2)/2;
}

function calculateDelta(){
    let currentRateMaint = currRateMaint.value
    if(currentRateMaint<3){

        return 0.5

    } else if(currentRateMaint<6.5){

        return 1

    }else if(currentRateMaint<10){

        return 1.5

    }else if(currentRateMaint<15){

        return 2

    }else if(currentRateMaint<20){

        return 3

    }else{

        return 4

    }

}

function initiationEvent(){
    let x = roundHalf(currCBGInit.value/100)
    if(!currCBGInit.value){
        currCBGInit.style.borderColor = "red"
        initbResult.textContent = ""
        initrResult.textContent = ""

    }else{
        currCBGInit.style.borderColor = ""
    }

    if(currCBGInit.value<180){
        initbResult.textContent = "NA"
        initrResult.textContent = "NA"

    }else if(currCBGInit.value<300){
        initrResult.textContent = x
        initbResult.textContent = "NA"
        
    }else{
        initrResult.textContent = x
        initbResult.textContent = x

    }

} 

function maintetnanceEvent(){
    const delta = roundHalf(calculateDelta())
    const currCBG = currCBGMaint.value
    const prevCBG = prevCBGMaint.value
    let x=0
    if(!prevCBGMaint.value){
        prevCBGMaint.style.borderColor = "red"
        x=1
    }else{
        prevCBGMaint.style.borderColor = ""
    }
    if(!currCBGMaint.value){
        currCBGMaint.style.borderColor = "red"
        x=1
    }else{
        currCBGMaint.style.borderColor = ""
    }
    if(!currRateMaint.value){
        currRateMaint.style.borderColor = "red"
        x=1
    }else{
        currRateMaint.style.borderColor = ""
    }
    if(x==1){
        resultsElement.textContent = ""
        return
    }

    let differenceCBG = currCBG - prevCBG 
    if(currCBG<100){
        resultsElement.textContent = "DC insulin and give 100 mL D10, recheck every 15 minutes"

    }else
    if(currCBG>=100 && currCBG<=139){
        if(differenceCBG>0){
            resultsElement.textContent = "No Change"

        }else if(differenceCBG<=0 && differenceCBG>=-20){

            resultsElement.textContent = "Decrease rate by " + delta + " ml/hr"

        }else{
            resultsElement.textContent = "DC insulin -> CBG/30 min -> when CBG > 140 mg/dL -> restart at rate =  " + (roundHalf(0.75*currRateMaint.value)) + " ml/hr"

        }

    }else if(currCBG==140){
        if(differenceCBG>40){
            resultsElement.textContent = "Increase rate by " + delta + " ml/hr"

        }else if(differenceCBG>=-20){
            resultsElement.textContent = "No Change"
            

        }else if(differenceCBG>=-40){
            resultsElement.textContent = "Decrease rate by " + delta + " ml/hr"


        }else{
            resultsElement.textContent = "Hold infusion for 30 minutes then decrease rate by " + (2*delta) + " ml/hr"


        }
        
    }else if(currCBG<=200){

        if(differenceCBG>60){
            resultsElement.textContent = "Increase rate by " + (2*delta) + " ml/hr"

        }else if(differenceCBG>=0){
            resultsElement.textContent = "Increase rate by " + (delta) + " ml/hr"
            

        }else if(differenceCBG>=-40){
            resultsElement.textContent = "No Change"


        }else if(differenceCBG>=-60){
            resultsElement.textContent = "Decrease rate by " + delta + " ml/hr"


        }else{
            resultsElement.textContent = "Hold infusion for 30 minutes then decrease rate by " + (2*delta) + " ml/hr"


        }

    }else{
        if(differenceCBG>0){
            resultsElement.textContent = "Increase rate by " + (2*delta) + " ml/hr"

        }else if(differenceCBG>=-20){
            resultsElement.textContent = "Increase rate by " + (delta) + " ml/hr"
            

        }else if(differenceCBG>=-60){
            resultsElement.textContent = "No Change"


        }else if(differenceCBG>=-80){
            resultsElement.textContent = "Decrease rate by " + delta + " ml/hr"


        }else{
            resultsElement.textContent = "Hold infusion for 30 minutes then decrease rate by " + (2*delta) + " ml/hr"


        }

    }


}


initButton.addEventListener("click" , initiationEvent)
maintButton.addEventListener("click" , maintetnanceEvent)