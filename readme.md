[![npm](https://img.shields.io/npm/v/@first-lego-league/display.svg)](https://www.npmjs.com/package/@first-lego-league/display)
[![codecov](https://codecov.io/gh/FirstLegoLeague/display/branch/master/graph/badge.svg)](https://codecov.io/gh/FirstLegoLeague/display)
![Windows Build](https://img.shields.io/static/v1.svg?label=build&message=missing&color=red&logo=windows&logoColor=9cf)
[![GitHub](https://img.shields.io/github/license/FirstLegoLeague/display.svg)](https://github.com/FirstLegoLeague/display/blob/master/LICENSE)

# Display
A Display module for the big screen in FIRST LEGO League competitions.

## Background
There are several things that tournament officials would like to appear on their big screen:
 - A Rankings Table
 - A Match Timer
 - Logos of sponsors
 - Competition Title & Logos
This module is meant to display these to the teams in an eye-pleasing manner, which is informative and intuitive, with data that updates at real-time.

### Future additions:
 - Up next
 - Camera feed

## Techincal details
This module is a `web` module (see the [Module Standard](https://github.com/FirstLegoLeague/architecture/blob/master/module-standard/v1.0-SNAPSHOT.md)). It runs on [react-js](https://reactjs.org/).

## Development
1. Fork this repository or create your own branch here
2. make some changes
3. create a Pull Request
4. Wait for a CR from the code owner
5. make sure everything is well
6. merge

### To run in development
* Run `yarn install` first
* Run `yarn mhub` to start mhub with the correct configuration which sits in `dev/mhub.config.json`
* Run `yarn start` to run the `webpack-dev-server`

### To Publish to NPM
To publish the package run command `yarn publish`.

### A few things to notice while developing:
* Use `yarn` not `npm`
* Follow javascript standard as described [here](https://standardjs.com/)
* Keep the service lightweight
* Follow the API of the other modules.
* Be creative and have fun
