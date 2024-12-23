import React from "react";
import { useState } from "react";

import Header from "./components/Header.jsx";
import Recent from "./components/Recent.jsx";
import Archive from "./components/Archive.jsx";
import Detail from "./components/Detail.jsx";
import Nav from "./components/Nav.jsx";
import useActivities from "./hooks/useActivities.js";

import "./css/index.css";
import "./css/app.css";
import "./css/calls.css";
import "./css/nav.css";

const App = () => {
  const [currentTab, setCurrentTab] = useState("Activity");
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { active, archive, callDetails, fetchCallDetails, setIsArchived } =
    useActivities();

  return (
    <div className="container">
      <Header />
      <div className="container-view">
        {currentTab === "Activity" && (
          <Recent
            active={active}
            setIsArchived={setIsArchived}
            fetchCallDetails={fetchCallDetails}
            setIsDetailOpen={setIsDetailOpen}
          />
        )}
        {currentTab === "archive" && (
          <Archive
            archive={archive}
            setIsArchived={setIsArchived}
            fetchCallDetails={fetchCallDetails}
            setIsDetailOpen={setIsDetailOpen}
          />
        )}
        <Detail
          callDetails={callDetails}
          isDetailOpen={isDetailOpen}
          setIsDetailOpen={setIsDetailOpen}
        />
      </div>
      <Nav currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
};

export default App;
