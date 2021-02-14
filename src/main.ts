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
          let body = message.message
          if (message.fix) {
            core.info(
              readFileSync(file.filePath)
                .toString()
                .substr(
                  message.fix.range[0],
                  message.fix.range[1] - message.fix.range[0]
                )
            )
            core.info(
              '==================================================================='
            )
          }
          comments.push({
            path: file.filePath.replace(`${process.cwd()}/`, ''),
            body,
            start_line:
              message.line === message.endLine ? undefined : message.line,
            line: message.endLine
          })
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
