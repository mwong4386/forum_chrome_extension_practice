import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

interface Props {
  toggleSidebar: () => void;
  renderRight: ReactNode;
  renderTitle: ReactNode;
}
const Header = ({ toggleSidebar, renderRight, renderTitle }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className={styles["header"]}>
      <div className={styles["header-left"]}>
        {location.pathname !== "/" && (
          <button onClick={() => navigate(-1)}>
            {/* <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> */}
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              viewBox="0 0 52 52"
              enable-background="new 0 0 52 52"
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M34.2,47.7L13.4,27.2c-0.6-0.6-0.6-1.6,0-2.2L34.2,4.5c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2
		c0.6,0.6,0.6,1.6,0,2.2L22.1,25c-0.6,0.6-0.6,1.6,0,2.2l16.3,16.1c0.6,0.6,0.6,1.6,0,2.2l-2.2,2.2C35.7,48.2,34.8,48.2,34.2,47.7z"
                />
              </g>
            </svg>
          </button>
        )}
        <button className={styles["toggle-button"]} onClick={toggleSidebar}>
          {/* <!-- Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools --> */}
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <g fill="#000000">
              <path d="M1 3.75A.75.75 0 011.75 3h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 3.75zM1 7.75A.75.75 0 011.75 7h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 7.75zM1.75 11a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H1.75z" />
            </g>
          </svg>
        </button>

        <Link to="/">
          <div className={styles["app-name"]}>Glur</div>
        </Link>
      </div>
      <div className={styles["header-center"]}>{renderTitle}</div>
      <div className={styles["header-right"]}>{renderRight}</div>
    </div>
  );
};

export default Header;
