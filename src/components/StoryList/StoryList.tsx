import React from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Masonry from "react-masonry-css";

import { CHUNK_SIZE, STORY_LIMIT } from "config";
import { Loader } from "components/Loader";
import { Story, StoryItem } from "components/StoryItem";
import { fetchStory, fetchTopStoryIds } from "data/story";

const masonryColumnBreakpoints = {
  default: 3,
  1024: 2,
  640: 1,
};

/**
 * Get the next chunk of items from an array, given a start index and chunk size
 * @param array Array of items to extract from
 * @param start Start index for the next chunk
 * @param chunk Number of items in each chunk
 */
export const getNextChunk = <T,>(
  array: T[],
  start: number,
  chunk: number
): T[] => array.slice(start, start + chunk);

export function StoryList() {
  const { ref, inView } = useInView();

  const { data: storyIds } = useQuery<number[]>(["ids"], fetchTopStoryIds);
  const limitedStoryIds = storyIds?.slice(0, STORY_LIMIT);

  const { status, data, error, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery<Story[]>(
      ["stories"],
      async ({ pageParam = 0 }) => {
        const idsToFetch = getNextChunk(
          limitedStoryIds!,
          pageParam,
          CHUNK_SIZE
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
        <ol>
          <Masonry
            breakpointCols={masonryColumnBreakpoints}
            className="flex -ml-12 w-auto"
            columnClassName="pl-12"
          >
            {data &&
              data.pages &&
              data.pages.map((chunk) =>
                chunk.map((story) => <StoryItem story={story} />)
              )}
          </Masonry>
          <div
            ref={ref}
            className="h-48 shrink-0 flex justify-center items-center"
          >
            {isFetchingNextPage ? (
              <Loader />
            ) : (
              <div className="text-3xl font-bold">
                (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ You've reached the end!
              </div>
            )}
          </div>
        </ol>
      )}
    </>
  );
}
