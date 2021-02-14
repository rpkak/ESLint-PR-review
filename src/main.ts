import * as core from '@actions/core'
import { context, getOctokit } from '@actions/github'
import { ESLint } from 'eslint'
import { readFileSync } from 'fs'
import { isAbsolute, join } from 'path'

const run = async (): Promise<void> => {
  try {
    if (context.eventName === 'pull_request') {
      const octokit = getOctokit(core.getInput('github-token'))

      let projectRoot = core.getInput('project-root')
      if (!isAbsolute(projectRoot)) {
        projectRoot = join(process.cwd(), projectRoot)
      }
      const eslint = new ESLint({
        cwd: projectRoot
      })
      core.debug(projectRoot)
      const resultArr = await eslint.lintFiles(core.getInput('src'))
      core.debug(JSON.stringify(resultArr))

      const comments = []
      for (const file of resultArr) {
        for (const message of file.messages) {
          if (message.fix) {
            const normalFileContent = readFileSync(file.filePath).toString()
            const normalLines = normalFileContent.split('\n')
            const fixedFileContent =
              normalFileContent.substr(0, message.fix.range[0]) +
              message.fix.text +
              normalFileContent.substr(message.fix.range[1])
            const fixedLines = fixedFileContent.split('\n')
            let startLine = 0
            while (normalLines[startLine] === fixedLines[startLine]) {
              startLine++
            }
            const difference = normalLines.length - fixedLines.length
            let line = normalLines.length
            while (normalLines[line] === fixedLines[line - difference]) {
              line--
            }

            const newLines = fixedLines.slice(startLine, line - difference + 1)

            startLine++
            line++

            comments.push({
              path: file.filePath.replace(`${process.cwd()}/`, ''),
              body: `${message.message}\n\`\`\`suggestion\n${newLines.join(
                '\n'
              )}\n\`\`\``,
              start_line: startLine === line ? undefined : startLine,
              line
            })
          } else {
            comments.push({
              path: file.filePath.replace(`${process.cwd()}/`, ''),
              body: message.message,
              start_line:
                message.line === message.endLine ? undefined : message.line,
              line: message.endLine
            })
          }
        }
      }


      for (const i in comments) {


      }
      let review;
      if (true) {
        // await octokit.pulls.createReview({
        //   owner: context.payload.pull_request?.base.repo.owner.login as string,
        //   repo: context.payload.pull_request?.base.repo.name as string,
        //   pull_number: context.payload.pull_request?.number as number,
        //   event: 'REQUEST_CHANGES',
        //   comments,

        // })
        review = await octokit.request(
          'POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews',
          {
            ...context.repo,
            pull_number: context.payload.pull_request?.number as number,
            body: 'ody',
            comments,
            headers: {
              accept: 'application/vnd.github.v3+json'
            }
          }
        )
      } else {
        await octokit.pulls.createReview({
          owner: context.payload.pull_request?.base.repo.owner.login as string,
          repo: context.payload.pull_request?.base.repo.name as string,
          pull_number: context.payload.pull_request?.number as number,
          event: 'APPROVE'
        })
      }
      await octokit.request(
        'POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events',
        {
          ...context.repo,
          event: 'REQUEST_CHANGES',
          pull_number: context.payload.pull_request?.number as number,
          review_id: review.data.id
        }
      )
    }
  } catch (error) {
    // core.info(error)
    core.setFailed(error.message)
  }
}

run()
