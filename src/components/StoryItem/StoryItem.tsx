import timeago from "epoch-timeago";
import { HN_ITEM_URL } from "config";

export type Story = {
  id: number;
  title: string;
  url?: string;
  score: number;
  descendants: number;
  time: number;
};

const backgroundColours = [
  "bg-lime-300",
  "bg-teal-300",
  "bg-yellow-300",
  "bg-cyan-300",
  "bg-stone-200",
  "bg-rose-400",
  "bg-emerald-300",
];

const rotateLevels = ["rotate-3", "rotate-1", "-rotate-2", "-rotate-1"];

const topPositions = ["top-3", "top-6", "top-12"];

const scales = ["", "scale-110", "scale-125"];

const extraInfoClasses =
  "absolute hidden group-hover:block bg-black text-white";

export function StoryItem({ story }: { story: Story }) {
  const hnLink = HN_ITEM_URL + story.id;
  const background = backgroundColours[story.id % 7];
  const rotate = rotateLevels[story.id % 4];
  const top = topPositions[story.score % 3];
  const scale =
    story.score > 300 ? scales[2] : story.score > 150 ? scales[1] : scales[0];
  return (
    <li
      className={`group relative mb-6 px-8 py-4
        ${background} border-4 border-black ${scale} ${rotate}
        hover:rotate-0 hover:z-10 transition-all`}
      key={story.id}
    >
      <div className={`${extraInfoClasses} ${top} -left-12 p-2 font-bold`}>
        ⇧ {story.score}
      </div>
      <a href={story.url ?? hnLink} target="_blank">
        <div className="text-xl font-bold">{story.title}</div>
        <div className="text-m">{timeago(story.time * 1000)}</div>
      </a>
      <a
        className={`${extraInfoClasses} -bottom-6 -right-2 px-4 py-1 hover:underline`}
        href={hnLink}
        target="_blank"
      >
        {story.descendants ?? 0}{" "}
        {story.descendants === 1 ? " comment" : "comments"}
      </a>
    </li>
  );
}
