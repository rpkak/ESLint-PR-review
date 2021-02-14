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

Use `rpkak/ESLint-PR-review@latest` to get the latest version ESLint PR review.

Please report everything like bugs by creating an [issue](https://github.com/rpkak/ESLint-PR-review/issues/new/choose).

Version: v0.0.2 Alpha

by [rpkak](https://github.com/rpkak)
