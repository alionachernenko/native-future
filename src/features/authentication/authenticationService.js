import { appVerifier, auth } from "../../config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const signUpUserWithEmailAndPassword = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

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

const signOutUser = async () => {
  const res = await signOut(auth);
  return res;
};

const authWithPhoneNumber = async (number) => {
  auth.useDeviceLanguage();

  window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
    size: "invisible",
    callback: (response) => {
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
        });
    },
  });
};

export const authenticationService = {
  signUpUserWithEmailAndPassword,
  signInUserWithEMailAndPassword,
  signOutUser,
};
