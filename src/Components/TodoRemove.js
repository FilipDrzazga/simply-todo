import React from "react";
import * as S from "../styled/TodoRemove.styled";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { removeBoardFromDB } from "../store/userSlice";

const containerVariants = {
  hidden: { backdropFilter: "blur(0px)" },
  visible: {
    backdropFilter: "blur(3px)",
    transition: { backdropFilter: { duration: 0.2 }, delayChildren: 0.25 },
  },
  exit: { backdropFilter: "blur(0px)", transition: { backdropFilter: { delay: 0.3, duration: 0.25 } } },
};

const childrenVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50, transition: { delay: 0.2 } },
  removeBtnTap: { scale: 0.9, backgroundColor: "#8A2016" },
  removeBtnHover: { backgroundColor: "#8A2016" },
};

const TodoRemove = ({ setDisplayTodoRemove }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const closeTodoRemove = () => {
    setDisplayTodoRemove(false);
  };

  const removeBoard = () => {
    dispatch(removeBoardFromDB(user.activeBoard[0].boardName));
  };

  return (
    <S.Section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={() => closeTodoRemove()}
    >
      <S.Container variants={childrenVariants}>
        <S.Text>
          Do you want to delete "{user.activeBoard[0].boardName}" Board? Will also be deleted from the users you share
          it with.
        </S.Text>
        <Button
          variants={childrenVariants}
          whileHover="removeBtnHover"
          whileTap="removeBtnTap"
          removeOnClick={() => removeBoard()}
          type="submit"
          size="70%"
          removebtn="true"
        >
          DELETE
        </Button>
      </S.Container>
    </S.Section>
  );
};

export default TodoRemove;
