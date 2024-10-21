import React from "react";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import service from "../appwrite/config.js";
import { ID } from "appwrite";
import authService from "../appwrite/auth.js";
import conf from "../conf/conf.js";
export default function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [userID, setUserID] = useState("");
  const imageID = ID.unique();

  async function getUser() {
    try {
      const user = await authService.getCurrentUser();
      setUserID(user.$id);
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
  }

  getUser();

  const handleClick = () => {
    try {
      service.createPost({
        title,
        content,
        FeaturedImage: imageID,
        status: "active",
        userID: userID,
      });
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }

    try {
      service.uploadFile(image, imageID);
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
    }
  };

  return (
    <>
      <div className="w-full pt-4 h-screen bg-slate-300">
        <h1 className="text-5xl italic font-extralight text-center underline-offset-auto">
          CREATE POST
        </h1>

        <div className="mt-10 flex justify-center">
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="w-3/5 text-lg mx-4 h-10 border-none px-2 rounded-tr-2xl rounded-bl-2xl"
            placeholder="Enter your title here"
          ></input>

          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            accept="image/*"
            className="w-fit text-lg mx-4 h-10 border-none px-2 rounded-tr-2xl rounded-bl-2xl"
            placeholder="Enter your title here"
          ></input>
        </div>
        <div>
          <div className="mt-14 mx-4 flex justify-center">
            <Editor
              onEditorChange={(content, editor) =>
                setContent(
                  editor
                    .getContent()
                    .split("<p>")
                    .join("")
                    .split("</p>")
                    .join("")
                )
              }
              apiKey={conf.tinyMCEKey}
              init={{
                width: 925,
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
              }}
            />
          </div>
        </div>
        <div className="w-full flex justify-center mt-10">
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-all text-white text-3xl hover:text-4xl rounded-tr-2xl rounded-bl-xl px-4 py-2"
          >
            POST
          </button>
        </div>
      </div>
    </>
  );
}
