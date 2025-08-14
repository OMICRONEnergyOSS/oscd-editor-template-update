[![Tests](https://github.com/OMICRONEnergyOSS/oscd-editor-template-update/actions/workflows/test.yml/badge.svg)](https://github.com/OMICRONEnergyOSS/oscd-editor-template-update/actions/workflows/test.yml) ![NPM Version](https://img.shields.io/npm/v/@omicronenergy/oscd-editor-template-update)

# \<oscd-editor-template-update>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## What is this?

This is a basic editor plugin for [OpenSCD](https://openscd.org) which enables user to update existing `LNodeType` elements. Start up a demo server with `npm run start` and see for yourself!

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm run start
```

To run a local development server that serves the basic demo located in `demo/index.html`

&copy; 2025 OMICRON electronics GmbH

## License

[Apache-2.0](LICENSE)
