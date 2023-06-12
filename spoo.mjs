#!/usr/bin/env node

export default async function () {
    let base_url = 'https://query1.finance.yahoo.com/v8/finance/chart/'
    let symbol = 'ES=F'
    let interval = '2m'
    let range = '5d'
    let url = `${base_url}${symbol}?&interval=${interval}&range=${range}`

    let result
    try {
        let response = await fetch (url)
        let json = await response.json ()
        result = json.chart.result[0]
    } catch { return }

    let spoo = []
    for (let i = 0; i < result.timestamp.length; i++) {
        let date = new Date (result.timestamp[i] * 1000)

        let timestamp = date.getTime ()
        let price = result.indicators.quote[0].close[i]

        let quote = {
            timestamp,
            price,
        }
        spoo .push (quote)
    }
    return spoo
}
