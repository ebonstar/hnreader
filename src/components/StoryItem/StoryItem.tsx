export type Story = {
  id: number;
  title: string;
  url: string;
};

export function StoryItem({ story }: { story: Story }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: "5px",
        padding: "1rem 2rem",
        background: `hsla(${story.id * 30}, 60%, 80%, 1)`,
      }}
      key={story.id}
    >
      {story.title}
    </div>
  );
}
