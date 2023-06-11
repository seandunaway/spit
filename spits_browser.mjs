#!/usr/bin/env node

export async function read (text) {
    if (! text) return
    let lines = text .split ("\n")

    let data = []
    for (let line of lines) {
        if (! line) continue

        let record = JSON.parse (line)
        data .push (record)
    }
    return data
}
