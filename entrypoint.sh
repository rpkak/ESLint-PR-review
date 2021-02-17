#!/bin/bash

deou() {
    while read -r data; do
        echo "::debug::$data"
    done
}

echo  "Install ESLint-PR-review Packages:" | deou
npm ci --prefix /ESLint-PR-review | deou
echo | deou

echo "Install Project Packages:" | deou
npm ci --prefix $1 | deou
echo | deou


