# Next Utils CLI

[![Test](https://github.com/bocarw121/next-utils-cli/actions/workflows/test.yml/badge.svg)](https://github.com/bocarw121/next-utils-cli/actions/workflows/test.yml) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bocarw121/next-utils-cli/blob/main/LICENCE)

Next Utils CLI is a command-line tool exclusively designed for the new Next.js App router, streamlining the creation of routes, pages, and components in your Next.js application.

## Features

- Quickly generate Next.js routes, pages, and components.
- Create routes with various HTTP methods.
- Choose between different function types for components.
- Option to create client components.
- Easily customize the path and name for your files.
- Recursive directory creation for an organized codebase.
- Components and pages are camel-cased by default.

## Installation

You can install Next Utils CLI globally using npm:

```bash
npm install -g next-utils-cli
```

## Usage

To use Next Utils CLI, simply run the desired command:

```bash
next-utils route
```

```bash
next-utils page
```

```bash
next-utils component
```

Next Utils CLI will guide you through the process of creating routes, pages, and components with interactive prompts.

## Additional Information

- When creating a page, and a route you can only select the `app` directory as the base.
- For components and pages, you'll be prompted to choose a function type (arrow function or function declaration).
- When creating a route, you have the flexibility to select multiple HTTP methods to associate with it.

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for details.

## Contributions

Contributions are welcome! If you have ideas for improvements or encounter issues, please open an [issue](https://github.com/bocarw121/next-utils-cli/issues) or submit a pull request.

## Links

- [Report Issues](https://github.com/bocarw121/next-utils-cli/issues)
- [npm Package](https://www.npmjs.com/package/next-utils-cli)
