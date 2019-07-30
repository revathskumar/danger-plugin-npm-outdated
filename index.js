"use strict";
const exec = require("child_process").exec;

const formatOutdatedPackages = (outdatedPackages = {}, packageNames = []) => {
  const headers = [
    "| Package | Current | Wanted | latest |",
    "|---------|---------|--------|--------|"
  ];
  const content = packageNames.map(packageName => {
    const { current, wanted, latest } = outdatedPackages[packageName];
    return `| ${packageName} | ${current} | ${wanted} | ${latest} |`;
  });
  return headers.concat(content).join("\n");
};

const execP = outdatedCommand => {
  return new Promise((resolve, reject) => {
    const execOptions = { maxBuffer: 10 * 1024 * 1024 };
    exec(outdatedCommand, execOptions, function(error, stdout, stderr) {
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
    const packageNames = Object.keys(outdatedPackages);
    if (packageNames.length) {
      const packagesTable = formatOutdatedPackages(
        outdatedPackages,
        packageNames
      );

      warn(`You have ${packageNames.length} outdated packages`);
      markdown(`

<details>
    <summary>Outdated Packages</summary>

${packagesTable}

</details>


    `);
    }
  } catch (err) {
    fail("npm audit plugin error: " + error.message);
  }
}
