import React, { useState } from 'react'
import MyForm from '../MyForm'






const DKAModification = () => {

  const [result, setResult] = useState("")
  const [result2, setResult2] = useState("")







  const inpArr = [

    {
      label: "Body Weight (Kg)",
      type: "number",
      name: "bodyweight"

    },
    {
      label: "Previous CBG (mg%)",
      type: "number",
      name: "previouscbg"

    },
    {
      label: "Current CBG (mg%)",
      type: "number",
      name: "currentcbg"
    },
    {
      label: " Previous HCO3",
      type: "number",
      name: "previoushco3"
    },
    {
      label: " Current HCO3",
      type: "number",
      name: "currenthco3"
    },
    {
      label: "Current Rate (m/hr)",
      type: "number",
      name: "currentrate"
    },

  ]

  const handleSubmit = (values, errors) => {
    console.log(values, errors)
    if (errors) {
      setResult("")
      setResult2("")
      return
    }

    if(values.currentcbg < 250){
      setResult(`Decrease rate to ${0.05 * values.bodyweight} ml/hr`)
      setResult2("Add D 10 rate 125 ml/hr ( adjust rate of NaCl )")
      return
    }

    // let currCbg = values.currentcbg
    // let prevCbg =  values.previouscbg
    let diffHco3 = values.currenthco3 - values.previoushco3
    let diffCbg = values.currentcbg - values.previouscbg

    if(diffCbg > -50){

      setResult(`Modify rate to ${values.currentrate+1} ml/hr`)

    }else if(diffCbg > -70 ){
      if(diffHco3 > -3){

        setResult(`Modify rate to ${values.currentrate+1} ml/hr`)

        

      }else{

        setResult("No change")

      }

    }else{
      setResult(`Modify rate to ${values.currentrate-1} ml/hr`)

    }
    setResult2("")









  }



  return (
    <div>
      <div id="inst">
        <div class="instructions">
          Add 50 IU insulin + 50 cc Normal saline
        </div>
        <div class="instructions">
          Before connecting, flush 20 cc infusion through all tubing
        </div>
        <div class="instructions">
          Prepare 500 ml of D 10 in the patient's room
        </div>

      </div>
      <MyForm
        buttText="Calculate"
        inputArr={inpArr}
        title="DKA Modification"
        type="DKAModification"
        handleSub={handleSubmit}
      />

      <div class="resultsheadline">Results: </div>
      <div class="resultsIIC" style={{ "color": "green" }}>{result}</div>
      <div class="resultsIIC" style={{ "color": "green" }}>{result2}</div>








    </div>
  )
}

export default DKAModification