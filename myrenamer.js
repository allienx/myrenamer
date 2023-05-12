#!/usr/bin/env node

import { Command } from 'commander'
import round from 'lodash/round.js'

import tv from './src/tv.js'

const program = new Command()

async function main() {
  program
    .name('myrenamer')
    .version('1.0.0')
    .description('Script for renaming files in bulk.')

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
