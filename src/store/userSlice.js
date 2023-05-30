import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  db,
  doc,
  getDocs,
  setDoc,
  getDoc,
  query,
  where,
  addDoc,
  serverTimestamp,
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
    const getNewDoc = doc(db, "usersTodos", docRef.id);
    const docSnapshot = await getDoc(getNewDoc);
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

const queryUserTodos = createAsyncThunk("user/queryUserTodos", async (userId, { dispatch }) => {
  let todosArr = [];
  try {
    const userTodos = query(collection(db, "usersTodos"), where("userId", "==", userId));
    const userTodosSnapshot = await getDocs(userTodos);
    userTodosSnapshot.forEach((userTodos) => {
      todosArr.push({ ...userTodos.data() });
    });
    const convertedTodos = todosArr.map((item) => {
      return { ...item, createdAt: JSON.stringify(item.createdAt.toMillis()) };
    });
    await dispatch(setActiveTodoBoard({ dbUserBoard: convertedTodos }));
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
    setActiveTodoBoard(state, action) {
      const { dbUserBoard, setActiveBoard } = action.payload;
      if (dbUserBoard) {
        const onStartActiveBoard = dbUserBoard.filter((board) => board.boardName === "My task");
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
      });
  },
});

export { queryUserData, queryUserTodos, createBoardForNewUser, addNewBoard, createUserDataInDB };
export const { addBoardToState, setActiveTodoBoard } = userSlice.actions;
export default userSlice.reducer;
