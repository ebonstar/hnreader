import React from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Masonry from "react-masonry-css";

import { Loader } from "components/Loader";
import { Story, StoryItem } from "components/StoryItem";
import { fetchStory, fetchTopStoryIds } from "data/story";

const STORY_LIMIT = 100;
const CHUNK_SIZE = 15;

export function StoryList() {
  const { ref, inView } = useInView();

  const { data: storyIds } = useQuery<number[]>(["ids"], fetchTopStoryIds);
  const limitedStoryIds = storyIds?.slice(0, STORY_LIMIT);

  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<Story[]>(
    ["stories"],
    async ({ pageParam = 0 }) => {
      const idsToFetch = limitedStoryIds!.slice(
        pageParam,
        pageParam + CHUNK_SIZE
      );
      const data = await Promise.all(idsToFetch.map(fetchStory));
      return data;
    },
    {
      enabled: !!limitedStoryIds,
      getNextPageParam: (_, pages) => {
        const totalStories = pages.flat().length;
        return limitedStoryIds!.length > totalStories
          ? totalStories
          : undefined;
      },
    }
  );

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      {status === "loading" ? (
        <div className="grow flex justify-center">
          <Loader />
        </div>
      ) : status === "error" ? (
        <span>Error: {(error as Error).message}</span>
      ) : (
        <>
          <Masonry
            breakpointCols={3}
            className="flex -ml-8 w-auto"
            columnClassName="pl-8"
          >
            {data &&
              data.pages &&
              data.pages.map((chunk) =>
                chunk.map((story) => <StoryItem story={story} />)
              )}
          </Masonry>
          <div ref={ref} className="h-40 mb-8">
            {isFetchingNextPage ? <Loader /> : "Nothing more to load"}
          </div>
        </>
      )}
    </>
  );
}
