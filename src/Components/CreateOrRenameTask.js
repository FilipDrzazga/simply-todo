import React from "react";
import Input from "./Input";
import Button from "./Button";

import * as S from "../styled/CreateOrRenameTask.styled";
import { useFormik } from "formik";
import { renameOrCreate } from "../utils";

const CreateOrRenameTask = ({ id, htmlFor, placeholder, buttonText, labelText, closeModal }) => {
  const onSubmit = ({ name }, { resetForm }) => {};
  const { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      newTask: "",
    },
    validateOnMount: true,
    validationSchema: renameOrCreate,
    onSubmit: onSubmit,
  });
  const handleClick = (e) => {
    if (e.target.tagName === "SECTION") {
      closeModal(false);
    }
  };

  return (
    <S.Section onClick={handleClick}>
      <S.Form onSubmit={handleSubmit} autoComplete="off">
        <Input
          id={id}
          type="text"
          value={values.newTask}
          error={errors.newTask}
          touched={touched.newTask}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          htmlFor={htmlFor}
          labelText={labelText}
          size="80%"
          labelVisibility={false}
          placeholderColor={true}
          borderStyleLine={true}
        />
        <Button primary="true" type="submit" size="70%" disabled={!isValid}>
          {buttonText}
        </Button>
      </S.Form>
    </S.Section>
  );
};

export default CreateOrRenameTask;
