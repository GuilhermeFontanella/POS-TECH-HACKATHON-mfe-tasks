import { doc, getDoc,  getFirestore, updateDoc } from "firebase/firestore";
import { app } from "../firebase";
const db = getFirestore(app);

export const getSettings = async () => {
    const docRef = doc(db, 'preferences', 'configs');
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
        return snapshot.data();
    }

    return null;
}

export const updateSettings = async (data: any) => {
    const docRef = doc(db, 'preferences', 'configs');
    await updateDoc(docRef, data);

    return true;
};
