import { useState } from "react";
import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import DashboardWrapper from "../components/DashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import { insertNewLink } from "../firebase/firebase";

const DashboardView = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [currentState, setCurrentState] = useState("LOADING");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const handleUserLoggedIn = (user) => {
    setCurrentUser(user);
    setCurrentState("COMPLETED");
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

  if (currentState === "LOADING") {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={hanldeUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
      >
        Loading
      </AuthProvider>
    );
  }

  return (
    <DashboardWrapper>
      <div>
        <h2>Dashboard</h2>
        <form onSubmit={handleOnSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            onChange={handleOnChange}
            value={title}
          />
          <label htmlFor="url">Url</label>
          <input type="text" name="url" onChange={handleOnChange} value={url} />
          <input type="submit" value="Create a new link" />
        </form>

        <div>
          {links.map((link) => (
            <div key={link.id}>
              <a href={link.url} target="_blank">
                {link.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default DashboardView;
