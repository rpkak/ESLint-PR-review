# ESLint PR review
## Version: v0.0.1 Alpha

A simple workflow, that creates pull request reviews for ESLint problems

Usage:
```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm ci
      - uses: ./
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          src: ./src/**
```

by [rpkak](https://github.com/rpkak)
