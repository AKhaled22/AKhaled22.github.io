import * as yup from "yup";





export const validateSchema = {
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
  bodyweight: yup
    .number()
    .required("Body weight is required")
    .min(1 , "Invalid Amount")
  ,
  height: yup
    .number()
    .required("Height is required")
    .min(1 , "Invalid Amount")

  ,

  aptt: yup.number().required("aPTT is required").min(1, "Invalid amount"),
  currentrate: yup
    .number().required("Current Rate is required").min(0.5, "Invalid amount").max(19.5 , "Contact Relevant Physician!"),

  currentcbg: yup
  .number().required("Current CBG is required"),
 
  previouscbg: yup
  .number().required("Previous CBG is required"),
  gender: yup.string().required("Please select an option"),
  previoushco3: yup
    .number()
    .required("Previous HCO3 is required")
  ,
  currenthco3: yup
    .number()
    .required("Current HCO3 is required")
  ,
  currentratee: yup
  .number().required("Current Rate is required").min(0.5, "Invalid amount"),

 
};
