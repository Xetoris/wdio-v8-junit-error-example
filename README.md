# wdio-v8-junit-error-example

A simple WDIO v8 project to demonstrate the error the JUnit reporter is encountering.
---

## Table of Contents

- [Description](#description)
- [How To Run](#how-to-run-this-project)
- [Overview](#quick-overview)

---

## Description

There seems to be a bug with WDIO v8's junit reporter.
This [reporter](https://www.npmjs.com/package/@wdio/junit-reporter) generates Junit report files for the reuslts of a
test run.

With v8, everything was switched to the ESM module system. It seems we get an ESM import error when running a WDIO v8
project on Windows, when using Typescript.

#### Error Text

```text
2023-01-10T05:39:09.489Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./config/problem.config.ts
[0-0] 2023-01-10T05:39:11.639Z INFO @wdio/local-runner: Run worker command: run
[0-0] 2023-01-10T05:39:12.009Z ERROR @wdio/local-runner: Failed launching test session: Error: Couldn't initialise "@wdio/junit-reporter".
[0-0] S:\Development\Github\wdio-v8-junit-error-example\node_modules\validator\es\index.js:1
[0-0] import toDate from './lib/toDate';
[0-0] ^^^^^^
[0-0] 
[0-0] SyntaxError: Cannot use import statement outside a module
[0-0]     at internalCompileFunction (node:internal/vm:74:18)
[0-0]     at wrapSafe (node:internal/modules/cjs/loader:1141:20)
[0-0]     at Module._compile (node:internal/modules/cjs/loader:1182:27)
[0-0]     at Module._extensions..js (node:internal/modules/cjs/loader:1272:10)
[0-0]     at Object.require.extensions.<computed> [as .js] (S:\Development\Github\wdio-v8-junit-error-example\node_modules\ts-node\src\index.ts:1608:43)
[0-0]     at Module.load (node:internal/modules/cjs/loader:1081:32)
[0-0]     at Function.Module._load (node:internal/modules/cjs/loader:922:12)
[0-0]     at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:169:29)
[0-0]     at ModuleJob.run (node:internal/modules/esm/module_job:194:25)
[0-0]     at safeImport (file:///S:/Development/Github/wdio-v8-junit-error-example/node_modules/@wdio/utils/build/utils.js:210:15)
[0-0]     at async initialisePlugin (file:///S:/Development/Github/wdio-v8-junit-error-example/node_modules/@wdio/utils/build/initialisePlugin.js:25:26)
[0-0]     at async BaseReporter._loadReporter (file:///S:/Development/Github/wdio-v8-junit-error-example/node_modules/@wdio/runner/build/reporter.js:178:30)
[0-0]     at async Promise.all (index 1)
[0-0]     at async BaseReporter.initReporters (file:///S:/Development/Github/wdio-v8-junit-error-example/node_modules/@wdio/runner/build/reporter.js:23:27)
[0-0]     at async Runner.run (file:///S:/Development/Github/wdio-v8-junit-error-example/node_modules/@wdio/runner/build/index.js:68:9)
[0-0] S:\Development\Github\wdio-v8-junit-error-example\node_modules\validator\es\index.js:1
[0-0] import toDate from './lib/toDate';
[0-0] ^^^^^^
[0-0]
[0-0] SyntaxError: Cannot use import statement outside a module
[0-0]     at internalCompileFunction (node:internal/vm:74:18)
[0-0]     at wrapSafe (node:internal/modules/cjs/loader:1141:20)
[0-0]     at Module._compile (node:internal/modules/cjs/loader:1182:27)
[0-0]     at Module._extensions..js (node:internal/modules/cjs/loader:1272:10)
[0-0]     at Object.require.extensions.<computed> [as .js] (S:\Development\Github\wdio-v8-junit-error-example\node_modules\ts-node\src\index.ts:1608:43)
[0-0]     at Module.load (node:internal/modules/cjs/loader:1081:32)
[0-0]     at Function.Module._load (node:internal/modules/cjs/loader:922:12)
[0-0]     at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:169:29)
[0-0]     at ModuleJob.run (node:internal/modules/esm/module_job:194:25)
[0-0] FAILED
```

---

## How to run this project

First, start by doing the normal things:

- Make sure you have node v18 installed (you could do v16+ really IIRC).
- Make sure you have Java installed (this demo uses selenium-standalone-service).
- Make sure you have Firefox installed (or update the two config files to use whatever browser).
- Run `npm install` in the root directory.

At this point, the project should be ready to run. There are two commands setup to kick off tests:

| command      | description                                                                                                         |
|--------------|---------------------------------------------------------------------------------------------------------------------|
| test         | Runs a working example that doesn't have the JUnit reporter                                                         |
| problem-test | Attempts to run with the addition of the JUnit reporter, which should generate a similar error to the example above |                                                                     

To run an example, simply run `npm run <command>`.

So to run the working example: `npm run test`.

And the error example: `npm run problem-test`.

---

## Quick overview

This project uses a few of the base packages to run WDIO v8 with the Mocha runner. It also sprinkles on Typescript support
utilizing the [ts-node](https://www.npmjs.com/package/ts-node) package.

You can view the [package.json](./package.json) to review what is installed along with the test scripts provided.

I've also included a [tsconfig.json](./tsconfig.json) file that targets es2020.

The [test](./tests/example.spec.ts) file is simply a copy of an [example](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/mocha/mocha.test.js)
from the WDIO project.

Lastly, there are two configuration files for WDIO:

[wdio.config.ts](./config/wdio.config.ts) that acts as our baseline. This runs our test file against Firefox using the
[selenium-standalone-service](https://webdriver.io/docs/selenium-standalone-service). It utilizes the [spec](https://webdriver.io/docs/spec-reporter)
reporter for output. Running this produces no errors on my machine.

[problem.config.ts](./config/problem.config.ts) that shows the error case. This is the same as the baseline configuration,
but it includes the [junit](https://webdriver.io/docs/junit-reporter) reporter. This is what gives us the error posted
above.

