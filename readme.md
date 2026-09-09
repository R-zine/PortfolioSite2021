This is my dev portfolio from 2021.

Live site: [ivanradev2021.netlify.app](https://ivanradev2021.netlify.app/)

Made with TypeScript, React (with routing), React Three Fiber, and GSAP.

## Development

```sh
yarn install
yarn start
```

Run the strict TypeScript check and the complete test suite with coverage:

```sh
yarn typecheck
yarn test:ci
```

Create an optimized production build with:

```sh
yarn build
```

The project pins Yarn 1.22.22 through the `packageManager` field. In CI, use
`yarn install --frozen-lockfile` to install exactly the dependency graph in
`yarn.lock`.
