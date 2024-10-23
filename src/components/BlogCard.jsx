import React, { useState, useEffect } from 'react';
import service from '../appwrite/config';
import { useNavigate } from 'react-router';

const BlogCard = ({ imagesID, date, CardTitle, CardDescription, postID, handleDelete, author }) => {
  const [image, setImage] = useState(null);
  const upDate = date.split("T")[0];
  const navigate = useNavigate();

  useEffect(() => {
    async function getImages(id) {
      try {
        const imageUrl = await service.getFilePreview(id);
        setImage(imageUrl);
      } catch (error) {
        console.log("Appwrite service :: getImages :: error", error);
      }
    }

    if (imagesID) {
      getImages(imagesID);
    }
  }, [imagesID]);

  const Delete = async () => {
    await handleDelete(postID , imagesID);
    navigate('/dashboard');
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 ">
      <div className="bg-gray-300 rounded-lg shadow-lg overflow-hidden">
        <h3 className="xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl text-3xl mt-2 font-bold text-center mb-4 underline">
          {CardTitle}
        </h3>
        <div className="relative p-4 rounded-xl">
          {image ? (
            <img
              src={image}
              alt="Blog"
              className="w-full rounded-2xl h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span>Loading...</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            {date && (
              <span className="text-sm bg-blue-600 text-white px-2 py-2 rounded-2xl">
                {upDate}
              </span>
            )}
            
           {handleDelete && (
              <button
                onClick={Delete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            )}
            {author && (
              <div>
                <label>Posted By :</label>
                  <span className="text-sm bg-green-700 text-white mx-2 px-2 py-2 rounded-2xl">
                
                {author}
              </span>
              </div>
            
            )}
           
          </div>
          <p className="font-semibold text-lg text-gray-700">
            {CardDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;