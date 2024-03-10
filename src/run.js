import compact from 'lodash/compact.js'
import sortBy from 'lodash/sortBy.js'
import rename from './utils/rename.js'

export async function run({
  dir,
  dryRun,
  recursive,
  sortAZ,
  preserve,
  lowercase,
  prefix,
  suffix,
  increment,
}) {
  const separator = '-'

  await rename({
    dir,
    dryRun,
    recursive,

    getSortedPaths: sortAZ ? sortBy : undefined,

    getNewName: ({ index, name, ext }) => {
      let newName = preserve ? name : ''
      let newExt = ext

      if (lowercase) {
        newName = newName.toLowerCase()
        newExt = newExt.toLowerCase()
      }

      if (prefix) {
        newName = compact([prefix, newName]).join(separator)
      }

      if (suffix) {
        newName = compact([newName, suffix]).join(separator)
      }

      // Add one to the index to avoid zero based increments.
      if (increment) {
        const num = index + 1
        const numWithPadding = num.toString().padStart(increment, '0')

        newName = compact([newName, numWithPadding]).join(separator)
      }

      return newName + newExt
    },
  })
}
