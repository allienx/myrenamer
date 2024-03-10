#!/usr/bin/env node

import { Command } from 'commander'
import round from 'lodash/round.js'

import { run } from './src/run.js'
import { tv } from './src/tv.js'

const start = Date.now()

main()
  .catch((err) => {
    console.error(err)
  })
  .finally(() => {
    const end = Date.now()
    const duration = round((end - start) / 1000, 2)

    console.log(`✨  Done ${duration}s.`)
  })

async function main() {
  const program = new Command()

  program
    .name('myrenamer')
    .version('1.0.0')
    .description('Script for renaming files in bulk.')

  program
    .command('run <dir>', { isDefault: true })
    .description('Rename files in <dir> according to options')
    .option(
      '--dry-run',
      'log new file paths without performing any action',
      false,
    )
    .option('-r, --recursive', 'find files in nested directories', false)
    .option('--sort-a-z', 'sort the files alphabetically', false)
    .option('--no-preserve', "don't preserve the original file name", false)
    .option('-l, --lowercase', 'transform file names to lowercase', false)
    .option('-p, --prefix <prefix>', 'add a prefix to each file name')
    .option('-s, --suffix <suffix>', 'add a suffix to each file name')
    .option(
      '-i, --increment <increment>',
      'add an incremented number suffix to each file name',
    )
    .action(async (dir, opts) => {
      await run({
        dir,
        ...opts,
      })
    })

  program
    .command('tv <dir>')
    .description('Rename TV episode files found in <dir>.')
    .option(
      '--dry-run',
      'log new file paths without performing any action',
      false,
    )
    .requiredOption('-k, --apiKey <apiKey>', 'TMDB API key')
    .requiredOption('-i, --tvId <tvId>', 'TMDB TV id')
    .requiredOption('-s, --season <season>', "the season's episodes to rename")
    .action(async (dir, opts) => {
      const { apiKey, dryRun, tvId, season } = opts

      await tv({ apiKey, dir, dryRun, tvId, season })
    })

  await program.parseAsync(process.argv)
}
