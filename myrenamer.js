#!/usr/bin/env node

import fs from 'fs'

import { Command } from 'commander'

import processPath from './src/processPath.js'

const program = new Command()

program.version('1.0.0')

program
  .argument('<src>')
  .option('--dry-run', 'log instead of perform rename', false)
  .option('--dirs', 'rename directories instead of files', false)
  .requiredOption('--prefix <prefix>', 'the filename prefix')
  .action((src, options) => {
    const srcStats = fs.lstatSync(src)

    if (!srcStats.isDirectory()) {
      console.log(`The path "${src}" MUST be a directory...`)

      return
    }

    const { numDirectories, numFiles } = processPath({
      dryRun: options.dryRun,
      renameDirectories: options.dirs,
      prefix: options.prefix,
      src,
    })

    if (options.dirs) {
      console.log(`\nRenamed ${numDirectories} directories.`)
    } else {
      console.log(`\nRenamed ${numFiles} files.`)
    }
  })

const start = Date.now()

program.parse(process.argv)

const end = Date.now()
const seconds = (end - start) / 1000
const rounded = seconds.toFixed(2)

console.log(`\n✨  Done in ${rounded}s.`)
