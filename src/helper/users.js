import { auth } from "@/firebase/configuration";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

export const login_user = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (!res.user) {
      return "User not founded" || false;
    }
    const token = await res.user.getIdToken(); // Ambil ID token dari Firebase
    localStorage.setItem("token", token);

    return res.user;
  } catch (err) {
    return { message: err.message };
  }
};

const logout_user = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("token");
    console.log("Logout berhasil, token dihapus!");
  } catch (error) {
    return { message: error.message };
  }
};

export const registration_user = async (username, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (!response.user) {
      return "User not founded!";
    }

    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    return response.user;
  } catch (err) {
    return { message: err.message };
  }
};
