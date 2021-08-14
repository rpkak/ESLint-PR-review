import * as core from '@actions/core'
import {ESLint} from 'eslint'
import {argv} from 'process'

const run = async (): Promise<void> => {
  try {
    const eslint = new ESLint({
      extensions: argv[4].split(',')
    })

    const resultArr = await eslint.lintFiles(argv[2])
    const formatter = await eslint.loadFormatter(argv[3])
    const formatted = formatter.format(resultArr)
    // eslint-disable-next-line no-console
    console.log(
      JSON.stringify({
        resultArr,
        formatted
      })
    )
  } catch (error) {
    core.setFailed(error.stack)
  }
}

run()
