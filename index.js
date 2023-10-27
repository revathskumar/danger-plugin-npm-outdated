"use strict";
const exec = require("child_process").exec;

const formatOutdatedPackages = (outdatedPackages = {}, packageNames = [], options = {}) => {
  const headers = [
    `| Package | Current | Wanted | latest |${options.prodOnly ? '' : ' kind |'}`,
    `|---------|---------|--------|--------|${options.prodOnly ? '' : '------|'}`
  ];
  const content = packageNames.map(packageName => {
    const { current, wanted, latest, type } = outdatedPackages[packageName];
    return `| ${packageName} | ${current} | ${wanted} | ${latest} |${options.prodOnly ? '' : `${type} |`}`;
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

export default async function npmOutdated(options = {
  prodOnly: false,
}) {
  let outdatedCommand = "npm outdated --json --long";

  if (options.prodOnly){
    outdatedCommand += ' --production'
  }

  try {
    const outdatedPackages = await execP(outdatedCommand);
    const packageNames = Object.keys(outdatedPackages);
    if (packageNames.length) {
      const packagesTable = formatOutdatedPackages(
        outdatedPackages,
        packageNames,
        options
      );

      warn(`You have ${packageNames.length} outdated ${options.prodOnly ? 'production' : ''} packages`);
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
