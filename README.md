# ShotOfFancyThing

![GitHub License](https://img.shields.io/github/license/steelWinds/shot-of-fancy-thing)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![Deployment QA](https://github.com/steelWinds/shot-of-fancy-thing/actions/workflows/deployment-qa.yml/badge.svg)](https://github.com/steelWinds/shot-of-fancy-thing/actions/workflows/deployment-qa.yml)
[![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Svelte](https://img.shields.io/badge/Svelte-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)

<p>
  <img align="right" width="150" height="150" src="./public/favicon.svg" alt="ShotOfFancyThing logo">
</p>

**ShotOfFancyThing** is my personal website — projects, experiments, and things I build. ✨

## Getting Started

Requires Node.js 22.12+ and npm.

### Installation

```bash
git clone https://github.com/steelWinds/shot-of-fancy-thing.git
cd shot-of-fancy-thing
npm ci
```

### Development

```bash
npm run dev -- --background
```

Open [localhost:4321](http://localhost:4321).

## Usage

Build and preview the production site:

```bash
npm run build
npm run preview
```

## Tests

### Unit tests

```bash
npm run test:run
```

### E2E tests

```bash
npx playwright install --with-deps
npm run test:e2e
```

### Lighthouse CI

Requires Chrome and a production build:

```bash
npm run build
npm run test:lighthouse
```

Set `BASE_URL` to test a preview. Protected previews require `VERCEL_AUTOMATION_BYPASS_SECRET`;
local Lighthouse also needs `CHROME_PATH` when using the bypass.

## Contributing

Open an [issue](https://github.com/steelWinds/shot-of-fancy-thing/issues) or submit a pull request.

## License

The project is distributed under the [MIT License](LICENSE).

## Links

- Website: [steelcore.space](https://steelcore.space)
- Author: [@steelWinds](https://github.com/steelWinds)
- Issues: [Open an issue](https://github.com/steelWinds/shot-of-fancy-thing/issues)
- Telegram: [@plutograde](https://t.me/plutograde)
- Email: [Send an email](mailto:kirillsurov0@gmail.com)
