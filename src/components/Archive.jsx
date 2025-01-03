import React from "react";
import { FiPhoneIncoming, FiPhoneOutgoing } from "react-icons/fi";
import { BiSolidArchiveOut } from "react-icons/bi";

const Archive = ({
  archive,
  setIsArchived,
  fetchCallDetails,
  setIsDetailOpen,
}) => {
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
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
                      activity.call_type === "missed" ? "missed" : "answered"
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
                      activity.call_type === "missed" ? "missed" : "answered"
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
  );
};

export default Archive;
