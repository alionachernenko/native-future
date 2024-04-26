import { doc, getDoc } from "firebase/firestore";
import { db } from "../config";

const getUserDocument = async (uid) => {
  const user = await getDoc(doc(db, "users", uid));

  return user.data();
};

export const userService = {
  getUserDocument,
};
