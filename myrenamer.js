#!/usr/bin/env node

import { Command } from 'commander'
import round from 'lodash/round.js'

import lowercase from './src/lowercase.js'
import suffix from './src/suffix.js'
import tv from './src/tv.js'

const program = new Command()

async function main() {
  program
    .name('myrenamer')
    .version('1.0.0')
    .description('Script for renaming files in bulk.')

  program
    .command('lowercase <dir>')
    .description('Rename files in <dir> to lowercase.')
    .option(
      '--dry-run',
      'log new file paths without performing any action',
      false,
    )
    .option('-r, --recursive', 'find files in nested directories', false)
    .action(async (dir, opts) => {
      const { dryRun, recursive } = opts

      await lowercase({ dir, dryRun, recursive })
    })

  program
    .command('suffix <dir>')
    .description('Rename files in <dir> with the specified suffix.')
    .option(
      '--dry-run',
      'log new file paths without performing any action',
      false,
    )
    .option('-r, --recursive', 'find files in nested directories', false)
    .requiredOption(
      '-w, --word <word>',
      'the suffix to append to every file name',
    )
    .action(async (dir, opts) => {
      const { dryRun, recursive, word } = opts

      await suffix({ dir, dryRun, recursive, word })
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
