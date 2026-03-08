import { addDoc, collection, doc, getDoc, getDocs, getFirestore, serverTimestamp, updateDoc } from "firebase/firestore";
import type { Task } from "../../types/task.interface";
import { app } from "../../firebase";

const db = getFirestore(app);

export const createTask = async (data: Task) => {
    const docRef = await addDoc(collection(db, 'tasks'), {
        ...data,
        createdAt: serverTimestamp(),
    });
    await updateDoc(docRef, {
        id: docRef.id
    });
    return docRef.id;
}

export const getTasksList = async () => {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    return querySnapshot.docs.map((doc) => {
        const data = doc.data() as Task;

        return data
    })
}

export const updateTask = async (
    id: string,
    data: Partial<Task>
) => {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, data);
    return { id, ...data };
};

export const getTaskById = async (id: string): Promise<Task | null> => {
    const taskRef = doc(db, "tasks", id);
    const snapshot = await getDoc(taskRef);

    if (!snapshot.exists()) {
        return null;
    }

    const data = snapshot.data() as Omit<Task, "id">;

    return {
        id: snapshot.id,
        ...data
    };
};