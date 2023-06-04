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

const editTodo = yup.object().shape({
  validateField: yup.string(),
  addBoard: yup
    .string()
    .notRequired()
    .when("validateField", {
      is: (value) => value === "addBoard",
      then: () => yup.string().required("*required").min(1, "*at least 1 character").max(10, "max. 10 characters"),
    }),
  renameBoard: yup
    .string()
    .notRequired()
    .when("validateField", {
      is: (value) => value === "renameBoard",
      then: () => yup.string().required("*required").min(1, "*at least 1 character").max(10, "max. 10 characters"),
    }),
  addTask: yup
    .string()
    .notRequired()
    .when("validateField", {
      is: (value) => value === "addTask",
      then: () => yup.string().required("*required").min(1, "*at least 1 character"),
    }),
});

export { createAccountValidation, emailAccountValidation, editTodo };
