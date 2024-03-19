import React, { useState } from 'react'
import MyForm from '../MyForm'

const HICModification = () => {

  const [extraBolusR, setExtraBolusR] = useState("")
  const [changingRateR, setChangingRateR] = useState("")


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
      label: "aPTT (Secs)",
      type: "number",
      name: "aptt"

    },
    {
      label: "Current Rate (m/hr)",
      type: "number",
      name: "currentratee"
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

    if (errors) {
      setChangingRateR(" ")
      setExtraBolusR(" ")
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
    let extraBolus = 0
    let changingRate = 0

    if (values.aptt < 35) {
      extraBolus = 80 * usedBW / 100
      changingRate = Math.round(4 * Number(usedBW) / 100 + Number(values.currentratee))

    } else if (values.aptt < 46) {
      extraBolus = 40 * usedBW / 100
      changingRate = Math.round(2 * Number(usedBW) / 100 + Number(values.currentratee))

    } else if (values.aptt < 71) {
      changingRate = "No Change"

    } else if (values.aptt < 91) {
      changingRate = Math.round(Number(values.currentratee) - 2 * Number(usedBW) / 100)

    } else {

      changingRate = "Stop infusion for 1 hour then resume by " + Math.round(Number(values.currentratee) - 3 * Number(usedBW) / 100)

    }

    setExtraBolusR("Extra Bolus = " + Math.round(extraBolus/5)*5)
    setChangingRateR("Changing Rate = " + (changingRate))

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
        title="HIC Modification"
        type="HICModification"
        handleSub={handleSubmit}
      />


      <div className="resultsheadline">Results: </div>

      <div className="resultsHIC">{changingRateR}</div>
      <div className="resultsHIC">{extraBolusR}</div>



    </div>
  )
}

export default HICModification