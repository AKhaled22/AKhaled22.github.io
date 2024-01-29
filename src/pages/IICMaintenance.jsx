import React, { useState } from 'react'
import MyForm from '../MyForm'

const IICMaintenance = () => {

  const [resultsElement, setResultsElement] = useState("")



  const handleSubmit = (values, errors) => {

    if (errors) {
      setResultsElement("")
      return

    }

    function roundHalf(num) {
      return Math.round(num * 2) / 2;
    }

    function calculateDelta() {
      let currentRateMaint = values.currentrate
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




    const delta = roundHalf(calculateDelta())
    const currCBG = values.currentcbg
    const prevCBG = values.previouscbg
    const currRate = values.currentrate




    let differenceCBG = currCBG - prevCBG
    let y = 0
    if (currCBG < 100) {
      setResultsElement("DC insulin and give 100 mL D10, recheck every 15 minutes, when CBG > 140 mg%, resume insulin by " + 0.5 * currRate + " m/hr")

    } else
      if (currCBG >= 100 && currCBG <= 139) {
        if (differenceCBG > 0) {
          setResultsElement("No Change")

        } else if (differenceCBG <= 0 && differenceCBG >= -20) {
          y = (Number(currRate) - delta)

          setResultsElement("Decrease rate to " + (y) + " ml/hr")

        } else {
          setResultsElement("DC insulin -> CBG/30 min -> when CBG > 140 mg/dL -> restart at rate =  " + (roundHalf(0.50 * currRate)) + " ml/hr")

        }

      } else if (currCBG == 140) {
        if (differenceCBG > 40) {
          y = (Number(currRate) + delta)
          if (y <= 20) {
            setResultsElement("Increase rate to " + y + " ml/hr")
          } else {
            setResultsElement("New rate is greater than 20 ml/hr, please contact relevant physician")

          }
        } else if (differenceCBG >= -20) {
          setResultsElement("No Change")


        } else if (differenceCBG >= -40) {
          y = (Number(currRate) - delta)
          setResultsElement("Decrease rate to " + y + " ml/hr")


        } else {
          y = (Number(currRate) - 2 * delta)
          setResultsElement("DC insulin, repeat CBG every 30 minutes, when it starts to reincrease restart at rate = " + y + " ml/hr")


        }

      } else if (currCBG <= 200) {

        if (differenceCBG > 60) {
          y = (Number(currRate) + 2 * delta)
          if (y <= 20) {
            setResultsElement("Increase rate to " + y + " ml/hr")
          } else {
            setResultsElement("New rate is greater than 20 ml/hr, please contact relevant physician")

          }

        } else if (differenceCBG >= 0) {
          y = (Number(currRate) + delta)
          if (y <= 20) {
            setResultsElement("Increase rate to " + y + " ml/hr")
          } else {
            setResultsElement("New rate is greater than 20 ml/hr, please contact relevant physician")

          }


        } else if (differenceCBG >= -40) {
          setResultsElement("No Change")


        } else if (differenceCBG >= -60) {
          y = (Number(currRate) - delta)
          setResultsElement("Decrease rate to " + y + " ml/hr")


        } else {
          y = (Number(currRate) - 2 * delta)
          setResultsElement("DC insulin, repeat CBG every 30 minutes, when it starts to reincrease restart at rate = " + y + " ml/hr")


        }

      } else {
        if (differenceCBG > 0) {
          y = (Number(currRate) + 2 * delta)
          if (y <= 20) {
            setResultsElement("Increase rate to " + y + " ml/hr")
          } else {
            setResultsElement("New rate is greater than 20 ml/hr, please contact relevant physician")

          }

        } else if (differenceCBG >= -20) {
          y = (Number(currRate) + delta)
          if (y <= 20) {
            setResultsElement("Increase rate to " + y + " ml/hr")
          } else {
            setResultsElement("New rate is greater than 20 ml/hr, please contact relevant physician")

          }


        } else if (differenceCBG >= -60) {
          setResultsElement("No Change")


        } else if (differenceCBG >= -80) {
          y = (Number(currRate) - delta)
          setResultsElement("Decrease rate to " + y + " ml/hr")


        } else {
          y = (Number(currRate) - 2 * delta)
          setResultsElement("DC insulin, repeat CBG every 30 minutes, when it starts to reincrease restart at rate = " + y + " ml/hr")


        }

      }

  }

  const inpArr = [
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
        title="IIC Maintenance"
        type="IICMaintenance"
        handleSub={handleSubmit}
      />


      <div class="resultsheadline">Results: </div>
      <div class="resultsIIC" style={{ "color": "green" }}>{resultsElement}</div>



    </div>
  )
}

export default IICMaintenance