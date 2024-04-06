import React from "react";

// !containers
import JobProfile from "./JobProfile";
import UserProfie from "./UserProfile";

function Right() {

  return (
    <div className="right">
      <div className="right__top">
        <p>
          Pages <span>/ Assignment</span>
        </p>
        <h2>Sales BDE</h2>
      </div>
      <div className="right__content">
        <JobProfile />
        <UserProfie />
      </div>
    </div>
  );
}

export default Right;
