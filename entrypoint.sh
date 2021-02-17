#!/bin/bash

debug() {
    while read -r data; do
        echo "::debug::$data"
    done
}

echo  "Install ESLint-PR-review Packages:" | debug
npm ci --prefix /ESLint-PR-review | debug
echo | debug

echo "Install Project Packages:" | debug
npm ci --prefix $1 | debug
echo | debug


