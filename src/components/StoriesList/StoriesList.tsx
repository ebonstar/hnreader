import React from "react";
import { useInView } from "react-intersection-observer";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

type Story = {
  id: number;
  title: string;
  url: string;
};

const fetchStory = async (id: number): Promise<Story> => {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  if (!res.ok) throw new Error("Could not load story");
  return res.json();
};

const limit = 100;
const chunk = 15;

export function StoriesList() {
  const { ref, inView } = useInView();

  const { data: storyIds } = useQuery<number[]>(["ids"], async () => {
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    if (!res.ok) throw new Error("Could not load stories");
    return res.json();
  });

  const limitedStoryIds = storyIds?.slice(0, limit);

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["stories"],
    async ({ pageParam = 0 }) => {
      const idsToFetch = limitedStoryIds!.slice(pageParam, pageParam + chunk);
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
    <div>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {(error as Error).message}</span>
      ) : (
        <>
          <ol>
            {data &&
              data.pages &&
              data.pages.map((chunk) =>
                chunk.map((story) => (
                  <li
                    style={{
                      border: "1px solid gray",
                      borderRadius: "5px",
                      padding: "1rem 2rem",
                      background: `hsla(${story.id * 30}, 60%, 80%, 1)`,
                    }}
                    key={story.id}
                  >
                    {story.title}
                  </li>
                ))
              )}
          </ol>
          <div>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load Newer"
                : "Nothing more to load"}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? "Background Updating..."
              : null}
          </div>
        </>
      )}
    </div>
  );
}
