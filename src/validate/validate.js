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
      currentratee: validateSchema["currentratee"],

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
      currentrate: validateSchema["currentrate"],
    },
    Login: {
      email: validateSchema["email"],
      password: validateSchema["password"],
    },
    Register: {
      email: validateSchema["email"],
      password: validateSchema["password"],
      confirmPassword: validateSchema["confirmPassword"],
    },
  
  
  };

  const schema = yup.object().shape(formSchema[type]);
  // console.log(schema);

  return schema;
};

export default Validation;
