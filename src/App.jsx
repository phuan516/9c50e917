import React from "react";

import Header from "./Header.jsx";
import useActivities from "./hooks/useActivities.js";

const App = () => {
  const { active, archive, callDetails, fetchCallDetails, setIsArchived } =
    useActivities();

  return (
    <div className="container">
      <Header />
      <div className="container-view">
        <button
          onClick={() => {
            active.forEach((activity) => {
              setIsArchived(activity.id, true);
            });
          }}
        >
          archive all
        </button>
        <button
          onClick={() => {
            archive.forEach((activity) => {
              setIsArchived(activity.id, false);
            });
          }}
        >
          unarchive all
        </button>
        <h2>Active</h2>
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
        <h2>Details</h2>
        {callDetails && <div>{JSON.stringify(callDetails)}</div>}
      </div>
    </div>
  );
};

export default App;
