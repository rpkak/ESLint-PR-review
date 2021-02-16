FROM node

COPY . /ESLint-PR-review

ENTRYPOINT [ "/ESLint-PR-review/entrypoint.sh" ]
