[![CircleCI](https://circleci.com/gh/Lemmah/diligent-time-api.svg?style=svg)](https://circleci.com/gh/Lemmah/diligent-time-api)   [![Test Coverage](https://api.codeclimate.com/v1/badges/a84ea1977fec9bb60318/test_coverage)](https://codeclimate.com/github/Lemmah/diligent-time-api/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/a84ea1977fec9bb60318/maintainability)](https://codeclimate.com/github/Lemmah/diligent-time-api/maintainability)

# Diligent Time API
This is the API for the app that enables people to be more diligent in their use of time. This work started as a capstone project for the restacking process in Andela.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
- Just clone this repository by typing: `git clone https://github.com/Lemmah/diligent-time-api.git`
- Switch to project directory: `cd diligent-time-api`
- Install packages by running `npm install`. Wait, you have to have some stuff before you get to this point. So these are:

### Prerequisites

- Node.js v8.12.0 and above.
- Npm for package management, this comes with node.
Just type:
```
node -v
```
in your terminal and if its not greater than or equal to v8.12.0, you're not in big trouble, there are tons of tutorials to get up up and running with these. Just grub one then come back when done.

### Installing
Install `typescript` and `ts-node` globally. 
All packages are installed by `npm install`.
Run `npm start` to view the application. Visit `localhost:3000`
For good development experience, run `npm run start:dev` which concurently watches for file changes in the tests and app. You can learn more about this script command by viewing the [package.json](/package.json) file.


## Running the tests

Run the tests using `npm test`.
More options on running tests are:
  - `npm run test:coverage` to generate a coverage report.
  - `npm run watch:test` to run the tests in watch mode.

## Built With

* [TypeScript](https://typescriptlang.org) - A typed superset of JavaScript that compiles to plain JavaScript.
* [Express](https://expressjs.com) - Fast, unopinionated, minimalist web framework for [Nodejs](https://nodejs.org).

## Authors

* **James Lemayian** - *Originating and Kickstarting the project* - [@lemmah](https://github.com/lemmah)


## License

This project is currently under the MIT licence.

## Acknowledgments

* **Andela Kenya** - *Providing the time and resources* - [@andela](https://andela.com)
* **Kwabena Boadu** - *Providing great mentorship and support* - [@biblicalph](https://github.com/biblicalph)
