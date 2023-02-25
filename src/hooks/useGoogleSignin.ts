import {
  GoogleAuthProvider,
  signInWithCredential,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

const useGoogleSignin = () => {
  const [user, setUser] = useState<any>(undefined);
  const [isSignInIng, setisSignInIng] = useState(false);
  const signIn = () => {
    setisSignInIng(true);
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        alert(
          `SSO ended with an error: ${JSON.stringify(chrome.runtime.lastError)}`
        );
        return;
      }

      signInWithCredential(
        auth,
        GoogleAuthProvider.credential(null, token)
      ).catch((err) => {
        alert(`SSO ended with an error: ${err}`);
      });
    });
  };

  const signOut = () => {
    auth.signOut();
  };

  const updateDisplayName = async (displayName: string): Promise<boolean> => {
    if (auth.currentUser === null) return false;
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    return true;
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setisSignInIng(false);
      setUser(user && user.uid ? user : null);
    });
  }, []);

  return {
    isLoading: user === undefined || isSignInIng, // when user is undefined, it means we are still loading the user. If it is null, it means the user is not logged in.
    isLogin: !!user,
    user,
    signIn,
    signOut,
    updateDisplayName,
  };
};

export default useGoogleSignin;
