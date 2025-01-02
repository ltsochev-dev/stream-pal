# StreamPal - A WebOS experiment app

StreamPal is a small application created as part of an experiment with LG WebOS TV. The goal of this experiment was to explore the use of ReactJS in a non-browser environment. I set up Vite to compile TypeScript and bundle the app to an older ES2016 standard, although WebOS seems to support newer JavaScript features. I was surprised to find that WebOS handles flexboxes, grids, CSS transformations, localStorage, and more without issues. In essence, it is a modern OS that recognizes modern web standards.

## Installation & Setup

To set up the application, you'll need a developer account at [TheMovieDatabase](https://developer.themoviedb.org/docs/getting-started), as the app integrates with their API (mostly for posters, lol).

1. Copy the `.env.example` file to the `./src/.env` file:

```bash
cp .env.example ./src/.env
```

2. Modify the newly created .env file with the API keys you received from TheMovieDatabase.

3. Install dependencies and run the app:

```bash
npm install
npm run dev
```

4. Open it in your browser. You'll be asked to log in. You can choose whatever you want since there's no real backend service to manage authentication and authorization. Whatever you put in the email address is what is going to be your name within the app, not that it matters too much.

## Tech stack

- ReactJS v19 (learning the new `useTransition`, `useActionState` hooks)
- React Router (hash router due to CORS issues with local files)
- TailwindCSS (with `tw-merge`)
- Feather Icons (Tiny performant SVG Icons)
- `useSWR` for data fetching and caching
- Vite for bundling and fast builds

### Running the app on the TV

To run the application on the TV, you'll need the webOS Studio extension for VSCode. After installation, follow LG's [documentation on transferring the packaged app to your TV](https://webostv.developer.lge.com/develop/getting-started/developer-mode-app#installing-developer-mode-app).

### Final thoughts

This is primarily a proof-of-concept. I was curious about building a performant WebOS app because I’ve been frustrated with how sluggish streaming services like Max and Disney+ are on my TV. I wanted to find out whether it was a hardware issue or if these services just weren't optimized well. As it turns out, it’s definitely the latter.

While this app is still not fully optimized, it’s already running better than the apps from the streaming services I mentioned. Even with some DOM manipulations to show and hide buttons—which could be performance bottlenecks—the TV handles it with ease, even playing CSS transitions smoothly. The Max app, especially, is a pretty poor piece of software.

On the other hand, Netflix deserves credit for their impressive optimization. The app runs smoothly on my TV, even during more demanding tasks. The UI is responsive, transitions are fluid, and it maintains consistent performance, even with high-resolution streaming. It's clear that a lot of effort went into making sure the user experience is seamless, with minimal lag or stuttering, which is something I really appreciate.

I also want to acknowledge that building a streaming app is no small feat. StreamPal is still a work in progress, and there’s plenty of work to be done to reach the level of polish seen in apps like Netflix. But it’s been an interesting experiment to explore how far WebOS and ReactJS can go in this space, and I’m excited to keep improving it.
