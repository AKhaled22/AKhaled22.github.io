import React, { useEffect } from "react";
import Input from "./Input.jsx";

import Button from 'react-bootstrap/Button'
// import Form from "react-bootstrap/Form";
import Validation from "./validate/validate.js";

import { Formik, Form } from "formik";


const MyForm = ({
  title,
  inputArr,
  buttText,
  type,
  handleSub,
  className

}) => {
  const validationSchema = Validation(type);
  // console.log("initVal", initVal);
  // const handleSubmit = async (values, { setSubmitting }) => {
  //   console.log("hii");
  // };

  // console.log(validationSchema);
  // console.log(inputArr);
  return (
    <div className={"myForm " + className}>
      <Formik
        validationSchema={validationSchema}
        // onSubmit={console.log}
        onSubmit={(values, errors) => {
          // Your submit logic can go here
          // For now, let's just log the form values
          // props.handlePay()
          handleSub(values);
          // setSubmitting(false);
        }}
        // initialValues={edit == "true" ? initVal : {}}
        initialValues={{}}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit} onChange={() => { handleSub(values, 1) }} className={`${(type == 'Login' || type == 'Register') && 'w-100'}`}  >
            <h3 className="init">{title}</h3>
            {inputArr &&
              inputArr.map((inp, i) => (



                <Input
                  key={i}
                  onChange={handleChange}
                  value={values[inp.name]}
                  error={errors[inp.name]}
                  label={inp.label}
                  name={inp.name}
                  optionsArr={inp.optionsArr}
                  placeholder={inp.placeholder}
                  radioOne={inp.radioOne}
                  radioTwo={inp.radioTwo}
                  type={inp.type}
                  isDisabled={inp.disable}
                  radioOneChecked={inp.radioOneChecked}
                  radioTwoChecked={inp.radioTwoChecked}
                  selected={inp.selected}
                  style={inp.style}
                />
              ))}
            {/* {console.log(values)} */}


            <Button type="submit" className="blackbutt">{buttText}</Button>





          </Form>


        )}
      </Formik>
    </div>
  );
};

export default MyForm;


