import React , {useState} from 'react'
import MyForm from '../MyForm'

const HICModification = () => {

  const [extraBolusR , setExtraBolusR] = useState("")
  const [changingRateR , setChangingRateR] = useState("")


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
      name: "currentrate"
    },
    {
      label: "Gender (M/F)",
      type: "radio",
      name: "gender",
      radioOne: "Male",
      radioTwo: "Female"
    },
  ]

  const handleSubmit = (values , errors) => {
    console.log(values);

    if (errors) {
      setChangingRateR(" ")
      setExtraBolusR(" ")
      return
    }

    function usedBodyWeight() {
      let BMI = values.bodyweight / (Math.pow(values.height / 100, 2))
      let IBW = (values.gender == "M") ? (50 + (2.3 * ((values.height / 2.5) - 60))) : (45 + (2.3 * ((values.height / 2.5) - 60)))
      
      if (BMI < 40) {
        return values.bodyweight

      }else{
      return ((0.4 * (values.bodyweight - IBW)) + IBW)
      }
    }

    let usedBW = usedBodyWeight()
    let extraBolus = 0
    let changingRate = 0

    if (values.aptt < 35) {
      extraBolus = 80 * usedBW / 100
      changingRate = Math.round(4 * Number(usedBW) / 100 + Number(values.currentrate))

    } else if (values.aptt < 46) {
      extraBolus = 40 * usedBW / 100
      changingRate = Math.round(2 * Number(usedBW) / 100 + Number(values.currentrate))

    } else if (values.aptt < 71) {
      changingRate = "No Change"

    } else if (values.aptt < 91) {
      changingRate = Math.round(Number(values.currentrate) - 2 * Number(usedBW) / 100)

    } else {

      changingRate = "Stop infusion for 1 hour then resume by " + Math.round(Number(values.currentrate) - 3 * Number(usedBW) / 100)

    }

    setExtraBolusR("Extra Bolus = " + Math.round(extraBolus))
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


      <div class="resultsheadline">Results: </div>

      <div class="resultsHIC">{changingRateR}</div>
      <div class="resultsHIC">{extraBolusR}</div>



    </div>
  )
}

export default HICModification