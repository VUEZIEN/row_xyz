/* eslint-disable react-hooks/exhaustive-deps */
"use client";

const Home = () => {
  return (
    <div className="bg-black/50 relative backdrop-blur-2xl">
      <span className="absolute top-0 right-0 translate-x-1/2 -z-10">
        <h1 className="text-black text-5xl text-center font-bold">
          Welcome to NextJS
        </h1>
      </span>
    </div>
  );
};

export default Home;
