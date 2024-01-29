import React, { useState } from 'react'
import MyForm from '../MyForm'

const IICInitiation = () => {

  const [initbResult, setInitbResult] = useState("")
  const [initrResult, setInitrResult] = useState("")




  function roundHalf(num) {
    return Math.round(num * 2) / 2;
  }


  function handleSubmit(values, errors) {

    if(errors){
      setInitbResult("")
      setInitrResult("")
      return
    }

    let x = roundHalf(values.currentcbg / 100)


    if (values.currentcbg < 180) {
      setInitbResult("NA")
      setInitrResult("NA")

    } else if (values.currentcbg < 300) {
      setInitrResult(x)
      setInitbResult("NA")

    } else {
      setInitrResult(x)
      setInitbResult(x)

    }

  }

  const inpArr = [
    {
      label: "Current CBG (mg%)",
      type: "number",
      name: "currentcbg"

    },

  ]



  return (
    <div>
      <div id="inst">
        <div class="instructions">
          Initiate insulin infusion if 2 consecutive CBG more than 180 mg/dL
        </div>
        <div class="instructions">
          Add 50 IU insulin + 50 cc Normal saline
        </div>
        <div class="instructions">
          Before connecting, flush 20 cc infusion through all tubing
        </div>
      </div>
      <MyForm
        buttText="Calculate"
        inputArr={inpArr}
        title="IIC Initiation"
        type="IICInitiation"
        handleSub={handleSubmit}
      />


      <div class="currcbg" style={{ "text-align": "center" }}>
        <label class="labelsResults margright3" >Initial Bolus (ml): </label>

        <label class="initbResult" style={{ "font-weight": "bolder" }}>{initbResult}</label>

      </div>

      <div class="currcbg" style={{ "text-align": "center" }}>
        <label class="labelsResults margright3">Initial Rate (ml/hr): </label>

        <label class="initrResult" style={{ "font-weight": "bolder" }}>{initrResult}</label>

      </div>



    </div>
  )
}

export default IICInitiation