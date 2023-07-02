import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  db,
  doc,
  getDocs,
  setDoc,
  getDoc,
  deleteDoc,
  query,
  where,
  addDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from "../firebase/firebase";
import { v4 as uuid } from "uuid";

const createUserDataInDB = createAsyncThunk("user/createUserDataDocInDB", async ({ username, email, userId }) => {
  try {
    await setDoc(doc(db, "users", userId), {
      username,
      email,
      userId,
    });
  } catch (error) {
    // set here rejectedWithValue from thunk late;
    console.log("error from createUserDataInDB", `${error.message}`);
  }
});

const queryUserData = createAsyncThunk("user/queryUserData", async (userId) => {
  try {
    const userDataRef = doc(db, "users", userId);
    const userDataSnapshot = await getDoc(userDataRef);
    if (userDataSnapshot.exists()) {
      return userDataSnapshot.data();
    }
  } catch (error) {
    // set here rejectedWithValue from thunk late;
    console.log("error from queryUserData", `${error.message}`);
  }
});

const createBoardForNewUser = createAsyncThunk("user/setTaskBoardForNewUser", async (userId) => {
  try {
    await setDoc(doc(db, "usersTodos", userId), {
      userId,
      boardName: "My task",
      defaultBoard: true,
      boardId: uuid(),
      createdAt: serverTimestamp(),
      tasks: [
        { taskName: "Add new board", isDone: false, taskId: uuid() },
        { taskName: "Add new task", isDone: false, taskId: uuid() },
      ],
      tasksDone: [],
    });
  } catch (error) {
    // set here rejectedWithValue from thunk late;
    console.log("error from setBoardForNewUser", `${error.message}`);
  }
});

const addNewBoard = createAsyncThunk("user/addNewBoard", async ({ userId, boardName }, { dispatch }) => {
  try {
    const docRef = await addDoc(collection(db, "usersTodos"), {
      userId,
      boardName,
      boardId: uuid(),
      createdAt: serverTimestamp(),
      tasks: [],
      tasksDone: [],
    });
    const getNewBoard = doc(db, "usersTodos", docRef.id);
    const docSnapshot = await getDoc(getNewBoard);
    if (docSnapshot.exists()) {
      const data = { ...docSnapshot.data() };
      const convertData = { ...data, createdAt: JSON.stringify(data.createdAt.toMillis()) };
      return dispatch(addBoardToState(convertData));
    }
  } catch (error) {
    // set here rejectedWithValue from thunk late;
    console.log("error from addNewBoard", `${error.message}`);
  }
});

const updateBoardName = createAsyncThunk("user/updateBoard", async (name, { getState }) => {
  const state = getState();
  try {
    const queryBoard = await query(
      collection(db, "usersTodos"),
      where("boardName", "==", state.user.activeBoard[0].boardName)
    );
    const querySnapshot = await getDocs(queryBoard);
    querySnapshot.forEach((document) => {
      const documentRef = doc(db, "usersTodos", document.id);
      updateDoc(documentRef, {
        boardName: name,
      });
    });
    return { name: name, boardId: state.user.activeBoard[0].boardId };
  } catch (error) {
    // set here rejectedWithValue from thunk late;
    console.log("error from updateBoardName", `${error.message}`);
  }
});

const removeBoardFromDB = createAsyncThunk("user/removeBoardFromDB", async (name, { getState }) => {
  const state = getState();
  try {
    const queryBoard = await query(
      collection(db, "usersTodos"),
      where("boardName", "==", state.user.activeBoard[0].boardName)
    );
    const querySnapshot = await getDocs(queryBoard);
    querySnapshot.forEach((document) => {
      const documentRef = doc(db, "usersTodos", document.id);
      deleteDoc(documentRef);
    });
    return { name: name };
  } catch (error) {
    // set here rejectedWithValue from thunk late;
    console.log("error from removeBoardFromDB", `${error.message}`);
  }
});

const createNewTask = createAsyncThunk("user/createNewTask", async ({ taskName, boardId }, { dispatch, getState }) => {
  const state = getState();
  try {
    const taskId = uuid();
    const queryBoard = await query(
      collection(db, "usersTodos"),
      where("boardName", "==", state.user.activeBoard[0].boardName)
    );
    const querySnapshot = await getDocs(queryBoard);
    querySnapshot.forEach((document) => {
      const documentRef = doc(db, "usersTodos", document.id);
      updateDoc(documentRef, {
        tasks: arrayUnion({ isDone: false, taskId: taskId, taskName: taskName }),
      });
    });
    return dispatch(addNewTaskToBoard({ isDone: false, taskId: taskId, taskName: taskName, boardId: boardId }));
  } catch (error) {
    // set here rejectedWithValue from thunk late;
    console.log("error from queryUserTodos", `${error.message}`);
  }
});

const queryUserTodos = createAsyncThunk("user/queryUserTodos", async (userId, { dispatch }) => {
  let todosArr = [];
  try {
    const userTodos = await query(collection(db, "usersTodos"), where("userId", "==", userId));
    const userTodosSnapshot = await getDocs(userTodos);
    userTodosSnapshot.forEach((userTodos) => {
      todosArr.push({ ...userTodos.data() });
    });
    const convertedTodos = todosArr.map((item) => {
      return { ...item, createdAt: JSON.stringify(item.createdAt.toMillis()) };
    });
    await dispatch(setActiveTodoBoard({ dbUserBoards: convertedTodos }));
    return convertedTodos;
  } catch (error) {
    // set here rejectedWithValue from thunk late;
    console.log("error from queryUserTodos", `${error.message}`);
  }
});

const initialState = {
  userData: "",
  userTodos: "",
  activeBoard: "",
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    addBoardToState(state, action) {
      state.userTodos.push(action.payload);
    },
    addNewTaskToBoard(state, action) {
      const filterBoard = state.userTodos.filter((board) => board.boardId === action.payload.boardId);
      filterBoard && filterBoard[0].tasks.push({ ...action.payload });
      state.activeBoard[0].tasks.push({ ...action.payload });
    },
    setActiveTodoBoard(state, action) {
      const { dbUserBoards, setActiveBoard } = action.payload;
      if (dbUserBoards) {
        const onStartActiveBoard = dbUserBoards.filter((board) => board.boardName === "My task");
        state.activeBoard = onStartActiveBoard;
      } else if (setActiveBoard) {
        state.activeBoard = setActiveBoard;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(queryUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(queryUserTodos.fulfilled, (state, action) => {
        state.userTodos = action.payload.sort((boardA, boardB) => {
          return boardA && boardB ? boardA.createdAt - boardB.createdAt : boardA;
        });
      })
      .addCase(updateBoardName.fulfilled, (state, action) => {
        const boardToUpdate = state.userTodos.find((board) => board.boardId === action.payload.boardId);
        if (boardToUpdate) {
          boardToUpdate.boardName = action.payload.name;
        }
      })
      .addCase(removeBoardFromDB.fulfilled, (state, action) => {
        const removedBoard = state.userTodos.filter((boards) => boards.boardName !== action.payload.name);
        state.userTodos = removedBoard;
      });
  },
});

export {
  queryUserData,
  queryUserTodos,
  createBoardForNewUser,
  addNewBoard,
  updateBoardName,
  removeBoardFromDB,
  createNewTask,
  createUserDataInDB,
};
export const { addBoardToState, addNewTaskToBoard, setActiveTodoBoard } = userSlice.actions;
export default userSlice.reducer;
