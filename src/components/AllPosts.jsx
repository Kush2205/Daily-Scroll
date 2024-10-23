import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import service from "../appwrite/config";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [image, setImage] = useState([]);
  const [ids, setIds] = useState([]);
  const [dates, setDates] = useState([]);
  const [postIDs, setPostIDs] = useState([]);



  async function getPosts() {
    try {
      let posts = await service.getPosts();
      console.log(posts);
      if (posts) {
        setTitle(posts.documents.map((post) => post.title));
        setContent(posts.documents.map((post) => post.content));
        setImage(posts.documents.map((post) => post.FeaturedImage));
        setIds(posts.documents.map((post) => post.UserId));
        setDates(posts.documents.map((post) => post.$createdAt));
        setPostIDs(posts.documents.map((post) => post.$id));
      }
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  const handleDelete = async (id) => {
    try {
      await service.deletePosts(id);
      getPosts();
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className="bg-gray-100 py-10 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold text-gray-800">Your Blogs</h1>
        </div>
        <div className="flex flex-wrap -mx-4">
          {title &&
            title.map((title, index) => {
             
                return (
                  <BlogCard
                    key={index}
                    imagesID={image[index]}
                    date={dates[index]}
                    CardTitle={title}
                    CardDescription={content[index]}
                    postID={postIDs[index]}
                   
                  />
                );
              
             
            })}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;