import { useEffect, useRef, useState } from "react";
import style from "./Link.module.css";

const Link = ({ docId, title, url, onDelete, onUpdate }) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);

  const titleRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
    if (urlRef.current) {
      urlRef.current.focus();
    }
  }, [editTitle, editUrl]);

  const handleEditTitle = () => {
    setEditTitle(true);
  };

  const handleEditUrl = () => {
    setEditUrl(true);
  };

  const handleBlurUrl = (e) => {
    setEditUrl(false);
    onUpdate(docId, title, currentUrl);
  };
  const handleBlurTitle = (e) => {
    setEditTitle(false);
    onUpdate(docId, currentTitle, url);
  };

  return (
    <div className={style.link}>
      <div className={style.linkInfo}>
        <div className={style.linkTitle}>
          {editTitle ? (
            <>
              <input
                ref={titleRef}
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
                onBlur={handleBlurTitle}
              />
            </>
          ) : (
            <div>
              <button className={style.btnEdit} onClick={handleEditTitle}>
                <span className="material-icons">edit</span>
              </button>
              {currentTitle}
            </div>
          )}
        </div>

        <div className={style.linkUrl}>
          {editUrl ? (
            <>
              <input
                ref={urlRef}
                value={currentUrl}
                onChange={(e) => setCurrentUrl(e.target.value)}
                onBlur={handleBlurUrl}
              />
            </>
          ) : (
            <div>
              <button className={style.btnEdit} onClick={handleEditUrl}>
                <span className="material-icons">edit</span>
              </button>
              {currentUrl}
            </div>
          )}
        </div>
      </div>
      <div className={style.linkActions}>
        <button className={style.btnDelete} onClick={() => onDelete(docId)}>
          <span className="material-icons">delete</span>
        </button>
      </div>
    </div>
  );
};

export default Link;
