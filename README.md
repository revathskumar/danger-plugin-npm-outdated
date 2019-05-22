## danger-plugin-npm-outdated

> Danger plugin which will give attention to `npm outdated` packages.

## Usage

Install:

```sh
npm i -D danger-plugin-npm-outdated
```

At a glance:

```js
// dangerfile.js
import { schedule } from "danger";
import npmOutdated from "danger-plugin-npm-outdated";

// Note: You need to use schedule()
schedule(npmOutdated());
```

## Sample message

![sample message](https://raw.githubusercontent.com/revathskumar/danger-plugin-npm-audit/master/images/message.png)

## License

Please see [License](https://github.com/revathskumar/danger-plugin-npm-outdated/blob/master/License)
