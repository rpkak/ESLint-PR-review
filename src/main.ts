import * as core from '@actions/core'
import {context, getOctokit} from '@actions/github'
import {ESLint} from 'eslint'
import {isAbsolute, join} from 'path'

async function run(): Promise<void> {
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
          comments.push({
            path: file.filePath,
            body: message.message,
            start_line: message.line,
            line: message.endLine
          })
        }
      }

      for(const i in comments){


      }

      if (comments) {
        octokit.pulls.createReview({
          owner: context.payload.pull_request?.base.repo.owner.login as string,
          repo: context.payload.pull_request?.base.repo.name as string,
          pull_number: context.payload.pull_request?.number as number,
          event: 'REQUEST_CHANGES',
          comments
        })
      } else {
        octokit.pulls.createReview({
          owner: context.payload.pull_request?.base.repo.owner.login as string,
          repo: context.payload.pull_request?.base.repo.name as string,
          pull_number: context.payload.pull_request?.number as number,
          event: 'APPROVE'
        })
      }
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
