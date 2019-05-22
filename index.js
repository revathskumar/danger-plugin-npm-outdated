"use strict";
const exec = require("child_process").exec;

const formatOutdatedPackages = (outdatedPackages = []) => {};

const execP = outdatedCommand => {
  return new Promise((resolve, reject) => {
    exec(outdatedCommand, function(error, stdout, stderr) {
      if (stdout) {
        resolve(JSON.parse(stdout));
      }
      if (error !== null) {
        reject(error);
      }
    });
  });
};

export default async function npmOutdated(options = {}) {
  let outdatedCommand = "npm outdated --json";

  try {
    const outdatedPackages = await execP(outdatedCommand);
    if (outdatedPackages.length) {
      warn(formatOutdatedPackages(outdatedPackages));
    }
  } catch (err) {
    fail("npm audit plugin error: " + error.message);
  }
}
