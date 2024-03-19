import React, { useState } from "react";
import MyForm from "../MyForm";

const IICInitiation = () => {
  const [initbResult, setInitbResult] = useState("");
  const [initrResult, setInitrResult] = useState("");
  const [resultsElement, setResultsElement] = useState("");

  function roundHalf(num) {
    return Math.round(num * 2) / 2;
  }

  function handleSubmit(values, errors) {
    if (errors) {
      setInitbResult("");
      setInitrResult("");
      setResultsElement("");
      return;
    }

    let x = roundHalf(values.currentcbg / 100);

    if (values.currentcbg < 180) {
      setInitbResult("NA");
      setInitrResult("NA");
      setResultsElement("")
    } else if (values.currentcbg < 300) {
      setInitrResult(x);
      setInitbResult("NA");
      setResultsElement("")

    } else {
      setInitrResult(x);
      setInitbResult(Math.floor(values.currentcbg / 100 / 0.5) * 0.5);
      setResultsElement("Check Acetone in Urine");
    }
  }

  const inpArr = [
    {
      label: "Current CBG (mg%)",
      type: "number",
      name: "currentcbg",
    },
  ];

  return (
    <div>
      <div id="inst">
        <div className="instructions">
          Initiate insulin infusion if more than 180 mg/dL in a diabetic patient
        </div>
        <div className="instructions">
          Add 50 IU insulin + 50 cc Normal saline
        </div>
        <div className="instructions">
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

      <div className="currcbg mt-4" style={{ "text-align": "center" }}>
        <label className="labelsResults margright3">Initial Bolus (ml): </label>

        <label className="initbResult" style={{ "font-weight": "bolder" }}>
          {initbResult}
        </label>
      </div>

      <div className="currcbg" style={{ "text-align": "center" }}>
        <label className="labelsResults margright3">
          Initial Rate (ml/hr):{" "}
        </label>

        <label className="initrResult" style={{ "font-weight": "bolder" }}>
          {initrResult}
        </label>
      </div>
      {resultsElement && (
        <div className="resultsIIC" style={{ color: "green" }}>
          {resultsElement}
        </div>
      )}
    </div>
  );
};

export default IICInitiation;
