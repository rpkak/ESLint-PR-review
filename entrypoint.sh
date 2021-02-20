#!/bin/bash

debug() {
    while read -r data; do
        echo "::debug::$data"
    done
}

echo  "Install ESLint-PR-review Packages:" | debug
npm ci --prefix /ESLint-PR-review | debug

echo "Build ESLint-PR-review:" | debug
npm run build --prefix /ESLint-PR-review | debug

node /ESLint-PR-review/lib/main.js $1 $2 $3 $4
