# 1.0.3

- Fixed bug where cli only worked when src was present.

# 1.0.4

- Added a clean-home-page command that clears up all of the next js boilerplate
  code from the home page
- Added a validate function at the root of the project to make sure cli is running
  in a valid next js app router project. It checks to make sure that the next js version
  is greater or equal to 13 and that the project has an app directory.
