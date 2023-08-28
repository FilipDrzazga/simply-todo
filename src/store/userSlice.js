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
  writeBatch,
  onSnapshot,
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

    const querySharedBoard = await query(
      collection(db, "users", state.user.userData.userId, "sharedBoards"),
      where("sharedBoardId", "==", state.user.activeBoard[0].boardId)
    );
    const sharedBoardToRemove = await getDocs(querySharedBoard);
    sharedBoardToRemove.forEach((board) => {
      const boardRef = doc(db, "users", state.user.userData.userId, "sharedBoards", board.id);
      deleteDoc(boardRef);
    });

    const receiverSharedBoardToRemove = await getDocs(querySharedBoard);
    receiverSharedBoardToRemove.forEach((board) => {
      const { sharedWith } = board.data();
      sharedWith.forEach(async (field) => {
        if (field.userId) {
          const queryBoardToRemove = await query(
            collection(db, "users", field.userId, "sharedBoardsBy"),
            where("sharedBoardId", "==", state.user.activeBoard[0].boardId)
          );
          const boardRef = await getDocs(queryBoardToRemove);
          boardRef.docs.forEach((board) => {
            deleteDoc(doc(db, "users", field.userId, "sharedBoardsBy", board.id));
          });
        }
      });
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

    const querySharedBoards = await query(
      collection(db, "users", userId, "sharedBoardsBy"),
      where("invitationStatus", "==", "fulfilled")
    );
    const sharedBoardsRef = await getDocs(querySharedBoards);
    const sharedBoardPromises = sharedBoardsRef.docs.map(async (doc) => {
      const { sharedBoardId } = doc.data();
      const querySharedBoards = await query(collection(db, "usersTodos"), where("boardId", "==", sharedBoardId));
      const querySharedBoardsRef = await getDocs(querySharedBoards);
      return querySharedBoardsRef.docs.map((board) => ({ ...board.data(), isSharedBoard: true }));
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
      sharedWith: arrayUnion({ ...user }),
      invitationStatus: "pending",
    });

    const sharingUserDataRef = doc(db, "users", user.userId);
    const sharingSubcollectionRef = collection(sharingUserDataRef, "sharedBoardsBy");
    await addDoc(sharingSubcollectionRef, {
      invitationDate: serverTimestamp(),
      invitationStatus: "pending",
      isNewInvitation: true,
      isInvitationClear: false,
      sharedBoardId: state.user.activeBoard[0].boardId,
      sharedBoardName: state.user.activeBoard[0].boardName,
      sharedByUserId: state.user.userData.userId,
      sharedByUsername: state.user.userData.username,
    });
  } catch (error) {
    console.log("error from sharedBoardWithUsers", error.message);
  }
});

const queryAllSharedBoardsBy = createAsyncThunk("user/queryAllSharedBoardsBy", async (userId, { dispatch }) => {
  try {
    const queryBoards = await query(
      collection(db, "users", userId, "sharedBoardsBy"),
      where("isInvitationClear", "==", false)
    );
    const boardsRef = await getDocs(queryBoards);
    const boardsArray = boardsRef.docs.map((notification) => ({ ...notification.data() }));
    const convertedBoards = boardsArray.map((notification) => ({
      ...notification,
      invitationDate: JSON.stringify(notification.invitationDate.toMillis()),
    }));
    dispatch(setSharedBoardsBy(convertedBoards));
    dispatch(setInvitationAlert(convertedBoards));
  } catch (error) {
    console.log("error from ueryNotifications", error.message);
  }
});

const deleteInvitations = createAsyncThunk("user/deleteInvitations", async (userId, { dispatch }) => {
  dispatch(clearInvitationInState());
  try {
    const querySharedBoards = await query(
      collection(db, "users", userId, "sharedBoardsBy"),
      where("isInvitationClear", "==", false)
    );
    const batch = writeBatch(db);
    const boardsRef = await getDocs(querySharedBoards);
    boardsRef.forEach((doc) => {
      console.log(doc.data());
      batch.update(doc.ref, { isInvitationClear: true });
    });
    await batch.commit();
  } catch (error) {
    console.log("error from clearIvitation", error.message);
  }
});

const clearNewInvitation = createAsyncThunk("user/clearNewInvitation", async (userId, { dispatch }) => {
  try {
    const querySharedBoards = await query(
      collection(db, "users", userId, "sharedBoardsBy"),
      where("isNewInvitation", "==", true)
    );
    const batch = writeBatch(db);
    const boardsRef = await getDocs(querySharedBoards);
    boardsRef.forEach((doc) => {
      batch.update(doc.ref, { isNewInvitation: false });
    });
    await batch.commit();
  } catch (error) {
    console.log("error from clearNewInvitation", error.message);
  }
});

const updateInvitationStatus = createAsyncThunk(
  "user/updateInvitationStatus",
  async ({ userId, senderUserId, boardId, status }, { dispatch }) => {
    try {
      const querySharedBoards = await query(
        collection(db, "users", userId, "sharedBoardsBy"),
        where("sharedBoardId", "==", boardId)
      );
      const updateSenderInvitations = await query(
        collection(db, "users", senderUserId, "sharedBoards"),
        where("sharedBoardId", "==", boardId)
      );
      const boardRef = await getDocs(querySharedBoards);
      boardRef.forEach((board) => {
        updateDoc(board.ref, { invitationStatus: status });
      });
      const senderBoardRef = await getDocs(updateSenderInvitations);
      senderBoardRef.forEach((board) => {
        updateDoc(board.ref, { invitationStatus: status });
      });
      dispatch(setInvitationStatus({ boardId, status }));
    } catch (error) {
      console.log("error from updateInvitationStatus", error.message);
    }
  }
);

const leaveAndRemoveSharedBoard = createAsyncThunk(
  "user/leaveAndRemoveSharedBoard",
  async ({ userId, senderUserId, boardId, boardName }, { dispatch }) => {
    const queryBoardToRemove = await query(
      collection(db, "users", userId, "sharedBoardsBy"),
      where("sharedBoardId", "==", boardId)
    );
    const boardRef = await getDocs(queryBoardToRemove);
    boardRef.docs.forEach((board) => {
      deleteDoc(doc(db, "users", userId, "sharedBoardsBy", board.id));
    });

    const querySenderBoardToRemove = await query(
      collection(db, "users", senderUserId, "sharedBoards"),
      where("sharedBoardId", "==", boardId)
    );

    const boardSenderRef = await getDocs(querySenderBoardToRemove);
    boardSenderRef.docs.forEach((board) => {
      deleteDoc(doc(db, "users", senderUserId, "sharedBoards", board.id));
    });

    dispatch(removeBoardFromState({ name: boardName }));
  }
);

const queryAcceptSharedBoard = createAsyncThunk("user/queryAcceptSharedBoard", async (boardId, { dispatch }) => {
  try {
    const docRef = await query(collection(db, "usersTodos"), where("boardId", "==", boardId));
    const docSnap = await getDocs(docRef);
    docSnap.forEach((doc) => {
      const data = { ...doc.data() };
      const convertData = { ...data, createdAt: JSON.stringify(data.createdAt.toMillis()) };
      dispatch(addBoardToState(convertData));
    });
  } catch (error) {
    console.log("error from queryAcceptSharedBoard", error.message);
  }
});

const startSubscriptionTodos = createAsyncThunk("user/startSubscriptionTodos", async (userId, { dispatch }) => {
  try {
    const querySharedBoards = await query(
      collection(db, "users", userId, "sharedBoards"),
      where("invitationStatus", "==", "fulfilled")
    );

    const querySharedBoardsBy = await query(
      collection(db, "users", userId, "sharedBoardsBy"),
      where("invitationStatus", "==", "fulfilled")
    );

    const sharedBoardsRef = await getDocs(querySharedBoards);
    sharedBoardsRef.docs.map(async (board) => {
      const { sharedBoardId } = board.data();
      const queryBoard = await query(collection(db, "usersTodos"), where("boardId", "==", sharedBoardId));
      const unsubscribe = onSnapshot(queryBoard, (querySnapshot) => {
        const board = [];
        querySnapshot.forEach((doc) => {
          const data = { ...doc.data() };
          const convertData = { ...data, createdAt: JSON.stringify(data.createdAt.toMillis()) };
          board.push(convertData);
        });
        dispatch(getRealtimeDataTodos(board));
      });
    });
    const sharedBoardsByRef = await getDocs(querySharedBoardsBy);
    sharedBoardsByRef.docs.map(async (board) => {
      const { sharedBoardId } = board.data();
      const queryBoard = await query(collection(db, "usersTodos"), where("boardId", "==", sharedBoardId));
      const unsubscribe = onSnapshot(queryBoard, (querySnapshot) => {
        const board = [];
        querySnapshot.forEach((doc) => {
          const data = { ...doc.data() };
          const convertData = { ...data, createdAt: JSON.stringify(data.createdAt.toMillis()) };
          board.push(convertData);
        });
        dispatch(getRealtimeDataTodos(board));
      });
    });
  } catch (error) {
    console.log("error from startSubscriptionTodos", error.message);
  }
});

const initialState = {
  userData: "",
  userTodos: "",
  activeBoard: "",
  searchUsers: [],
  sharedBoardsBy: [],
  isNewInvitation: false,
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
    setInvitationAlert(state, action) {
      if (action.payload) {
        const isNew = action.payload.some((invitation) => invitation.isNewInvitation === true);
        state.isNewInvitation = isNew;
      } else {
        state.isNewInvitation = false;
      }
    },
    clearInvitationInState(state, action) {
      state.sharedBoardsBy = [];
    },
    setSharedBoardsBy(state, action) {
      state.sharedBoardsBy = action.payload;
    },
    setInvitationStatus(state, action) {
      state.sharedBoardsBy = state.sharedBoardsBy.map((board) => {
        if (board.sharedBoardId === action.payload.boardId) {
          return { ...board, invitationStatus: action.payload.status };
        }
        return board;
      });
    },
    getRealtimeDataTodos(state, action) {
      const updatedTodos = state.userTodos.map((boardToUpdate) => {
        const updatedBoard = action.payload.find((board) => board.boardId === boardToUpdate.boardId);
        return updatedBoard ? Object.assign(boardToUpdate, updatedBoard) : boardToUpdate;
      });
      const updatedActiveBoard = state.activeBoard.map((boardToUpdate) => {
        const updatedBoard = action.payload.find((board) => board.boardId === boardToUpdate.boardId);
        return updatedBoard ? Object.assign(boardToUpdate, updatedBoard) : boardToUpdate;
      });
      state.activeBoard = updatedActiveBoard;
      state.userTodos = updatedTodos;
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
  queryAllSharedBoardsBy,
  deleteInvitations,
  clearNewInvitation,
  updateInvitationStatus,
  queryAcceptSharedBoard,
  startSubscriptionTodos,
  leaveAndRemoveSharedBoard,
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
  setInvitationAlert,
  clearInvitationInState,
  setSharedBoardsBy,
  setInvitationStatus,
  getRealtimeDataTodos,
} = userSlice.actions;
export default userSlice.reducer;
