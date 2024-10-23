import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import service from "../appwrite/config.js";
import { ID } from "appwrite";
import authService from "../appwrite/auth.js";
import conf from "../conf/conf.js";
import { useNavigate } from "react-router";

export default function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [userID, setUserID] = useState("");
  const imageID = ID.unique();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      try {
        const user = await authService.getCurrentUser();
        setUserID(user.$id);
      } catch (error) {
        console.log("Appwrite service :: getCurrentUser :: error", error);
      }
    }

    getUser();
  }, []);

  const handleClick = async () => {
    try {
      await service.createPost({
        title,
        content,
        FeaturedImage: imageID,
        status: "active",
        userID: userID,
      });
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }

    try {
      await service.uploadFile(image, imageID);
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
    } finally {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">Create Post</h1>

      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your title here"
          />
        </div>

        <div className="mb-6">
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            accept="image/*"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
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
              height: 300,
              menubar: false,
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
            }}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleClick}
            className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}