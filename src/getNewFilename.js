import path from 'path'

import last from 'lodash/last.js'

export default function getNewFilename({ index, filePath }) {
  const {dir, name, ext} = path.parse(filePath)

  const newName = last(name.split('_'))

  return path.join(dir, `${newName}${ext}`)
}
