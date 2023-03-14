import style from "./PublicLink.module.css";

const PublicLink = ({ url, title }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={style.publicLinkContainer}
    >
      <div>{title}</div>
    </a>
  );
};

export default PublicLink;
