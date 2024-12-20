# Next Utils CLI

[![Test](https://github.com/bocarw121/next-utils-cli/actions/workflows/test.yml/badge.svg)](https://github.com/bocarw121/next-utils-cli/actions/workflows/test.yml) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bocarw121/next-utils-cli/blob/main/LICENCE)

Next Utils CLI is a command-line tool exclusively designed for the new Next.js App router, streamlining the creation of routes, pages, components, and server actions in your Next.js application. It also allows you to clean up the boilerplate code from the home page and initialize a configuration file.

## Features

- Quickly generate Next.js routes, pages, components, and server actions.
- Create routes with various HTTP methods (GET, POST, PUT, PATCH, DELETE, OPTIONS).
- Choose between different function types for components.
- Option to opt in to client rendering for components and pages.
- Easily customize the path and name for your files.
- Recursive directory creation for an organized codebase.
- Initialize a project-specific configuration file with the `init` command.
- Clean up the boilerplate code from the home page with the `clean-home-page` command.
- Server action generation for enhanced server-side capabilities.

## Installation

You can install Next Utils CLI globally using npm:

```bash
npm install -g next-utils-cli
```

## Usage

To use Next Utils CLI, simply run the desired command:

```bash
next-utils page
```

```bash
next-utils route
```

```bash
next-utils component
```

```bash
next-utils clean-home-page
```

```bash
next-utils init
```

```bash
next-utils action
```

### Available Commands

#### **`page`**
Generate a new page in the App router.

#### **`route`**
Generate a new route in the App router. Allows selecting multiple HTTP methods.

#### **`component`**
Generate a new component with options to customize the type and rendering mode.

#### **`clean-home-page`**
Removes boilerplate code from the default Next.js home page.

#### **`init`**
Creates a `next-utils-cli.json` configuration file in the root of your project. This file will store your project-specific preferences for `page`, `route`, and `component` commands.

#### **`action`**
Generate a new server action file to handle server-side logic seamlessly.

## Additional Information

- **Configuration**: Run the `init` command to generate a `next-utils-cli.json` file, which stores your project preferences, making subsequent commands faster and more consistent.
- **Component & Page Options**: Choose between arrow function and function declaration styles.
- **Route Flexibility**: Specify HTTP methods when creating a route.
- **Conflict Handling**: Prompts you before overwriting existing directories or files.

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for details.

## Contributions

Contributions are welcome! If you have ideas for improvements or encounter issues, please open an [issue](https://github.com/bocarw121/next-utils-cli/issues) or submit a pull request.

### How to Contribute

1. **Fork the Repository**: Click the "Fork" button on the [GitHub page](https://github.com/bocarw121/next-utils-cli) to create your copy of the project.

2. **Clone Your Fork**: In your terminal, run the following command, replacing `[your-username]` with your GitHub username:

   ```bash
   git clone https://github.com/[your-username]/next-utils-cli.git
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Make Changes**: Create a new branch for your changes, make improvements or fixes, and commit your work:

   ```bash
   git checkout -b my-fix
   # or
   git switch -c my-fix
   ```

5. **Run the Project**:

Run the following command to make sure project is running properly:

```bash
npm run next-utils -- -h
```

If you want to test in another directory:

```bash
npm run build test

npm link

# In your test directory
npm link next-utils-cli

# Then run the command
next-utils [command]
```

6. **Add Tests** (if necessary) and Run Them:

   ```bash
   npm run test
   ```

7. **Push Your Changes to GitHub**: Commit your changes and push them to GitHub. Then, open a pull request against the `main` branch.

   ```bash
   git add .
   git commit -m "Fix: Describe your fix or feature"
   ```

## Links

- [Report Issues](https://github.com/bocarw121/next-utils-cli/issues)
- [npm Package](https://www.npmjs.com/package/next-utils-cli)

## TODO

- [ ] Add examples to README.md
