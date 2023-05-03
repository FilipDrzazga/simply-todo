import { db, collection, addDoc } from '../firebase/firebase';

const createBoardForNewUser = async (data) => {
    try {
        await addDoc(collection(db, 'usersTodos'), {
            userId: data.userId,
            boardName: 'My task',
            tasks: [{
                taskName: 'Add new task',
                isDone: false
            }, {
                taskName: 'Add new board',
                isDone: false
            }],
            tasksDone: [{}]
        });
    } catch (error) {
        console.log(error.message);
    }
};

export { createBoardForNewUser };