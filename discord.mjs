#!/usr/bin/env node

import config from './config.mjs'
import { Client } from 'discord.js'
import { handlers } from './discord_commands.mjs'

let client = new Client ({ intents: 1 })

client .on ('interactionCreate', function (interaction) {
    if (! interaction.isChatInputCommand) return
    try {
        handlers[interaction.commandName] (interaction)
    } catch { return }
})

client .on ('ready', function (client) {
    client.user .setPresence ({
        activities: [{
            type: 3,
            name: '/spit',
        }],
    })

    console .log (new Date (), 'discord:', client.user.tag, 'ready!')
})

client .login (config.discord_token)

export default client
