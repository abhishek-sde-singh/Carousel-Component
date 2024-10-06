import { useEffect, useRef, useState, useCallback } from "react";
const Carousel = () => {
  const [data, setData] = useState([]);
  const [currImage, setCurrImage] = useState(0);

  const ref = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNext = useCallback(() => {
    setCurrImage((prev) => (prev + 1) % data.length);
  }, [data.length]);

  const handlePrev = () => {
    setCurrImage((prev) => (prev - 1 + data.length) % data.length);
  };

  useEffect(() => {
    ref.current = setInterval(handleNext, 1000);
    return () => {
      clearInterval(ref.current);
    };
  }, [handleNext]);

  return (
    <div
      className="h-[400px] w-[400px] flex relative"
      onMouseEnter={() => clearInterval(ref.current)}
      onMouseLeave={() => {
        ref.current = setInterval(handleNext, 1000);
      }}
    >
      <button
        onClick={handlePrev}
        className="bg-slate-400 text-red-500 font-bold h-fit text-3xl absolute top-1/2 p-2"
      >
        {"<"}
      </button>
      <img
        alt={data[currImage]?.title}
        key={data[currImage]?.id}
        src={data[currImage]?.image}
        height={400}
        width={400}
      />

      <button
        onClick={handleNext}
        className="bg-gray-400 text-red-500 font-bold h-fit text-3xl absolute right-0 top-1/2 p-2"
      >
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
