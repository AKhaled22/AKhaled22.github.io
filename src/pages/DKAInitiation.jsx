import React, { useState } from 'react'
import MyForm from '../MyForm'






const DKAInitiation = () => {

  const [result, setResult] = useState("")






  const inpArr = [
    {
      label: "Body Weight (Kg)",
      type: "number",
      name: "bodyweight"

    },
   
  ]

  const handleSubmit = (values, errors) => {
    if (errors) {
      setResult(" ")
      return
    }

   setResult(Math.round(values.bodyweight)/10 >= 15 ? 15 : Math.round(values.bodyweight)/10 )



  }



  return (
    <div>
      <div id="inst">
        <div className="instructions">
          Add 50 IU insulin + 50 cc Normal saline
        </div>
        <div className="instructions">
          Before connecting, flush 20 cc infusion through all tubing
        </div>
        <div className="instructions">
          Prepare 500 ml of D 10 in the patient's room
        </div>

      </div>
      <MyForm
        buttText="Calculate"
        inputArr={inpArr}
        title="DKA Initiation"
        type="DKAInitiation"
        handleSub={handleSubmit}
      />

      <div className="currcbg" style={{ "text-align": "center", "margin-top": "1.5rem" }}>
        <label className="initResults" style={{ "font-weight": "bold" }}>Rate (ml/hr): </label>

        <label className="initbResult" style={{ "font-weight": "bolder", "color": "green" }}>{result}</label>

      </div>

      





    </div>
  )
}

export default DKAInitiation