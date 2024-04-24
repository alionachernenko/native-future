import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

const createUserDocument = async (name, email, id) => {
  const userDoc = await setDoc(doc(db, "users", id), {
    name,
    email,
  });

  return userDoc;
};

const signUpUserWithEmailAndPassword = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await createUserDocument(name, email, user.uid);
  return user;
};

const signInUserWithEMailAndPassword = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  return user;
};

const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  const user = result.user;

  return user;
};

const signInWithFacebook = async () => {
  const result = await signInWithPopup(auth, fbProvider);
  const user = result.user;
  const credential = FacebookAuthProvider.credentialFromResult(result);
  const accessToken = credential.accessToken;
};

const signInWithPhone = async (phoneNumber) => {
  const appVerifier = window.recaptchaVerifier;
  const confirmationResult = await signInWithPhoneNumber(
    auth,
    phoneNumber,
    appVerifier
  );

  return confirmationResult;
};

const signOutUser = async () => {
  const res = await signOut(auth);
  return res;
};

const createRecaptcha = (callback) => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "small",
      callback,
    }
  );
};

export const authenticationService = {
  signUpUserWithEmailAndPassword,
  signInUserWithEMailAndPassword,
  signOutUser,
  signInWithGoogle,
  signInWithFacebook,
  signInWithPhone,
  createRecaptcha,
};
