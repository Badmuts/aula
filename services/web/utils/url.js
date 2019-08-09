export function baseUrl() {
    if (process.browser) {
        switch (location.hostname) {
            default:
                return `http://${location.hostname}:3000`
        }
    } else {
        switch (process.NODE_ENV) {
            default:
                return 'http://api-gateway'
        }
    }
}
