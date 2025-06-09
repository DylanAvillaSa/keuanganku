import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/configuration";

export const addData = async (formInput) => {
  try {
    const res = await addDoc(collection(db, "my-money"), {
      ...formInput,
    });

    return res;
  } catch (err) {
    return { message: err.message };
  }
};
