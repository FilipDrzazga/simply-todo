import React from "react";
import Input from "./Input";
import Button from "./Button";

import * as S from "../styled/TaskEditor.styled";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { addRename } from "../utils";
import { addNewBoard } from "../store/userSlice";

const TaskEditor = ({ id, htmlFor, placeholder, buttonText, labelText, isOpen }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const onSubmit = async ({ addBoard }, { resetForm }) => {
    try {
      if (addBoard) {
        await dispatch(addNewBoard({ userId: userData.userId, boardName: addBoard }));
      }
    } catch (error) {
      console.log("error come from TaskEditor comp:"`${error.message}`);
    } finally {
      resetForm();
      isOpen(false);
    }
  };

  const { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      addBoard: "",
    },
    validateOnMount: true,
    validationSchema: addRename,
    onSubmit: onSubmit,
  });

  const handleClick = (e) => {
    if (e.target.tagName === "SECTION") {
      isOpen(false);
    }
  };

  return (
    <S.Section onClick={handleClick}>
      <S.Form onSubmit={handleSubmit} autoComplete="off">
        <Input
          id={id}
          type="text"
          value={values.addBoard}
          error={errors.addBoard}
          touched={touched.addBoard}
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

export default TaskEditor;
