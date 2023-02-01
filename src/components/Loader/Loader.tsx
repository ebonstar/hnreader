const classes = [
  "rounded-full w-32 h-32",
  "border-8 border-black",
  "animate-spin",
  "after:content-[''] after:absolute after:inset-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
  "after:w-40 after:h-40 after:rounded-full after:border-4 after:border-transparent after:border-t-black",
];

export function Loader() {
  return (
    <div
      className="mx-auto py-8 flex items-center justify-center"
      role="status"
    >
      <div className={classes.join(" ")} />
    </div>
  );
}
