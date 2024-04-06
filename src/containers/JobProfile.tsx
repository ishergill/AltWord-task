"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// !apis
import {
  getAssignmentDetails,
  getAssignmentSubmissions,
} from "../services/app.api";

// !assets
import { edit, review, shorlisted } from "@/assets";

// !utils
import { secondsToHours, formatDate } from "../utils/utils";

// !components
import Loading from '../components/Loading'

interface Button {
  id: number;
  name: string;
  icon: any;
}

interface Assignment {
  id: number;
  title: string;
  status: string;
  link: string;
  duration_in_seconds: number;
  ends_at: string;
}

interface Submission {
  id: number;
  image?: string;
  full_name: string;
  email: string;
  score: number;
}


function JobProfile() {
  const [assignmentData, setAssignmentData] = useState<Assignment | null>(null);
  const [allSubmissions, setAllSubmissions] = useState<Submission[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
    const btns: Button[] = [
      {
        id: 1,
        name: "TO REVIEW",
        icon: review,
      },
      {
        id: 2,
        name: "SHORTLISTED",
        icon: shorlisted,
      },
    ];
  
  
    const fetchAssignmentDetails = async () => {
      try {
        const response = await getAssignmentDetails();
        setAssignmentData(response);
      } catch (error) {
        setError("Failed to fetch assignment details");
      }
    };
  
    const fetchAssignmentSubmissions = async () => {
      try {
        const response = await getAssignmentSubmissions();
        setAllSubmissions(response);
      } catch (error) {
        setError("Failed to fetch assignment submissions");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchAssignmentDetails();
      fetchAssignmentSubmissions();
    }, []);
  
  
  
    return (
      <div className="JobProfile">
        {loading && 
        <Loading/>
        }
        {error && <p>{error}</p>}
        {assignmentData && (
          <div className="JobProfile__top">
            <div className="JobProfile__top__title">
              <h2>{assignmentData?.title}</h2>
              <div className="JobProfile__top__title__right">
                <h2>{assignmentData?.status}</h2>
                <span>
                  <Image src={edit} alt="edit" height={24} width={24} />
                </span>
              </div>
            </div>
            <div className="JobProfile__top__item">
              <p>Assignment Links</p>
              <Link href={assignmentData?.link}>{assignmentData?.link}</Link>
            </div>
            <div className="JobProfile__top__item">
              <p>Assignment Hours</p>
              <p>{secondsToHours(assignmentData.duration_in_seconds)}</p>
            </div>
            <div className="JobProfile__top__item">
              <p>Assignment End at</p>
              <p>{formatDate(assignmentData.ends_at)}</p>
            </div>
            <div className="JobProfile__top__btns">
              {btns.map((btn) => (
                <button
                  key={btn.id}
                  style={{
                    boxShadow:
                      btn.id === 1 ? "1px 1px 3px 0.5px rgb(0 0 0 / 20%)" : '0',
                  }}
                >
                  <Image src={btn.icon} height={24} width={24} alt="review" />
                  <p>{btn.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}
        {allSubmissions && (
          <div className="JobProfile__list">
            <table>
              <thead>
                <tr>
                  <th>CANDIDATE</th>
                  <th>SCORE</th>
                </tr>
              </thead>
              <tbody>
                {allSubmissions?.map((el) => (
                  <tr key={el.id}>
                    <td>
                      <div className="JobProfile__list__item">
                        <Image
                          src={
                            "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXIlMjBncmFkaWVudHxlbnwwfHwwfHx8MA%3D%3D"
                          }
                          height={32}
                          width={32}
                          alt={el.full_name}
                        />
                        <div>
                          <h6>{el.full_name}</h6>
                          <p>{el.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h6
                        style={{ color: el.score > 50 ? "#40c167" : "#ecb331" }}
                      >
                        {el.score}%
                      </h6>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
  
  export default JobProfile;


