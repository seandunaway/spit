#!/usr/bin/env node

import config from './config.mjs'
import { Client } from 'discord.js'
import { handlers } from './discord_commands.mjs'

export let client = new Client ({ intents: 1 })

client .on ('interactionCreate', function (interaction) {
    if (! interaction.isChatInputCommand) return
    try {
        handlers[interaction.commandName] (interaction)
    } catch { return }
})

client .on ('ready', function (client) {
    console .log (new Date (), client.user.tag, 'ready!')
})

client .login (config.discord_secret)
