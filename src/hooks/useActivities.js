import { useState, useEffect } from "react";

const useActivities = () => {
  const [active, setActive] = useState([]);
  const [archive, setArchive] = useState([]);
  const [callDetails, setCallDetails] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch(
        "https://aircall-api.onrender.com/activities"
      );
      const data = await response.json();
      setActive(data.filter((activity) => activity.is_archived === false));
      setArchive(data.filter((activity) => activity.is_archived === true));
    } catch (error) {
      console.log("There was an error when fetching activities", error);
    }
  };

  const fetchCallDetails = async (id) => {
    try {
      const response = await fetch(
        `https://aircall-api.onrender.com/activities/${id}`
      );
      const data = await response.json();
      setCallDetails(data);
    } catch (error) {
      console.log("There was an error when fetching call details", error);
    }
  };

  const setIsArchived = async (id, isArchived) => {
    try {
      await fetch(`https://aircall-api.onrender.com/activities/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_archived: isArchived,
        }),
      }).then(fetchActivities);
    } catch (error) {
      console.log("There was an error when updating details", error);
    }
  };

  return {
    active,
    archive,
    callDetails,
    fetchCallDetails,
    setIsArchived,
  };
};

export default useActivities;
