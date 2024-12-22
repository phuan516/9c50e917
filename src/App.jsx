import React from "react";
import { useState } from "react";
import { FaArchive, FaStar, FaRegClock } from "react-icons/fa";
import { MdOutlineContacts } from "react-icons/md";

import Header from "./components/Header.jsx";
import useActivities from "./hooks/useActivities.js";
import "./css/nav.css";

const App = () => {
  const [currentTab, setCurrentTab] = useState("recent");

  const { active, archive, callDetails, fetchCallDetails, setIsArchived } =
    useActivities();

  return (
    <div className="container">
      <Header />
      <div className="container-view">
        {currentTab === "recent" && (
          <>
            <button
              onClick={() => {
                active.forEach((activity) => {
                  setIsArchived(activity.id, true);
                });
              }}
            >
              archive all
            </button>
            <h2>Recent</h2>
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
              onClick={() => {
                archive.forEach((activity) => {
                  setIsArchived(activity.id, false);
                });
              }}
            >
              unarchive all
            </button>
            <h2>Archived</h2>
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
            setCurrentTab("recent");
          }}
        >
          <span className={`nav-icon ${currentTab === "recent" && "selected"}`}>
            <FaRegClock />
          </span>
          <span className="nav-label">Recent</span>
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
            <FaArchive />
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
