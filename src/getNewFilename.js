import path from 'path'

export default function getNewFilename({ index, filePaths }) {
  return filePaths.map((filePath) => {
    const { dir, ext } = path.parse(filePath)

    const newName = `img-${index.toString().padStart(4, '0')}`

    return path.join(dir, `${newName}${ext}`)
  })
}
