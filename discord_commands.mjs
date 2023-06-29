#!/usr/bin/env node

import config from './config.mjs'
import { SlashCommandBuilder, REST, Routes } from 'discord.js'
import { new_spit, append as spit_append } from './spits.mjs'

export let commands = {
    spit: new SlashCommandBuilder ()
        .setName ('spit')
        .setDescription ('spit')
        .addStringOption (function (option) {
            return option
                .setName ('text')
                .setDescription ('text')
                .setRequired (true)
        }),

    link: new SlashCommandBuilder ()
        .setName ('link')
        .setDescription ('link'),
}

export let handlers = {
    spit: function (interaction) {
        let spit = new_spit ({
            user: interaction.user.username,
            spit: interaction.options .getString ('text')
        })
        spit_append (spit)
        interaction .reply (`${interaction.options .getString ('text')}`)
    },

    link: function (interaction) {
        interaction .reply (`${config.url}`)
    },

    '💦': function (reaction) {
        let spit = new_spit ({
            timestamp: reaction.message.createdTimestamp,
            user: reaction.message.author.username,
            spit: reaction.message.content,
        })
        spit_append (spit)
    }
}

export async function register_commands () {
    let body = Object .values (commands)
    let rest = new REST () .setToken (config.discord_token)
    let response = await rest .put (Routes .applicationCommands (config.discord_application), { body })
    return response
}

export let register_response = await register_commands ()
