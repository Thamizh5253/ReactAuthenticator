import { useState, useEffect } from "react";
import React from "react";
import "./like.css";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Like = () => {
  const [likes, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = async () => {
    // console.log(likes);
    if (!isLiked) {
      setIsLiked(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/increment-like",
          likes
        );
        // console.log(response.data.likes);
        if (response.status === 200) {
          // console.log(response.data.like);
          setLikeCount(response.data.like);

          toast.success("😍 Thank You for Your Like", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
          });
        }
      } catch (error) {
        toast.error("🪲 There is a BUG in backend", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      }
    } else {
      toast.warn("❤️ Thanks!, But You Already Liked this", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    }
  };

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/like-count");
        // console.log(response);
        const data = await response.json();
        setLikeCount(data.likes);
      } catch (error) {
        toast.error("🪲 There is a BUG in Getting Like-Count", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      }
    };

    fetchLikeCount();
  }, []);

  return (
    <div className="container">
      <div className="head">
        <h2>You are Successfully Loged In</h2>
      </div>
      <div className="like">Did You Like This?</div>
      <div className="likebtn">
        <button className="btn" onClick={handleLikeClick}>
          <span role="img" aria-label="like">
            👍
            {likes}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Like;
