#!/bin/bash

debug() {
    echo "::debug::$1"
}

debug "Install ESLint-PR-review Packages:"
debug "$(npm ci --prefix /ESLint-PR-review)"
debug ""

debug "Install Project Packages:"
debug "$(npm ci --prefix $1)"
debug ""
