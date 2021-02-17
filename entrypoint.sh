#!/bin/bash

echo "::debug::Install ESLint-PR-review Packages:"
echo "::debug::$(npm ci --prefix /ESLint-PR-review)"
echo "::debug::"

echo "::debug::Install Project Packages:"
echo "::debug::$(npm ci --prefix $1)"
echo "::debug::"
