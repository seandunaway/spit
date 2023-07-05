#!/usr/bin/env node

import config from './config.mjs'
import { Client } from 'discord.js'
import { handlers } from './discord_commands.mjs'

let client = new Client ({ intents: 34305 })

client .on ('interactionCreate', function (interaction) {
    if (! interaction.isChatInputCommand) return
    try {
        handlers[interaction.commandName] (interaction)
    } catch { return }
})

client .on ('messageReactionAdd', function (reaction) {
    if (reaction.message.author?.id == client.user?.id) return
    if (reaction.count != 1) return
    try {
        handlers[reaction.emoji.name] (reaction)
    } catch { return }
})

client .on ('announce_spit', async function (spit) {
    for (let channel_id of config.channels_announce_spit) {
        let channel = await client.channels .fetch (channel_id)
        if (! channel) return
        if (! channel .isTextBased()) return
        channel .send (`${spit.user}: ${spit.spit}`)
    }
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
