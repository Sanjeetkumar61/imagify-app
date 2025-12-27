import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (input.trim()) {
      const img = await generateImage(input);
      if (img) {
        setImage(img);
        setIsImageLoaded(true);
      }
    }

    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center"
      initial={{ opacity: 0.2, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="pb-4">
        <img src={image} alt="" className="max-w-sm rounded" />
        {loading && <p className="mt-2 text-sm">Loading...</p>}
      </div>

      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 rounded-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder:text-gray-300"
          />

          <button
            type="submit"
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full cursor-pointer"
          >
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center mt-10">
          <p
            onClick={() => setIsImageLoaded(false)}
            className="border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </p>

          <a
            href={image}
            download
            className="bg-zinc-900 text-white px-10 py-3 rounded-full"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;

