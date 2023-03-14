import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import {
  getProfilePhotoUrl,
  setUserProfilePhoto,
  updateUser,
} from "../firebase/firebase";

import style from "./EditProfile.module.css";

const EditProfileView = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [currentState, setCurrentState] = useState("LOADING");
  const [profileUrl, setProfileUrl] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const fileRef = useRef(null);
  const handleUserLoggedIn = async (user) => {
    setCurrentUser(user);
    const url = await getProfilePhotoUrl(user.profilePicture);
    setProfileUrl(url);
    setCurrentState("COMPLETED");
  };
  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };
  const hanldeUserNotLoggedIn = () => {
    navigate("/login");
  };
  const handleOpenFilePicker = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };
  const handleChangeFile = (e) => {
    const files = e.target.files;
    const fileReader = new FileReader();

    if (fileReader && files.length) {
      setLoadingImage(true);
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async () => {
        const imageData = fileReader.result;

        const res = await setUserProfilePhoto(currentUser.uid, imageData);

        if (res) {
          const tmpUser = { ...currentUser };
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser);
          setCurrentUser({ ...tmpUser });

          const url = await getProfilePhotoUrl(currentUser.profilePicture);
          setProfileUrl(url);
          setLoadingImage(false);
        }
      };
    }
  };

  if (currentState === "LOADING") {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={hanldeUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
      >
        Loading...
      </AuthProvider>
    );
  }

  return (
    <DashboardWrapper>
      <div>
        <h2>Edita tu Perfil</h2>
        <div className={style.profilePictureContainer}>
          <div>
            {loadingImage ? (
              <p>Loading...</p>
            ) : (
              <img src={profileUrl} alt="foto-de-perfil" width={100} />
            )}
          </div>
          <div>
            <button className="btn" onClick={handleOpenFilePicker}>
              Choose new profile picture
            </button>
            <input
              ref={fileRef}
              type="file"
              className={style.fileInput}
              onChange={handleChangeFile}
            />
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default EditProfileView;
