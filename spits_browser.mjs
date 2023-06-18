#!/usr/bin/env node

export async function read (text) {
    let data = []
    if (! text) return data

    let lines = text .split ("\n")
    for (let line of lines) {
        if (! line) continue

        let record = JSON .parse (line)
        data .push (record)
    }
    return data
}
