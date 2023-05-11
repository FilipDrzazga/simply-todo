import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, db, doc, getDoc, getDocs, query, where } from "../firebase/firebase";

const queryUserData = createAsyncThunk("user/queryUserData", async (userData) => {
  const docRef = doc(db, "users", userData);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), userDocRef: userData };
  }
});

const queryUserTodos = createAsyncThunk("user/queryUserTodo", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const arrOfTodos = [];
  const userTodos = query(collection(db, "usersTodos"), where("userId", "==", state.user.userData.userId));
  const userTodosSnapshot = await getDocs(userTodos);
  userTodosSnapshot.forEach((document) => {
    arrOfTodos.push(document.data());
  });
  return arrOfTodos;
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

export { queryUserData, queryUserTodos };
export default userSlice.reducer;
