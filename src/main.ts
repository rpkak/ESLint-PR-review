import * as core from '@actions/core'
import { context, getOctokit } from '@actions/github'
import { ESLint } from 'eslint'
import { readFileSync } from 'fs'
import { isAbsolute, join } from 'path'
import { argv } from 'process'

const run = async (): Promise<void> => {
  try {
    let projectRoot = argv[2]
    if (!isAbsolute(projectRoot)) {
      projectRoot = join(process.cwd(), projectRoot)
    }
    const eslint = new ESLint({
      cwd: projectRoot
    })

    const resultArr = await eslint.lintFiles(argv[3])
    console.log(context)
    if (context.eventName === 'pull_request') {
      const octokit = getOctokit(argv[4])

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
              path: file.filePath.replace(`${process.cwd()}/`, '/'),
              body: `${message.message}\n\`\`\`suggestion\n${newLines.join(
                '\n'
              )}\n\`\`\``,
              start_line: startLine === line ? undefined : startLine,
              line
            })
          } else {
            comments.push({
              path: file.filePath.replace(`${process.cwd()}/`, '/'),
              body: message.message,
              start_line:
                message.line === message.endLine ? undefined : message.line,
              line: message.endLine
            })
          }
        }
      }
      console.log(comments)

      for (const comment of comments) {
        const reviewComment = await octokit.pulls.createReviewComment({
          ...context.repo,
          pull_number: context.payload.pull_request?.number as number,
          ...comment
        })
      }

      // const review = await octokit.pulls.createReview({
      //   ...context.repo,
      //   pull_number: context.payload.pull_request?.number as number,
      //   body: comments.length
      //     ? `## ${comments.length} Problems found`
      //     : undefined,
      //   comments,
      //   headers: {
      //     accept: 'application/vnd.github.v3+json'
      //   }
      // })
      // await octokit.pulls.submitReview({
      //   ...context.repo,
      //   event: comments.length ? 'REQUEST_CHANGES' : 'APPROVE',
      //   pull_number: context.payload.pull_request?.number as number,
      //   review_id: review.data.id
      // })
      if (comments.length) {
        const formatter = await eslint.loadFormatter(argv[5])
        const formatted = formatter.format(resultArr)
        console.log("pr")
        core.setFailed(formatted)
      }
    } else {
      if (
        resultArr.reduce(
          (sum, result) => sum + result.errorCount + result.warningCount,
          0
        )
      ) {
        const formatter = await eslint.loadFormatter(argv[5])
        const formatted = formatter.format(resultArr)
        console.log("not pr")
        core.setFailed(formatted)
      }
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
