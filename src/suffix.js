import rename from './utils/rename.js'

export default async function suffix({ dir, dryRun, recursive, word }) {
  await rename({
    dir,
    dryRun,
    recursive,

    getNewName: ({ name, ext }) => {
      return name + word + ext
    },
  })
}
