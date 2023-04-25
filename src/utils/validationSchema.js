import * as yup from 'yup';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

const passwordEmailValidation = yup.object().shape({
    email: yup.string().email("*Please enter a valid email").required("*Required"),
    username: yup.string().required("*Required"),
    password: yup.string().matches(passwordRegex, {
        message: "*min 8 characters, uppercase letter, lowercase & number"
    }).required("*Required"),
});

const recoveryPasswordValidation = yup.object().shape({
    email: yup.string().email("*Please enter a valid email").required("*Required"),
});

const createNewTask = yup.object().shape({
    newTask: yup.string().required("*Required")
})

export { passwordEmailValidation, recoveryPasswordValidation, createNewTask };