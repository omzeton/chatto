import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import "./ChatInput.css";

const ChatInput = props => {
  const [msg, setMsg] = useState({ body: "" });

  const [previewImage, setPreviewImage] = useState(undefined);
  const [attachment, setAttachment] = useState(undefined);

  const onChange = e => {
    e.preventDefault();
    setMsg({ body: e.target.value });
  };
  const sendMessage = e => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    let graphqlQuery;
    
    console.log(msg);
    console.log(props.match.params.id);
    console.log(userData.userId);

    if (msg.body === "" && !attachment) {
      console.log("Nothing to send");
    } else {
      if (attachment) {
        const formData = new FormData();
        formData.append("image", attachment);
        fetch("http://localhost:8080/post-image", {
          method: "PUT",
          body: formData
        })
          .then(res => res.json())
          .then(fileResData => {
            const imageUrl = fileResData.filePath;
            graphqlQuery = {
              query: `
              mutation {
                createMessage(messageInput:{ownId: "${
                  userData.userId
                }", otherId: "${props.match.params.id}", body: """${
                msg.body
              }""", attachment: "${imageUrl}"}) {
                  messages {
                    uId
                    body
                    date
                    avatar
                    attachment
                  }
                }
              }`
            };
            return fetch("http://localhost:8080/graphql", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(graphqlQuery)
            })
              .then(res => {
                setPreviewImage(undefined);
                setAttachment(undefined);
                setMsg({ body: "" });
                return res.json();
              })
              .then(resData => {
                console.log(resData);
              })
              .catch(err => {
                console.log(err);
              });
          });
      } else {
        graphqlQuery = {
          query: `
          mutation {
            createMessage(messageInput:{ownId: "${
              userData.userId
            }", otherId: "${props.match.params.id}", body: """${
            msg.body
          }""", attachment: "null"}) {
              messages {
                uId
                body
                date
                avatar
                attachment
              }
            }
          }`
        };
        fetch("http://localhost:8080/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(graphqlQuery)
        })
          .then(res => {
            return res.json();
          })
          .then(resData => {
            props.loadNewMsg(resData.data.createMessage.messages);
            setPreviewImage(undefined);
            setAttachment(undefined);
            setMsg({ body: "" });
            // console.log(resData);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  let imageInput;

  const imgHandler = event => {
    event.preventDefault();
    const files = event.target.files[0];
    const fileReader = new FileReader();
    setAttachment(files);
    fileReader.addEventListener("load", () => {
      setPreviewImage(fileReader.result);
    });
    fileReader.readAsDataURL(files);
  };

  return (
    <div className="ChatInput">
      <input
        type="file"
        style={{ display: "none" }}
        onChange={imgHandler}
        className="Attachment__Input"
        ref={input => (imageInput = input)}
      />
      <div className="ChatInput__Emoji" onClick={() => imageInput.click()} />

      {previewImage ? (
        <div className="ChatInput__At__Preview">
          <p>Press send to send image</p>
          <img alt="Message attachment" src={previewImage} />
        </div>
      ) : null}

      <form onSubmit={e => sendMessage(e)} className="ChatInput__Form">
        <textarea
          placeholder="type something..."
          className="ChatInput__Form__Input"
          value={msg.body}
          onKeyPress={e => e.which === 13 ? sendMessage(e) : null}
          onChange={e => onChange(e)}
        />
        <input type="submit" value="" className="ChatInput__Form__Send" />
      </form>
    </div>
  );
};

export default withRouter(ChatInput);
