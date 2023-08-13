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
      createdAt: new Date(1995, 11, 17),
      tasks: [
        { taskName: "Add new board", isDone: false, taskId: uuid(), isEditing: false },
        { taskName: "Add new task", isDone: false, taskId: uuid(), isEditing: false },
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

const removeBoardFromDB = createAsyncThunk("user/removeBoardFromDB", async (name, { dispatch, getState }) => {
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
    return dispatch(removeBoardFromState({ name: name }));
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
        tasks: arrayUnion({ isDone: false, taskId: taskId, taskName: taskName, isEditing: false }),
      });
    });
    return dispatch(
      addNewTaskToBoard({ isDone: false, taskId: taskId, taskName: taskName, boardId: boardId, isEditing: false })
    );
  } catch (error) {
    // set here rejectedWithValue from thunk late;
    console.log("error from queryUserTodos", `${error.message}`);
  }
});

const removeTaskFromDB = createAsyncThunk("user/removeTask", async ({ boardId, taskId }, { dispatch, getState }) => {
  const state = getState();
  const updatedArray = state.user.activeBoard[0].tasks.filter((task) => task.taskId !== taskId);
  try {
    const queryBoard = await query(
      collection(db, "usersTodos"),
      where("boardName", "==", state.user.activeBoard[0].boardName)
    );
    const querySnapshot = await getDocs(queryBoard);
    querySnapshot.forEach((document) => {
      const documentRef = doc(db, "usersTodos", document.id);
      updateDoc(documentRef, {
        tasks: updatedArray,
      });
    });
  } catch (error) {
    // set here rejectedWithValue from thunk late;
    console.log("error from removeTaskFromBoard", `${error.message}`);
  }
  return dispatch(removeTaskFromBoard({ taskId: taskId, boardId: boardId }));
});

const updateBoardTasksArraysDB = createAsyncThunk("user/updateBoardTasksArrays", async (_, { getState }) => {
  const state = getState();
  const [userBoardToUpdate] = state.user.userTodos.filter(
    (board) => board.boardName === state.user.activeBoard[0].boardName
  );
  const userTasksArrToUpdate = userBoardToUpdate.tasks;
  const userTasksDoneArrToUpdate = userBoardToUpdate.tasksDone;
  try {
    const queryBoard = await query(
      collection(db, "usersTodos"),
      where("boardName", "==", state.user.activeBoard[0].boardName)
    );
    const querySnapshot = await getDocs(queryBoard);
    querySnapshot.forEach((document) => {
      const documentRef = doc(db, "usersTodos", document.id);
      updateDoc(documentRef, {
        tasks: userTasksArrToUpdate,
        tasksDone: userTasksDoneArrToUpdate,
      });
    });
  } catch (error) {
    // set here rejectedWithValue from thunk late;
    console.log("error from updateBoardTasksArraysDB", `${error.message}`);
  }
});

const queryUserTodos = createAsyncThunk("user/queryUserTodos", async (userId, { dispatch }) => {
  try {
    const queryUserTodos = await query(collection(db, "usersTodos"), where("userId", "==", userId));
    const userTodosRef = await getDocs(queryUserTodos);
    const userTodosPromises = userTodosRef.docs.map(async (doc) => ({ ...doc.data() }));

    const sharedBoardsRef = await getDocs(collection(db, "users", userId, "sharedBoardsBy"));
    const sharedBoardPromises = sharedBoardsRef.docs.map(async (doc) => {
      const { sharedBoardId } = doc.data();
      const querySharedBoards = await query(collection(db, "usersTodos"), where("boardId", "==", sharedBoardId));
      const querySharedBoardsRef = await getDocs(querySharedBoards);
      return querySharedBoardsRef.docs.map((board) => ({ ...board.data() }));
    });

    const allBoardsPromises = userTodosPromises.concat(sharedBoardPromises).flatMap((promises) => promises);
    const allUserBoards = await Promise.all(allBoardsPromises);

    const convertedTodos = allUserBoards
      .flatMap((boards) => boards)
      .map((item) => {
        return { ...item, createdAt: JSON.stringify(item.createdAt.toMillis()) };
      });
    await dispatch(setActiveTodoBoard({ dbUserBoards: convertedTodos }));
    return convertedTodos;
  } catch (error) {
    // set here rejectedWithValue from thunk late;
    console.log("error from queryUserTodos", `${error.message}`);
  }
});

const searchUsersByUsernameDB = createAsyncThunk("user/searchUserByUsername", async (username, { dispatch }) => {
  let users = [];
  try {
    const searchUsersByUsername = await query(
      collection(db, "users"),
      where("username", ">=", username),
      where("username", "<=", username + "\uf8ff")
    );
    const usersShapshot = await getDocs(searchUsersByUsername);
    usersShapshot.forEach((doc) => {
      return users.push({ ...doc.data() });
    });
    await dispatch(filterUsersFromDB(users));
  } catch (error) {
    console.log("error from searchUsersByUsernameDB", error.message);
  }
});

const sharedBoardWithUsers = createAsyncThunk("user/sharedBoardWithUsers", async (user, { getState }) => {
  const state = getState();
  try {
    const userDataRef = doc(db, "users", state.user.userData.userId);
    const subcollectionRef = collection(userDataRef, "sharedBoards");
    await addDoc(subcollectionRef, {
      sharedBoardId: state.user.activeBoard[0].boardId,
      sharedWith: arrayUnion({ ...user, isAdded: true, isGuest: true }),
    });

    const sharingUserDataRef = doc(db, "users", user.userId);
    const sharingSubcollectionRef = collection(sharingUserDataRef, "sharedBoardsBy");
    await addDoc(sharingSubcollectionRef, {
      sharedBoardId: state.user.activeBoard[0].boardId,
      sharedByUserId: state.user.userData.userId,
      sharedByUsername: state.user.userData.username,
    });
  } catch (error) {
    console.log("error from sharedBoardWithUsers", error.message);
  }
});

const initialState = {
  userData: "",
  userTodos: "",
  activeBoard: "",
  searchUsers: [],
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    addBoardToState(state, action) {
      state.userTodos.push(action.payload);
    },
    removeBoardFromState(state, action) {
      const activeBoardIndex = state.userTodos.findIndex((board) => board.boardId === state.activeBoard[0].boardId);
      const removedBoard = state.userTodos.filter((boards) => boards.boardName !== action.payload.name);
      if (activeBoardIndex) {
        state.activeBoard = [state.userTodos[activeBoardIndex - 1]];
      }
      state.userTodos = removedBoard;
    },
    addNewTaskToBoard(state, action) {
      const filterBoard = state.userTodos.filter((board) => board.boardId === action.payload.boardId);
      filterBoard && filterBoard[0].tasks.push({ ...action.payload });
      state.activeBoard[0].tasks.push({ ...action.payload });
    },
    removeTaskFromBoard(state, action) {
      const removedTask = state.activeBoard[0].tasks.filter((task) => task.taskId !== action.payload.taskId);
      state.userTodos = state.userTodos.map((board) => {
        return board.boardId === action.payload.boardId ? { ...board, tasks: removedTask } : board;
      });
      state.activeBoard[0].tasks = removedTask;
    },
    setIsEditing(state, action) {
      state.activeBoard[0].tasks = state.activeBoard[0].tasks.map((task) => {
        return task.taskId === action.payload ? { ...task, isEditing: true } : task;
      });
    },
    setEditingComplete(state, action) {
      state.activeBoard[0].tasks = state.activeBoard[0].tasks.map((task) => {
        return task.taskId === action.payload.taskId
          ? { ...task, taskName: action.payload.newTaskName, isEditing: false }
          : task;
      });
      const boardToUpdate = state.userTodos.find((boards) => boards.boardId === action.payload.boardId);
      const taskToUpdate = boardToUpdate && boardToUpdate.tasks.find((task) => task.taskId === action.payload.taskId);
      if (taskToUpdate) {
        taskToUpdate.taskName = action.payload.newTaskName;
        taskToUpdate.isEditing = false;
      }
    },
    setTaskStatus(state, action) {
      const { status, taskId } = action.payload;
      const [activeBoard] = state.activeBoard;
      const [boardToUpdate] = state.userTodos.filter((board) => board.boardName === activeBoard.boardName);
      if (status) {
        const [taskComplete] = activeBoard.tasks
          .filter((task) => task.taskId === taskId)
          .map((task) => ({ ...task, isDone: status }));
        const uncompleteTasks = activeBoard.tasks.filter((task) => task.taskId !== taskComplete.taskId);
        activeBoard.tasksDone.push({ ...taskComplete });
        activeBoard.tasks = uncompleteTasks;
      }
      if (!status) {
        const [taskUncomplete] = activeBoard.tasksDone
          .filter((task) => task.taskId === taskId)
          .map((task) => ({ ...task, isDone: status }));
        const completeTasks = activeBoard.tasksDone.filter((task) => task.taskId !== taskUncomplete.taskId);
        activeBoard.tasks.push({ ...taskUncomplete });
        activeBoard.tasksDone = completeTasks;
      }
      boardToUpdate.tasksDone = activeBoard.tasksDone;
      boardToUpdate.tasks = activeBoard.tasks;
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
    filterUsersFromDB(state, action) {
      state.searchUsers = [...action.payload];
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
  removeTaskFromDB,
  createNewTask,
  createUserDataInDB,
  updateBoardTasksArraysDB,
  searchUsersByUsernameDB,
  sharedBoardWithUsers,
};
export const {
  addBoardToState,
  removeBoardFromState,
  addNewTaskToBoard,
  removeTaskFromBoard,
  setIsEditing,
  setEditingComplete,
  setActiveTodoBoard,
  setTaskStatus,
  filterUsersFromDB,
} = userSlice.actions;
export default userSlice.reducer;
