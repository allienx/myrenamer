import path from 'path'

import flowFp from 'lodash/fp/flow.js'
import kebabCaseFp from 'lodash/fp/kebabCase.js'
import toLowerFp from 'lodash/fp/toLower.js'

export default function getNewFilename({ filePath }) {
  const { dir, name, ext } = path.parse(filePath)
  const newName = transformName(name)
  const newExt = transformExtension(ext)

  return path.join(dir, `${newName}${newExt}`)
}

function transformName(name) {
  const transform = flowFp(kebabCaseFp, toLowerFp)

  return transform(name)
}

function transformExtension(ext) {
  const transform = flowFp(toLowerFp, toJpg)

  return transform(ext)
}

function toJpg(ext) {
  const jpgExtensions = ['.jpg', '.jpeg']

  if (jpgExtensions.includes(ext)) {
    return '.jpg'
  }

  return ext
}
