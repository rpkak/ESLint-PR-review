import {argv} from 'process'
import {ESLint} from 'eslint'

const run = async (): Promise<void> => {
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
}

run()
