import type { NextPage } from "next";
import axios from "axios";
import { Video } from "../types";
import VideoCard from "components/VideoCard";
import NoResults from "components/NoResults";
import { BASE_URL } from "../utils";
import { useRouter } from "next/router";

// TS best practices for working with videos (probably other formats)
interface Iprops {
  videos: Video[];
}

const Home = ({ videos }: Iprops) => {
  console.log(videos);
  const router = useRouter();

  return (
    <>
      <h1 className="flex flex-col gap-10 videos h-full">
        {videos.length ? (
          videos.map((video: Video) => (
            <VideoCard post={video} key={video._id} />
          ))
        ) : (
          <NoResults text={"No videos"} />
        )}
      </h1>
    </>
  );
};

// This is how you fetch data in Next.js
export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }
  return {
    props: {
      videos: response.data,
    },
  };
};

export default Home;
