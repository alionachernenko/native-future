import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../config";
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
import { getDownloadURL, ref } from "firebase/storage";

const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

const createUserDocument = async (name, email, id) => {
  const userDoc = await setDoc(doc(db, "users", id), {
    name,
    email,
  });


  return userDoc;
};

const updateUserDocument = async (id, data) => {
  // console.log({id, data})
  const userDoc = await updateDoc(doc(db, "users", id), data);

  return userDoc;
};

const createProfile = async (id, data) => {
  const avatarId = data.avatar.id;
  const avatarRef = ref(storage, `default_avatars/${avatarId}.png`);

  const url = await getDownloadURL(ref(storage, avatarRef));

  await updateUserDocument(id, { ...data, avatar: url });
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
  updateUserDocument,
  createProfile,
};
