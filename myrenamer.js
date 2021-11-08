#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

import { Command } from 'commander'

import processPath from './src/processPath.js'

const program = new Command()

program.version('1.0.0')

program
  .argument('<src>')
  .option('--dirs', 'rename directories instead of files')
  .option('-d, --dest <dest>', 'directory path for renamed files')
  .action((src, options) => {
    const srcStats = fs.lstatSync(src)

    if (!srcStats.isDirectory()) {
      console.log(`The path "${src}" MUST be a directory...`)

      return
    }

    const { dir, base } = path.parse(src)
    const dest = options.dest || path.join(dir, `${base}-myrenamer`)

    const { numDirectories, numFiles } = processPath({
      renameDirectories: options.dirs,
      src,
      dest,
    })

    if (options.dirs) {
      console.log(`Renamed ${numDirectories} directories.`)
    } else {
      console.log(`Renamed ${numFiles} files.`)
    }
  })

const start = Date.now()

program.parse(process.argv)

const end = Date.now()
const seconds = (end - start) / 1000
const rounded = seconds.toFixed(2)

console.log(`\n✨  Done in ${rounded}s.`)
