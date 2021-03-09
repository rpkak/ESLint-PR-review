<h1 align="center">ESLint PR review</h1><p align="center"><a href="https://github.com/rpkak/ESLint-PR-review/actions/workflows/test.yml"><img src="https://github.com/rpkak/ESLint-PR-review/actions/workflows/test.yml/badge.svg"/></a> <a href="https://github.com/rpkak/ESLint-PR-review/issues"><img src="https://img.shields.io/github/issues/rpkak/ESLint-PR-review?style=flat-square"/></a> <a href="https://github.com/rpkak/ESLint-PR-review/pulls"><img src="https://img.shields.io/github/issues-pr/rpkak/ESLint-PR-review?style=flat-square"/></a> <a href="https://github.com/rpkak/ESLint-PR-review/stargazers"><img src="https://img.shields.io/github/stars/rpkak/ESLint-PR-review?style=flat-square"/></a> <a href="https://github.com/rpkak/ESLint-PR-review/releases"><img src="https://img.shields.io/github/v/release/rpkak/ESLint-PR-review?style=flat-square"/></a> <a href="https://github.com/rpkak/ESLint-PR-review/releases"><img src="https://img.shields.io/github/v/release/rpkak/eslint-pr-review?include_prereleases&label=pre-release&style=flat-square"/></a></p>


A simple workflow, that creates pull request reviews for ESLint problems

## Inputs

### `project-root`

The path to the directory, which includes files like `package.json` or `.eslintrc.json`.

Default: `.`

### `src`

What you want to lint. Relative to `project-root`.

Default: `.`

Example: `src` (Lints every lintable file in the source folder)

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
          src: src
          eslint-format: table
```

## Infos

Use `rpkak/ESLint-PR-review@latest` to get the latest none development version ESLint PR review.

Please report everything like bugs by creating an [issue](https://github.com/rpkak/ESLint-PR-review/issues/new/choose).

Version: v1.0.1

by [rpkak](https://github.com/rpkak)
