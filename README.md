# hnreader

Displays the first 100 top stories from [Hacker News](https://news.ycombinator.com/) in a colourful sticky note board.

View the app on [GitHub Pages](https://ebonstar.github.io/hnreader/).

## development

Built with the vite `react-swc-ts` scaffold. Run the development server with `yarn dev`.

Uses:

- [Hacker News API](https://github.com/HackerNews/API)
- `react-query` and `react-intersection-observer` for infinite scroll
- `react-masonry-css` to generate the masonry layout
- `tailwindcss` for styling and animation
- `vitest` and `@testing-library` for unit and component testing
