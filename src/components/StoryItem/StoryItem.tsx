export type Story = {
  id: number;
  title: string;
  url: string;
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

export function StoryItem({ story }: { story: Story }) {
  const colourIndex = story.id % 10;
  return (
    <a href={story.url} target="_blank">
      <div
        className={`mb-6 px-8 py-4 text-lg font-semibold
          ${backgroundColours[colourIndex]} border-4 border-black
          hover:rotate-3 hover:scale-105 transition-all`}
        key={story.id}
      >
        {story.title}
      </div>
    </a>
  );
}
