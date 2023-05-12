const tmdbApiUrl = 'https://api.themoviedb.org/3'

export default class TmdbApi {
  static tvDetailsUrl(tvId) {
    return `${tmdbApiUrl}/tv/${tvId}`
  }

  static tvSeasonDetailsUrl(tvId, seasonNum) {
    return `${tmdbApiUrl}/tv/${tvId}/season/${seasonNum}`
  }
}
