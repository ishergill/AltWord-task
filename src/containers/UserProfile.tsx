"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// !apis
import { getUserAssignmentScore } from "../services/app.api";

// !3rd party
import ProgressBar from "@ramonak/react-progress-bar";

// !ASSETS
import { play } from "@/assets";

// !components
import Loading from "../components/Loading";

interface Score {
  score_type: string;
  user_score: number;
  max_score: number;
}

interface UserAssignmentData {
  full_name: string;
  email: string;
  score: number;
  scores: Score[];
  about_me: string;
  experience: string;
  hobbies: string;
  introduction: string;
}

function UserProfile() {
  const [userAssignmentData, setUserAssignmentData] =
    useState<UserAssignmentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserAssignmentData = async () => {
    try {
      const response: UserAssignmentData = await getUserAssignmentScore("assignment123");
      setUserAssignmentData(response);
    } catch (error: any) {
      setError(error.message ?? "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAssignmentData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="UserProfile">
      <div className="UserProfile__left">
        <div className="UserProfile__left__top">
          <div className="UserProfile__left__top__user">
            <Image
              src={
                "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXIlMjBncmFkaWVudHxlbnwwfHwwfHx8MA%3D%3D"
              }
              alt={userAssignmentData?.email || "User Image"}
              height={50}
              width={50}
            />
            <div>
              <h6>{userAssignmentData?.full_name}</h6>
              <p>{userAssignmentData?.email}</p>
            </div>
          </div>
          <h2
            style={{
              color: (userAssignmentData?.score ?? 0) > 50 ? "#2ebd59" : "#ecb22e",
            }}
          >
            {userAssignmentData?.score}%
          </h2>
        </div>
        <div className="UserProfile__left__stats">
          {userAssignmentData?.scores?.map((score, index) => (
            <div className="UserProfile__left__stats__item" key={index}>
              <h2>{score?.score_type}</h2>
              <div className="UserProfile__left__stats__item__value">
                <ProgressBar
                  completed={score?.user_score}
                  maxCompleted={score?.max_score}
                  isLabelVisible={false}
                  baseBgColor="#e2e8f0"
                  bgColor={score?.user_score > 6.5 ? "#2ebd59" : "#ecb22e"}
                  height="7px"
                  animateOnRender={true}
                />
                <h3
                  style={{
                    color: score?.user_score > 6.5 ? "#2ebd59" : "#ecb22e",
                  }}
                >
                  {score?.user_score} / {score?.max_score}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="UserProfile__left__list">
          <div className="UserProfile__left__list__item">
            <h3>About</h3>
            <p>
              {userAssignmentData?.about_me} {userAssignmentData?.about_me}
            </p>
          </div>
          <div className="UserProfile__left__list__item">
            <h3>Experience</h3>
            <p>{userAssignmentData?.experience}</p>
          </div>
          <div className="UserProfile__left__list__item">
            <h3>Hobbies</h3>
            <p>{userAssignmentData?.hobbies}</p>
          </div>
          <div className="UserProfile__left__list__item">
            <h3>Introduction</h3>
            <p>
              {userAssignmentData?.introduction}{" "}
              {userAssignmentData?.introduction}
            </p>
          </div>
        </div>
        <button>SHORTLIST</button>
      </div>

      <div className="UserProfile__right">
        <Image
          src={
            "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXIlMjBncmFkaWVudHxlbnwwfHwwfHx8MA%3D%3D"
          }
          height={500}
          width={350}
          alt="user-video"
        />
        <Image
          className="UserProfile__right__playBtn"
          src={play}
          alt="play"
          height={48}
          width={48}
        />
      </div>
    </div>
  );
}

export default UserProfile;
