import React, { useEffect } from "react";
import { useState } from "react";
import BlogCard from "./BlogCard";
import service from "../appwrite/config";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";
const Dashboard = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [ids, setIds] = useState();
  const [dates , setDates] = useState();
 
  let user = useSelector(state => state.auth.userData.$id);
 
  
  async function getPosts() {
    try {
      let posts = await service.getPosts();
     
      if (posts) {
       setTitle(() => posts.documents.map((post) => post.title));
        setContent(() => posts.documents.map((post) => post.content));
        setImage(() => posts.documents.map((post) => post.FeaturedImage));
        setIds(() => posts.documents.map((post) => post.UserId));
        setDates(() => posts.documents.map((post) => post.$createdAt));
        
      }
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  useEffect(() => {getPosts()}, []);  

  return (
    <>
      <section className="bg-white pb-10  dark:bg-dark mt-5 overflow-hidden ">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <span className=" block text-6xl font-semibold text-primary">
                  Your Blogs
                </span>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap">
          { 
          
          title && title.map((title, index) => {
            if(ids[index] === user){
              return (
                <BlogCard
                  key={index}
                  imagesID={image[index]}
                  date={dates[index]}
                  CardTitle={title}
                  CardDescription={content[index]}
                />
              );
            }

          }
           )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
