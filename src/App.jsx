import React from "react";
import { useState } from "react";
import { FaStar, FaRegClock } from "react-icons/fa";
import { MdOutlineContacts } from "react-icons/md";
import {
  BiSolidArchive,
  BiSolidArchiveIn,
  BiSolidArchiveOut,
} from "react-icons/bi";

import Header from "./components/Header.jsx";
import useActivities from "./hooks/useActivities.js";
import "./css/nav.css";
import "./css/activity.css";

const App = () => {
  const [currentTab, setCurrentTab] = useState("Activity");

  const { active, archive, callDetails, fetchCallDetails, setIsArchived } =
    useActivities();

  return (
    <div className="container">
      <Header />
      <div className="container-view">
        {currentTab === "Activity" && (
          <>
            <button
              className="archive-all"
              onClick={() => {
                active.forEach((activity) => {
                  setIsArchived(activity.id, true);
                });
              }}
            >
              <span className="archive-all-icon">
                <BiSolidArchiveIn size={20} />
              </span>
              <span className="archive-label">Archive all calls</span>
            </button>
            <h3>Activity</h3>
            <ul>
              {active.map((activity, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      fetchCallDetails(activity.id);
                    }}
                  >
                    {activity.id}
                  </button>
                  <button
                    onClick={() => {
                      setIsArchived(activity.id, !activity.is_archived);
                    }}
                  >
                    Archive
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
        {currentTab === "archive" && (
          <>
            <button
              className="archive-all"
              onClick={() => {
                archive.forEach((activity) => {
                  setIsArchived(activity.id, false);
                });
              }}
            >
              <span className="archive-all-icon">
                <BiSolidArchiveOut size={20} />
              </span>
              <span className="archive-label">Unarchive all calls</span>
            </button>
            <h3>Archived</h3>
            <ul>
              {archive.map((activity, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      fetchCallDetails(activity.id);
                    }}
                  >
                    {activity.id}
                  </button>
                  <button
                    onClick={() => {
                      setIsArchived(activity.id, !activity.is_archived);
                    }}
                  >
                    Unarchived
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {currentTab === "details" && (
          <>
            <h2>Details</h2>
            {callDetails && <div>{JSON.stringify(callDetails)}</div>}
          </>
        )}
      </div>
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
          <span
            className={`nav-icon ${currentTab === "Activity" && "selected"}`}
          >
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
          <span
            className={`nav-icon ${currentTab === "archive" && "selected"}`}
          >
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
    </div>
  );
};

export default App;
