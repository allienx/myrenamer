import padStart from 'lodash/padStart.js'
import sortBy from 'lodash/sortBy.js'
import ApiClient from './tmdb/api-client.js'
import TmdbApi from './tmdb/tmdb-api.js'
import rename from './utils/rename.js'

export async function tv({ apiKey, dir, dryRun, tvId, season }) {
  const tmdbApi = new ApiClient({
    params: {
      api_key: apiKey,
    },
  })
  const { data: tvDetails } = await tmdbApi.send({
    method: 'GET',
    url: TmdbApi.tvDetailsUrl(tvId),
  })
  const { data: seasonDetails } = await tmdbApi.send({
    method: 'GET',
    url: TmdbApi.tvSeasonDetailsUrl(tvId, season),
  })
  const showName = tvDetails.name
  const episodes = seasonDetails.episodes || []

  console.log(`${showName} - Season ${season} - ${episodes.length} episodes\n`)

  await rename({
    dir,
    dryRun,

    // Assume the episode files are already in ascending order.
    getSortedPaths: sortBy,

    getNewName: ({ index, ext }) => {
      const episode = episodes[index]
      const episodeName = episode.name
      const seasonNumber = episode.season_number
      const episodeNumber = episode.episode_number

      const seasonStr = `s${padStart(seasonNumber, 2, '0')}`
      const episodeStr = `e${padStart(episodeNumber, 2, '0')}`
      const newName = `${showName} - ${seasonStr}${episodeStr} - ${episodeName}`
        .replace(/"/g, "'")
        .replace(/\?/g, '')
        .replace(/:/g, ' - ')

      return `${newName}${ext.toLowerCase()}`
    },
  })
}
