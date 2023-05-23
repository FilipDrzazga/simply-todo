import * as yup from "yup";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const createAccountValidation = yup.object().shape({
  email: yup.string().email("*Please enter a valid email").required("*Required"),
  username: yup.string().required("*Required"),
  password: yup
    .string()
    .matches(passwordRegex, {
      message: "*min 8 characters, uppercase letter, lowercase & number",
    })
    .required("*Required"),
});

const emailAccountValidation = yup.object().shape({
  email: yup.string().email("*Please enter a valid email").required("*Required"),
  password: yup.string().required("*Required"),
});

const addRename = yup.object().shape({
  addBoard: yup.string().required("*Required").min(1, "*At least 1 character").max(10, "*Max 10 characters"),
});

export { createAccountValidation, emailAccountValidation, addRename };
