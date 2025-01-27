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
      label: "Current Rate (m/hr)",
      type: "number",
      name: "currentrate"
    },

  ]

  const handleSubmit = (values, errors) => {
    if (errors) {
      setResult("")
      setResult2("")
      return
    }
    if (values.currentcbg < 100) {
      setResult(
        "DC insulin and give 100 mL D10, recheck every 30 minutes, give 100 mL D10 again if still < 100. When CBG > 140 mg%, resume insulin by " + Math.round(values.currentrate) * 0.5 + " mL/hr")
      return
    }
    if (values.currentcbg <= 250) {
      const newRate = Math.floor(0.05 * values.bodyweight)
      if (newRate > 15) {
        setResult("New rate is greater than 15 ml/hr, please contact relevant physician")
        if (values.currentcbg > 300) {
          setResult2("Check Acetone in Urine");
        }
      } else {
        setResult(`Decrease rate to ${newRate} ml/hr`)
        setResult2("Add D 10 rate 125 ml/hr ( adjust rate of NaCl )")
      }
      return
    }

    // let currCbg = values.currentcbg
    // let prevCbg =  values.previouscbg
    // let diffHco3 = values.currenthco3 - values.previoushco3
    let diffCbg = values.currentcbg - values.previouscbg

    if (diffCbg > -50) {
      const newRate = values.currentrate * 2
      if (newRate > 15) {
        setResult("New rate is greater than 15 ml/hr, please contact relevant physician")

        if (values.currentcbg > 300) {
          setResult2("Check Acetone in Urine");
        } else {
          setResult2("")
        }
      } else {
        setResult(`Modify rate to ${newRate} ml/hr`)
        setResult2("")

      }

    } else if (diffCbg > -100) {

      setResult("No change")
      setResult2("")


    }
    //  else {
    //   setResult(`Modify rate to ${values.currentrate - 1} ml/hr`)

    // }









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
        title="DKA Modification"
        type="DKAModification"
        handleSub={handleSubmit}
      />

      <div className="resultsheadline">Results: </div>
      <div className="resultsIIC" style={{ "color": "green" }}>{result}</div>
      <div className="resultsIIC" style={{ "color": "green" }}>{result2}</div>








    </div>
  )
}

export default DKAModification