import timeago from "epoch-timeago";

export type Story = {
  id: number;
  title: string;
  url?: string;
  score: number;
  descendants: number;
  time: number;
};

const backgroundColours = [
  "bg-yellow-300",
  "bg-yellow-300",
  "bg-lime-300",
  "bg-lime-300",
  "bg-teal-300",
  "bg-cyan-300",
  "bg-cyan-300",
  "bg-stone-200",
  "bg-rose-400",
  "bg-emerald-300",
];

const topPositions = ["top-1", "top-3"];

export function StoryItem({ story }: { story: Story }) {
  const hnLink = `https://news.ycombinator.com/item?id=${story.id}`;
  const background = backgroundColours[story.id % 10];
  const top = topPositions[story.score % 2];
  return (
    <a href={story.url ?? hnLink} target="_blank">
      <div
        className={`group relative mb-6 px-8 py-4
          ${background} border-4 border-black
          hover:rotate-3 hover:scale-105 transition-all`}
        key={story.id}
      >
        <div
          className={`absolute ${top} -left-6 px-1 ${background} font-bold border-4 border-black`}
        >
          {story.score}
        </div>
        <div className="text-xl font-bold">{story.title}</div>
        <div className="text-m">{timeago(story.time * 1000)}</div>
        <a
          className="absolute hidden -bottom-2 -right-2 px-4 py-2 bg-black text-white hover:underline group-hover:block"
          href={hnLink}
          target="_blank"
        >
          {story.descendants} comments
        </a>
      </div>
    </a>
  );
}
