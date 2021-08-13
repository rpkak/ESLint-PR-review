FROM debian:stable-slim

COPY . /ESLint-PR-review

ENV NVM_DIR /usr/local/lib/nvm
RUN mkdir $NVM_DIR

RUN apt-get update && apt-get install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

ENTRYPOINT [ "/ESLint-PR-review/entrypoint.sh" ]
