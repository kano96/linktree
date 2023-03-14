import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  existsUsername,
  getProfilePhotoUrl,
  getUserPublicInfo,
} from "../firebase/firebase";
import PublicLink from "../components/PublicLink";

import style from "./PublicProfile.module.css";

const PublicProfileView = () => {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState("");
  const [currentState, setCurrentState] = useState("LOADING");

  useEffect(() => {
    const username = params.username;
    const getProfile = async () => {
      try {
        const userUid = await existsUsername(username);

        if (userUid) {
          setCurrentState("COMPLETED");
          const userInfo = await getUserPublicInfo(userUid);

          setProfile(userInfo);

          const url = await getProfilePhotoUrl(
            userInfo.profileInfo.profilePicture
          );
          setUrl(url);
        } else {
          setCurrentState("NON_EXISTENT_USER");
        }
      } catch (error) {}
    };
    getProfile();
  }, []);

  if (currentState === "NON_EXISTENT_USER") {
    return (
      <div>
        <h2>Usuario no existe</h2>
      </div>
    );
  }

  if (currentState === "LOADING") {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className={style.profileContainer}>
      <div className={style.profilePicture}>
        <img src={url} alt="profile-img" width={200} />
      </div>

      <h2>Username: {profile?.profileInfo.username}</h2>
      <h3>Displayname: {profile?.profileInfo.displayName}</h3>

      <div className={style.publicLinksContainer}>
        {profile?.linksInfo.map((link) => (
          <PublicLink key={link.id} url={link.url} title={link.title} />
        ))}
      </div>
    </div>
  );
};

export default PublicProfileView;
