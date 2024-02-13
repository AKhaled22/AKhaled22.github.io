import React, { useState } from 'react'
import MyForm from '../MyForm'






const HICInitialization = () => {

  const [initBResult, setInitBResult] = useState("")
  const [initRResult, setInitRResult] = useState("")






  


  const inpArr = [
    {
      label: "Body Weight (Kg)",
      type: "number",
      name: "bodyweight"

    },
    {
      label: "Height (Cm)",
      type: "number",
      name: "height"
    },
    {
      label: "Gender (M/F)",
      type: "radio",
      name: "gender",
      radioOne: "Male",
      radioTwo: "Female"
    },
  ]

  const handleSubmit = (values, errors) => {
    console.log(values, errors)
    if (errors) {
      setInitBResult(" ")
      setInitRResult(" ")
      console.log(initBResult);
      return
    }
    function usedBodyWeight() {
      let BMI = values.bodyweight / (Math.pow(values.height / 100, 2))
      let IBW = (values.gender == "M") ? (50 + (2.3 * ((values.height - 152.4) * 0.393700787))) : (45.5 + (2.3 * ((values.height - 152.4) * 0.393700787)))

      if (BMI < 30) {
        return values.bodyweight

      } else {
        return ((0.4 * (values.bodyweight - IBW)) + IBW)
      }
    }

    let usedBW = usedBodyWeight()
    setInitBResult(Math.round((80 * usedBW / 100)/5)*5)
    setInitRResult(Math.round(18 * usedBW / 100))



  }



  return (
    <div>
      <div id="inst">
        <div className="instructions">
          Prepare Heparin by adding 5000 IU to 49 ml of normal saline (100 IU/ml)
        </div>

      </div>
      <MyForm
        buttText="Calculate"
        inputArr={inpArr}
        title="HIC Initialization"
        type="HICInitialization"
        handleSub={handleSubmit}
      />

      <div className="currcbg" style={{ "text-align": "center", "margin-top": "1.5rem" }}>
        <label className="initResults" style={{ "font-weight": "bold" }}>Initial Bolus (ml): </label>

        <label className="initbResult" style={{ "font-weight": "bolder", "color": "green" }}>{initBResult}</label>

      </div>

      <div className="currcbg" style={{ "text-align": "center" }}>
        <label className="initResults" style={{ "font-weight": "bold" }}>Initial Rate (ml/hr): </label>

        <label className="initrResult" style={{ "font-weight": "bolder", "color": "green" }}>{initRResult}</label>

      </div>





    </div>
  )
}

export default HICInitialization