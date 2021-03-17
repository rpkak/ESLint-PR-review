#!/bin/bash

debug() {
    while read -r data; do
        echo "::debug::$data"
    done
}

cd "$1"

echo  "Install Project Packages:" | debug
npm ci | debug

eslint_json="$(node /ESLint-PR-review/lib/eslint.js "$2" "$4" "$6")"

cd "/github/workspace"

node /ESLint-PR-review/lib/main.js "$eslint_json" "$3" "$5"
