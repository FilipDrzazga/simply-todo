import React from "react";
import Input from "./Input";
import Button from "./Button";
import * as S from "../styled/TaskEditor.styled";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { addNewBoard, updateBoardName, createNewTask } from "../store/userSlice";
import { editTodo } from "../utils";

const containerVariants = {
  hidden: { backdropFilter: "blur(0px)" },
  visible: {
    backdropFilter: "blur(3px)",
    transition: { backdropFilter: { duration: 0.2 }, delayChildren: 0.25 },
  },
  exit: { backdropFilter: "blur(0px)", transition: { backdropFilter: { delay: 0.3, duration: 0.25 } } },
};

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50, transition: { delay: 0.2 } },
};

const TaskEditor = ({ id, htmlFor, placeholder, buttonText, labelText, validateField, setDisplayTaskEditor }) => {
  const dispatch = useDispatch();
  const { userData, activeBoard } = useSelector((state) => state.user);

  const onSubmit = async (values, { resetForm }) => {
    switch (validateField) {
      case "addBoard":
        dispatch(addNewBoard({ userId: userData.userId, boardName: values.addBoard }));
        break;
      case "renameBoard":
        dispatch(updateBoardName(values.renameBoard));
        break;
      case "addTask":
        dispatch(createNewTask({ taskName: values.addTask, boardId: activeBoard[0].boardId }));
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
    <S.Section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(e) => closeTaskEditor(e)}
    >
      <S.Form variants={formVariants} onSubmit={handleSubmit} autoComplete="off">
        <Input
          autoFocus
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
