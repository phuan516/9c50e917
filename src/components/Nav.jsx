import { FaStar, FaRegClock } from "react-icons/fa";
import { MdOutlineContacts } from "react-icons/md";
import { BiSolidArchive } from "react-icons/bi";

const Nav = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="bottom-nav">
      <div className="nav-item">
        <span className="nav-icon">
          <FaStar />
        </span>
        <span className="nav-label">Favorites</span>
      </div>
      <div
        className="nav-item"
        onClick={() => {
          setCurrentTab("Activity");
        }}
      >
        <span className={`nav-icon ${currentTab === "Activity" && "selected"}`}>
          <FaRegClock />
        </span>
        <span className="nav-label">Activity</span>
      </div>
      <div
        className="nav-item"
        onClick={() => {
          setCurrentTab("archive");
        }}
      >
        <span className={`nav-icon ${currentTab === "archive" && "selected"}`}>
          <BiSolidArchive />
        </span>
        <span className="nav-label">Archive</span>
      </div>
      <div className="nav-item">
        <span className="nav-icon">
          <MdOutlineContacts />
        </span>
        <span className="nav-label">Contact</span>
      </div>
    </div>
  );
};

export default Nav;
