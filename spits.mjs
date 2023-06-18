#!/usr/bin/env node

import { readFile, appendFile, writeFile } from 'node:fs/promises'

export let options = {
    file: './spits.txt'
}

export function new_spit (options) {
    let spit = {
        timestamp: Date .now (),
        user: undefined,
        spit: undefined,
        ... options
    }
    return spit
}

export async function read () {
    let data = []
    let file_contents = await readFile (options.file, { encoding: 'utf8' })
    if (! file_contents) return data

    let lines = file_contents .split ("\n")
    for (let line of lines) {
        if (! line) continue

        let record = JSON .parse (line)
        data .push (record)
    }
    return data
}

export async function append (record) {
    if (! record) return

    let line = JSON .stringify (record) + "\n"
    await appendFile (options.file, line)
}

export async function reset () {
    await writeFile (options.file, '')
}

export async function trim () {
    let data = await read ()
    let data_trimmed = data .slice (-1000)

    await reset ()

    for (let record of data_trimmed) {
        append (record)
    }
}
