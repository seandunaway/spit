#!/usr/bin/env node

import config from './config.mjs'

let name = process.argv[2]
let spit_array = process.argv.slice(3, process.argv.length)
let spit_text = spit_array.join(' ')

if (!name || !spit_text) {
    console.error(`usage: ${process.argv[1]} <name> <spit>`)
    process.exit(1)
}

let response = await (await fetch(`${config.url}spit/${name}/${spit_text}`)).text()
console.log(response)
