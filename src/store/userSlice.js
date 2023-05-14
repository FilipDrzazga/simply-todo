import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, db, doc, getDocs, setDoc, getDoc, query, where } from "../firebase/firebase";
import { v4 as uuid } from "uuid";

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

const queryUserTodos = createAsyncThunk("user/queryUserTodo", async (userId) => {
  let arr = [];
  try {
    const userTodos = query(collection(db, "usersTodos"), where("userId", "==", userId));
    const userTodosSnapshot = await getDocs(userTodos);
    userTodosSnapshot.forEach((userTodos) => {
      arr.push(userTodos.data());
    });
    return arr;
  } catch (error) {
    // set here rejectedWithValue from thunk late;
    console.log("error from queryUserTodos", `${error.message}`);
  }
});

const createBoardForNewUser = createAsyncThunk("user/setTaskBoardForNewUser", async (userId) => {
  try {
    await setDoc(doc(db, "usersTodos", userId), {
      userId,
      boardName: "My task",
      boardId: uuid(),
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

const createUserDataInDB = createAsyncThunk("user/createUserDataDocInDB", async ({ username, email, userId }, { dispatch }) => {
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

const initialState = {
  userData: "",
  userTodos: "",
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(queryUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(queryUserTodos.fulfilled, (state, action) => {
        state.userTodos = action.payload;
      });
  },
});

export { queryUserData, queryUserTodos, createBoardForNewUser, createUserDataInDB };
export default userSlice.reducer;
