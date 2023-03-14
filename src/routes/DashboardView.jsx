import { useState } from "react";
import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import DashboardWrapper from "../components/DashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import {
  deleteLink,
  getLinks,
  insertNewLink,
  updateLink,
} from "../firebase/firebase";
import Link from "../components/Link";

import style from "./DashboardView.module.css";
import styleLinks from "../components/Link.module.css";

const DashboardView = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [currentState, setCurrentState] = useState("LOADING");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  const handleUserLoggedIn = async (user) => {
    setCurrentUser(user);
    setCurrentState("COMPLETED");
    const resLinks = await getLinks(user.uid);
    setLinks([...resLinks]);
  };
  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };
  const hanldeUserNotLoggedIn = () => {
    navigate("/login");
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    addLink();
  };

  const addLink = () => {
    if (title && url) {
      const newLink = {
        title,
        url,
        id: uuidv4(),
        uid: currentUser.uid,
      };

      const res = insertNewLink(newLink);
      newLink.docId = res.id;
      setUrl("");
      setTitle("");
      setLinks([...links, newLink]);
    }
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    if (e.target.name === "title") {
      setTitle(value);
    }

    if (e.target.name === "url") {
      setUrl(value);
    }
  };

  const handleUpdateLink = async (docId, title, url) => {
    const link = links.find((item) => item.docId === docId);
    link.title = title;
    link.url = url;
    await updateLink(docId, link);
  };

  const handleDeleteLink = async (docId) => {
    await deleteLink(docId);
    const tmp = links.filter((link) => link.docId !== docId);
    setLinks([...tmp]);
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
        <h2>Dashboard</h2>
        <form onSubmit={handleOnSubmit} className={style.entryContainer}>
          <label htmlFor="title">Title</label>
          <input
            className="input"
            type="text"
            name="title"
            onChange={handleOnChange}
            value={title}
          />
          <label htmlFor="url">Url</label>
          <input
            className="input"
            type="text"
            name="url"
            onChange={handleOnChange}
            value={url}
          />
          <input className="btn" type="submit" value="Create a new link" />
        </form>

        <div className={styleLinks.linksContainer}>
          {links.map((link) => (
            <Link
              key={link.id}
              url={link.url}
              title={link.title}
              docId={link.docId}
              onDelete={handleDeleteLink}
              onUpdate={handleUpdateLink}
            />
          ))}
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default DashboardView;
