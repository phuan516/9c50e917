import React from "react";
import { useState } from "react";
import { FaStar, FaRegClock } from "react-icons/fa";
import { MdOutlineContacts } from "react-icons/md";
import { FiPhoneIncoming, FiPhoneOutgoing } from "react-icons/fi";

import {
  BiSolidArchive,
  BiSolidArchiveIn,
  BiSolidArchiveOut,
  BiArrowBack,
} from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

import Header from "./components/Header.jsx";
import useActivities from "./hooks/useActivities.js";
import "./css/nav.css";
import "./css/activity.css";

const App = () => {
  const [currentTab, setCurrentTab] = useState("Activity");
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { active, archive, callDetails, fetchCallDetails, setIsArchived } =
    useActivities();

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

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
            <ul className="call-list">
              {active.map((activity, index) => (
                <li key={index}>
                  <button
                    className="call"
                    onClick={() => {
                      fetchCallDetails(activity.id);
                      setIsDetailOpen(true);
                    }}
                  >
                    {activity.direction === "inbound" && (
                      <div>
                        <FiPhoneIncoming
                          size={20}
                          className={`call-icon ${
                            activity.call_type === "missed"
                              ? "missed"
                              : "answered"
                          }`}
                        />
                        <span>{activity.from}</span>
                      </div>
                    )}
                    {activity.direction === "outbound" && (
                      <div>
                        <FiPhoneOutgoing
                          size={20}
                          className={`call-icon ${
                            activity.call_type === "missed"
                              ? "missed"
                              : "answered"
                          }`}
                        />
                        <span>{activity.to}</span>
                      </div>
                    )}
                    <span>{formatTime(activity.duration)}</span>
                  </button>
                  <button
                    className="archive"
                    onClick={() => {
                      setIsArchived(activity.id, !activity.is_archived);
                    }}
                  >
                    <BiSolidArchiveIn size={20} />
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
            <ul className="call-list">
              {archive.map((activity, index) => (
                <li key={index}>
                  <button
                    className="call"
                    onClick={() => {
                      fetchCallDetails(activity.id);
                      setIsDetailOpen(true);
                    }}
                  >
                    {activity.direction === "inbound" && (
                      <div>
                        <FiPhoneIncoming
                          size={20}
                          className={`call-icon ${
                            activity.call_type === "missed"
                              ? "missed"
                              : "answered"
                          }`}
                        />
                        <span>{activity.from}</span>
                      </div>
                    )}
                    {activity.direction === "outbound" && (
                      <div>
                        <FiPhoneOutgoing
                          size={20}
                          className={`call-icon ${
                            activity.call_type === "missed"
                              ? "missed"
                              : "answered"
                          }`}
                        />
                        <span>{activity.to}</span>
                      </div>
                    )}
                    <span>{formatTime(activity.duration)}</span>
                  </button>
                  <button
                    className="archive"
                    onClick={() => {
                      setIsArchived(activity.id, !activity.is_archived);
                    }}
                  >
                    <BiSolidArchiveOut size={20} />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isDetailOpen ? 0 : "100%" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            background: "white",
            zIndex: 1000,
          }}
        >
          <div style={{ padding: "20px" }}>
            <button
              className="back-icon"
              onClick={() => {
                setIsDetailOpen(false);
              }}
            >
              <BiArrowBack size={20} />
            </button>
            <section>
              <h3>Call Details</h3>
              <p>
                Direction: <span>{callDetails?.direction}</span>
              </p>
              <p>
                From: <span>{callDetails?.from}</span>
              </p>
              <p>
                To: <span>{callDetails?.to}</span>
              </p>
              <p>
                Via: <span>{callDetails?.via}</span>
              </p>
            </section>
            <section>
              <h3>Call Status</h3>
              <p>
                Type: <span>{callDetails?.call_type}</span>
              </p>
              <p>
                Duration: <span>{callDetails?.duration} seconds</span>
              </p>
              <p>
                Archived: <span>{callDetails?.is_archived ? "Yes" : "No"}</span>
              </p>
            </section>
            <section>
              <h3>Metadata</h3>
              <p>
                Call ID: <span>{callDetails?.id}</span>
              </p>
              <p>
                Created:{" "}
                <span>
                  {new Date(callDetails?.created_at).toLocaleString()}
                </span>
              </p>
            </section>
          </div>
        </motion.div>
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
