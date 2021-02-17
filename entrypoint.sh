#!/bin/bash

debug() {
    while read -r data; do
        echo "::debug::$data"
    done
}

echo  "Install ESLint-PR-review Packages:" | debug
npm ci --prefix /ESLint-PR-review | debug
ls
echo "Build ESLint-PR-review:" | debug
npm run build --prefix /ESLint-PR-review | debug
ls
echo "Install Project Packages:" | debug
npm ci --prefix $1 | debug

npm start --prefix /ESLint-PR-review
