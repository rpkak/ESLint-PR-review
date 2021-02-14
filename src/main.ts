import * as core from '@actions/core'
import { context, getOctokit } from '@actions/github'
import { ESLint } from 'eslint'
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
      core.info(projectRoot)
      const resultArr = await eslint.lintFiles(core.getInput('src'))
      core.info(JSON.stringify(resultArr))

      // const comments = []
      // for (const file of resultArr) {
      //   for (const message of file.messages) {
      //     // comments.push({
      //     //   path: file.filePath,
      //     //   body: message.message,
      //     //   start_line: message.line,
      //     //   start_side: 'RIGHT',
      //     //   line: message.endLine,
      //     //   side: 'RIGHT'
      //     // })
      //     octokit.pulls.createReviewComment({
      //       ...context.repo,
      //       body: '',
      //       pull_number: context.payload.pull_request?.number as number,
      //       path: file.filePath,
      //       start_line: message.line,
      //       start_side: 'RIGHT',
      //       line: message.endLine,
      //       side: 'RIGHT'
      //     })
      //   }
      // }

      for (const i in comments) {


      }

      // if (comments) {
      // octokit.re
      await octokit.pulls.submitReview({
        ...context.repo,
        event: 'APPROVE',
        pull_number: context.payload.pull_request?.number as number,
        review_id: -1
      })
      // } else {
      //   await octokit.pulls.createReview({
      //     owner: context.payload.pull_request?.base.repo.owner.login as string,
      //     repo: context.payload.pull_request?.base.repo.name as string,
      //     pull_number: context.payload.pull_request?.number as number,
      //     event: 'APPROVE'
      //   })
      // }
    }
  } catch (error) {
    core.info(error)
    core.setFailed(error.message)
  }
}

run()
