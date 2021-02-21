![GitHub Workflow Status](https://img.shields.io/github/workflow/status/rpkak/ESLint-PR-review/build-test?label=lint&style=flat-square) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/rpkak/ESLint-PR-review?style=flat-square) ![GitHub repo size](https://img.shields.io/github/repo-size/rpkak/ESLint-PR-review?style=flat-square) ![GitHub issues](https://img.shields.io/github/issues/rpkak/ESLint-PR-review?style=flat-square) ![GitHub pull requests](https://img.shields.io/github/issues-pr/rpkak/ESLint-PR-review?style=flat-square) ![GitHub Repo stars](https://img.shields.io/github/stars/rpkak/ESLint-PR-review?style=flat-square) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/rpkak/ESLint-PR-review?style=flat-square) ![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/rpkak/eslint-pr-review?include_prereleases&label=pre-release&style=flat-square)

# ESLint PR review

A simple workflow, that creates pull request reviews for ESLint problems

## Inputs

### `project-root`

The path to the directory, which includes files like `package.json` or `.eslintrc.json`.

Default: `.`

### `src`

What you want to lint. Relative to `project-root`.

Default: `./**/*`

Example: `./src/**/*.ts` (Lints every typescript file in the source folder)

### `github-token`

The GitHub Token of the repository. It is needed for reviewing the Pull Requests.

**Required**

Example: `${{ secrets.GITHUB_TOKEN }}`

### `eslint-format`

The [ESLint Format](https://eslint.org/docs/user-guide/formatters/) to print the linting result to the GitHub Actions log

Default: `stylish`

Examples: `codeframe`, `compact`, `table`, `tap`, `unix`, `visualstudio`

### `approve-mode`

If `approve-mode` is `after-change-request` the bot will only approve, if the pull request isn't approved by ESLint PR review yet.

Default: `approve-always`

Example: `after-change-request`

## Example usage:
```yaml
name: ESLint PR review

on:
  push:

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: rpkak/ESLint-PR-review@latest
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          src: ./src/**/*.ts
          eslint-format: table
```

## Infos

Use `rpkak/ESLint-PR-review@latest` to get the latest none development version ESLint PR review.

Please report everything like bugs by creating an [issue](https://github.com/rpkak/ESLint-PR-review/issues/new/choose).

Version: v0.0.6 Alpha

by [rpkak](https://github.com/rpkak)
