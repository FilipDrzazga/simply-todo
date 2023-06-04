import React from "react";
import Input from "./Input";
import Button from "./Button";
import * as S from "../styled/TaskEditor.styled";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { addNewBoard, updateBoardName } from "../store/userSlice";
import { editTodo } from "../utils";

const TaskEditor = ({ id, htmlFor, placeholder, buttonText, labelText, validateField, setDisplayTaskEditor }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const onSubmit = async (values, { resetForm }) => {
    switch (validateField) {
      case "addBoard":
        dispatch(addNewBoard({ userId: userData.userId, boardName: values.addBoard }));
        break;
      case "renameBoard":
        dispatch(updateBoardName(values.renameBoard));
        break;
      default:
        return;
    }
    resetForm();
    setDisplayTaskEditor(false);
  };

  const { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      validateField: validateField,
      addBoard: "",
      addTask: "",
    },
    validateOnMount: true,
    validationSchema: editTodo,
    onSubmit: onSubmit,
  });

  const closeTaskEditor = (e) => {
    e.target.tagName === "SECTION" && setDisplayTaskEditor(false);
  };

  return (
    <S.Section onClick={(e) => closeTaskEditor(e)}>
      <S.Form onSubmit={handleSubmit} autoComplete="off">
        <Input
          id={id}
          type="text"
          value={values[validateField]}
          error={errors[validateField]}
          touched={touched[validateField]}
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
