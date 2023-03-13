import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  getUserInfo,
  registerNewUser,
  userExists,
} from "../firebase/firebase";

const AuthProvider = ({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
}) => {
  useEffect(() => {
    onAuthStateChanged(auth, handleUserStateChanged);
  }, []);

  const handleUserStateChanged = async (user) => {
    if (user) {
      const isRegistered = await userExists(user.uid);
      if (isRegistered) {
        const userInfo = await getUserInfo(user.uid);
        if (userInfo.processCompleted) {
          onUserLoggedIn(userInfo);
        } else {
          onUserNotRegistered(userInfo);
        }
      } else {
        await registerNewUser({
          uid: user.uid,
          displayName: user.displayName,
          profilePicture: "",
          username: "",
          processCompleted: false,
        });
        onUserNotRegistered(user);
      }
    } else {
      onUserNotLoggedIn();
    }
  };
  return <div>{children}</div>;
};

export default AuthProvider;
