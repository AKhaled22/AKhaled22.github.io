import * as yup from "yup";
import { validateSchema } from "./validate_schema.js";

const Validation = (type) => {
  const formSchema = {
    HICInitialization: {
      bodyweight: validateSchema["bodyweight"],
      height: validateSchema["height"],
      gender: validateSchema["gender"],
      
    },

    HICModification: {
      bodyweight: validateSchema["bodyweight"],
      height: validateSchema["height"],
      gender: validateSchema["gender"],
      aptt: validateSchema["aptt"],
      currentrate: validateSchema["currentrate"],

    },

    IICInitiation: {
      currentcbg: validateSchema["currentcbg"],
      

    },
    IICMaintenance: {
      previouscbg: validateSchema["previouscbg"],
      currentcbg: validateSchema["currentcbg"],
      currentrate: validateSchema["currentrate"],
    },
    DKAInitiation: {
      bodyweight: validateSchema["bodyweight"],

    },
    DKAModification: {
      bodyweight: validateSchema["bodyweight"],
      previouscbg: validateSchema["previouscbg"],
      currentcbg: validateSchema["currentcbg"],
      previoushco3: validateSchema["previoushco3"],
      currenthco3: validateSchema["currenthco3"],
      currentrate: validateSchema["currentrate"],
    },
  
  
  };

  const schema = yup.object().shape(formSchema[type]);
  // console.log(schema);

  return schema;
};

export default Validation;
