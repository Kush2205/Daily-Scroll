import React, { useState, useEffect } from 'react';
import service from '../appwrite/config';

const BlogCard = ({ imagesID, date, CardTitle, CardDescription,}) => {
  const [image, setImage] = useState(null);
  const upDate = date.split("T")[0];
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

  return (
    <div className="w-full px-4  md:w-1/2 lg:w-1/3 ">
      <div className="mb-10 w-full h-full m-4 bg-slate-300 rounded-xl p-4">
      <h3 className='text-5xl text-center m-4 font-bold underline '>
           
           {CardTitle}
        
       </h3>
        <div className="mb-8 overflow-hidden rounded">
          {image ? (
            <img
              src={image}
              alt="Blog"
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span>Loading...</span>
            </div>
          )}
        </div>
        <div>
          {date && (
            <span className="mb-5 bg-blue-700 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
              {upDate}
            </span>
          )}
          
          <p className="font-semibold text-lg">{CardDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;