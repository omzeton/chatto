import React, { useState } from "react";

import "./Avatar.css";

const Avatar = props => {
  const [previewImage, setPreviewImage] = useState(undefined);
  const [avatarData, setAvatarData] = useState();
  const [error, setError] = useState("");

  let imageInput;
  const userData = JSON.parse(localStorage.getItem("userData"));

  const imgHandler = event => {
    event.preventDefault();
    const files = event.target.files[0];
    const fileReader = new FileReader();
    setAvatarData(files);
    fileReader.addEventListener("load", () => {
      setPreviewImage(fileReader.result);
    });
    fileReader.readAsDataURL(files);
  };

  const setNewAvatar = event => {
    setError("");
    if (avatarData) {
      const formData = new FormData();
      formData.append("image", avatarData);
      fetch("http://localhost:8080/post-image", {
        method: "PUT",
        body: formData
      })
        .then(res => res.json())
        .then(fileResData => {
          const imageUrl = fileResData.filePath;
          console.log(imageUrl);
          const userData = JSON.parse(localStorage.getItem("userData"));
          const updatedData = {
            ...userData,
            avatar: `http://localhost:8080/${imageUrl}`
          };
          localStorage.removeItem("userData");
          localStorage.setItem("userData", JSON.stringify(updatedData));
          const graphqlQuery = {
            query: `
                mutation {
                    changeUserAvatar(fileUrl: "${imageUrl}", userId: "${
              userData.userId
            }") {
                        message
                    }
                  }
                `
          };
          return fetch("http://localhost:8080/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(graphqlQuery)
          });
        })
        .then(res => {
          return res.json();
        })
        .then(resData => {
          console.log(resData);
          setError(resData.data.changeUserAvatar.message);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("No image specified");
    }
  };

  let avatarPreview = previewImage ? previewImage : userData.avatar;
  let popup = error === "" ? "" : error;

  return (
    <div className="Avatar">
      <div
        className="Avatar__Preview"
        style={{ backgroundImage: `url(${avatarPreview})` }}
      />
      <div className="Avatar__Input">
        <h2>Upload your new profile picture</h2>
        <div className="Avatar__Btns">
          <input
            type="file"
            style={{ display: "none" }}
            onChange={imgHandler}
            ref={input => (imageInput = input)}
          />
          <button className="Img__Btn" onClick={() => imageInput.click()} />
          <button
            className="Img__Confirm"
            onClick={event => setNewAvatar(event)}
          >
            Confirm
          </button>
          <div
            className="Img__Popup"
            style={error === "" ? { opacity: 0 } : { opacity: 1 }}
          >
            <p>{popup}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
