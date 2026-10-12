# ShotOfFancyThing

![GitHub License](https://img.shields.io/github/license/steelWinds/shot-of-fancy-thing)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![Merge CI](https://github.com/steelWinds/shot-of-fancy-thing/actions/workflows/merge-ci.yaml/badge.svg)](https://github.com/steelWinds/shot-of-fancy-thing/actions/workflows/merge-ci.yaml)
[![Production CI](https://github.com/steelWinds/shot-of-fancy-thing/actions/workflows/production-ci.yaml/badge.svg)](https://github.com/steelWinds/shot-of-fancy-thing/actions/workflows/production-ci.yaml)
[![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Svelte](https://img.shields.io/badge/Svelte-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)

<p>
  <img align="right" width="150" height="150" src="./public/favicon.svg" alt="ShotOfFancyThing logo">
</p>

**ShotOfFancyThing** is my personal website — projects, experiments, and things I build. ✨

<br>
<br>

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
cp env.example .env
npm run dev
```

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

Requires Docker and Make. Copy `env.example` to `.env` before the first run.

```bash
make test
make test-update-snapshots
make test-ui
```

UI mode opens at [localhost:8080](http://localhost:8080).

### Lighthouse CI

For a local audit, first build and start the production preview in the background:

```bash
npm run build
npm run preview -- --background
```

```bash
set -a
source .env
set +a
npm run test:lighthouse
```

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
