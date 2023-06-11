#!/usr/bin/env node

let base_url = 'https://query1.finance.yahoo.com/v8/finance/chart/'
let symbol = 'ES=F'
let interval = '5m'
let range = '5d'

let url = `${base_url}${symbol}?&interval=${interval}&range=${range}`
let response = await fetch (url)
let json = await response.json ()
let result = json.chart.result[0]

let spoo = []
for (let i = 0; i <= result.timestamp.length; i++) {
    let date = new Date (result.timestamp[i] * 1000)

    let timestamp = date.getTime ()
    let price = result.indicators.quote[0].close[i]

    let quote = {
        timestamp,
        price,
    }
    spoo .push (quote)
}

export default spoo
