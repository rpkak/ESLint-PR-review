import * as core from '@actions/core'
import {context} from '@actions/github'

async function run(): Promise<void> {
  try {
    if (context.eventName === 'pull_request') {
      core.info(JSON.stringify(context.payload.pull_request))
      let projectRoot = core.getInput('project-root')
      if (!projectRoot) {
        projectRoot = process.cwd()
        core.info(`project-root not set. Useing ${projectRoot}`)
      }
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
