import http, { handleError } from './../utils/http'

export class SearchService {
    search(query) {
        if (!query) return Promise.resolve([])
        return http(`/api/search?q=*${query}*`)
            .then(handleError)
            .then(res => res.json())
    }
}

const srv = new SearchService()
export default srv
