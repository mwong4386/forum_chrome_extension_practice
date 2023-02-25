import styles from "./ScrollToBtn.module.css";

interface props {
  onClick?: () => void;
  visible?: boolean;
}
const ScrollToBtn = ({ onClick, visible }: props) => {
  return (
    <button
      className={`${styles["button"]} ${visible ? styles["visible"] : ""}`}
      onClick={onClick}
    >
      {/* <!-- Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools --> */}
      <svg
        fill="#000000"
        height="2rem"
        width="2rem"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 511.881 511.881"
        xmlSpace="preserve"
      >
        <g>
          <g>
            <g>
              <path
                d="M248.36,263.428c4.16,4.16,10.88,4.16,15.04,0L508.733,18.095c4.053-4.267,3.947-10.987-0.213-15.04
				c-4.16-3.947-10.667-3.947-14.827,0l-237.76,237.76L18.173,3.054C13.907-1.106,7.187-0.999,3.027,3.268
				c-3.947,4.16-3.947,10.667,0,14.827L248.36,263.428z"
              />
              <path
                d="M508.627,248.388c-4.267-4.053-10.773-4.053-14.933,0l-237.76,237.76l-237.76-237.76
				c-4.267-4.053-10.987-3.947-15.04,0.213c-3.947,4.16-3.947,10.667,0,14.827l245.333,245.333c4.16,4.16,10.88,4.16,15.04,0
				L508.84,263.428C512.893,259.161,512.787,252.441,508.627,248.388z"
              />
            </g>
          </g>
        </g>
      </svg>
    </button>
  );
};

export default ScrollToBtn;
