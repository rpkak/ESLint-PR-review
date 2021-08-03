#!/bin/bash

debug() {
    while read -r data; do
        echo "::debug::$data"
    done
}

cd "/ESLint-PR-review"

echo  "Install ESLint-PR-review Packages:" | debug
npm ci | debug

echo "Build ESLint-PR-review:" | debug
npm run build | debug

cd "/github/workspace"
cd "$1"

echo  "Install Project Packages:" | debug
npm ci | debug

eslint_json="$(node /ESLint-PR-review/lib/eslint.js "$2" "$4" "$6")"

echo "JSON output:" | debug
echo "$eslint_json" | debug

cd "/github/workspace"

node /ESLint-PR-review/lib/main.js "$eslint_json" "$3" "$5"
