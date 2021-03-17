FROM node

COPY . /ESLint-PR-review

WORKDIR /ESLint-PR-review

RUN ["npm", "ci"]

RUN ["npm", "run", "build"]

RUN ["find", "-type", "f", "-not", "-iname", "entrypoint.sh", "-a", "-not", "-iwholename", "./lib/*", "-delete"]

RUN ["find", "-type", "d", "-empty", "-delete"]

WORKDIR /github/workspace

ENTRYPOINT [ "/ESLint-PR-review/entrypoint.sh" ]
