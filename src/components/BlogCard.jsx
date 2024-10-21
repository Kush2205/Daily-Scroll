import React, { useState, useEffect } from 'react';
import service from '../appwrite/config';

const BlogCard = ({ imagesID, date, CardTitle, CardDescription }) => {
  const [image, setImage] = useState(null);

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
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="mb-10 w-full">
        <div className="mb-8 overflow-hidden rounded">
          {image ? (
            <img src={image} alt="Blog" className="w-full" />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span>Loading...</span>
            </div>
          )}
        </div>
        <div>
          {date && (
            <span className="mb-5 bg-blue-700 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
              {date}
            </span>
          )}
          <h3>
            <a href="/#" className="text-lg font-semibold">
              {CardTitle}
            </a>
          </h3>
          <p className="text-gray-500">{CardDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;