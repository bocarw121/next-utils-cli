# 1.0.3

- Fixed bug where cli only worked when src was present.

# 1.1.0

- Added a clean-home-page command that clears up all of the next js boilerplate
  code from the home page
- Added a validate function at the root of the project to make sure cli is running
  in a valid next js app router project. It checks to make sure that the next js version
  is greater or equal to 13 and that the project has an app directory.

# 1.1.1

- Fix bug where route and page commands were showing the `/src` directory as an option when the `/app` directory
  is the only valid option.

# 1.2.0

- Enhanced safety and user experience by prompting for file overwrite confirmation.
- Added a main function that runs the program after the validation function is complete.
- Passed the handler functions references to its respective program action method to clean up the code.
- Added a couple of checks to the isNextVersionAtLeast13 function in errors.

  1. Check to make sure that package.json exists.
  2. Check to make sure that the package.json file has a next js dependency.

- Added a pagePrompt to separate the logic from componentPrompt even though they are relatively similar.
- Update prompt messages to be more clear.
- Fix page folder being created right when user selected dynamic route as it
  can leader to unnecessary folder creation if user exists out of the prompt.
- Change createPath to getPath to separate the concerns of creating a path and getting a path.
- Updated listOfDirectoriesForComponents to add root as an option if no src directory is present.
