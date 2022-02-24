import path from 'path'

export default function getNewFilename({ index, prefix, filePath }) {
  const { dir, ext } = path.parse(filePath)

  const newName = `${prefix}-${(index + 1).toString().padStart(4, '0')}`

  return path.join(dir, `${newName}${ext}`.toLowerCase())
}
