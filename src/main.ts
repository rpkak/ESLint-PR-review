import * as core from '@actions/core'
import {context, getOctokit} from '@actions/github'
import {ESLint} from 'eslint'
import {isAbsolute, join} from 'path'

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
          core.info(file.filePath.replace(process.cwd()+'/','.'))
          comments.push({
            path: file.filePath.replace(process.cwd()+'/','.'),
            body: message.message,
            // start_line: message.line,
            // start_side: 'RIGHT',
            // line: message.endLine,
            // side: 'RIGHT'
            position: 1
          })
        }
      }

      for (const i in comments) {


      }
      if (true) {
        // await octokit.pulls.createReview({
        //   owner: context.payload.pull_request?.base.repo.owner.login as string,
        //   repo: context.payload.pull_request?.base.repo.name as string,
        //   pull_number: context.payload.pull_request?.number as number,
        //   event: 'REQUEST_CHANGES',
        //   comments,
          
        // })
        octokit.request(
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
          event: 'APPROVE',
          headers:{
            accept: 'application/vnd.github.v3+json'
          }
        })
      }
    }
  } catch (error) {
    core.info(error)
    core.setFailed(error.message)
  }
}

run()
