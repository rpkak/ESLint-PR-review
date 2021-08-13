#!/bin/bash

debug() {
    while read -r data; do
        echo "::debug::$data"
    done
}

\. "$NVM_DIR/nvm.sh"

echo "Install node v16.6 (for ESLint-PR-review):" | debug
nvm install v16.6 | debug

echo "Install node $7 (for Project Packages):" | debug
nvm install "$7" | debug

cd "/ESLint-PR-review"

echo  "Install ESLint-PR-review Packages:" | debug
nvm exec v16.6 npm ci | debug

echo "Build ESLint-PR-review:" | debug
nvm exec v16.6 npm run build | debug

cd "/github/workspace"
cd "$1"

echo "Install Project Packages:" | debug
nvm exec "$7" npm ci | debug


eslint_json="$(nvm exec --silent v16.6 node /ESLint-PR-review/lib/eslint.js "$2" "$4" "$6")"

echo "JSON output:" | debug
echo "$eslint_json" | debug

cd "/github/workspace"

nvm exec --silent v16.6 node /ESLint-PR-review/lib/main.js "$eslint_json" "$3" "$5"
