![GitHub Workflow Status](https://img.shields.io/github/workflow/status/rpkak/ESLint-PR-review/build-test?label=lint&style=flat-square) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/rpkak/ESLint-PR-review?style=flat-square) ![GitHub repo size](https://img.shields.io/github/repo-size/rpkak/ESLint-PR-review?style=flat-square) ![GitHub issues](https://img.shields.io/github/issues/rpkak/ESLint-PR-review?style=flat-square) ![GitHub pull requests](https://img.shields.io/github/issues-pr/rpkak/ESLint-PR-review?style=flat-square) ![GitHub Repo stars](https://img.shields.io/github/stars/rpkak/ESLint-PR-review?style=flat-square) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/rpkak/ESLint-PR-review?style=flat-square)

# ESLint PR review

A simple workflow, that creates pull request reviews for ESLint problems

Usage:
```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm ci
      - uses: rpkak/ESLint-PR-review@latest
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          src: ./src/**
```

Use `rpkak/ESLint-PR-review@latest` to get the latest none development version ESLint PR review.

Please report everything like bugs by creating an [issue](https://github.com/rpkak/ESLint-PR-review/issues/new/choose).

Version: v0.0.2 Alpha

by [rpkak](https://github.com/rpkak)
