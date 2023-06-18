#!/usr/bin/env node

import config from './config.mjs'
import { SlashCommandBuilder, REST, Routes } from 'discord.js'
import { new_spit, append as spit_append, reset as spit_reset } from './spits.mjs'

export let commands = {
    // ping: new SlashCommandBuilder ()
    //     .setName ('ping')
    //     .setDescription ('ping'),

    spit: new SlashCommandBuilder ()
        .setName ('spit')
        .setDescription ('spit')
        .addStringOption (function (option) {
            return option
                .setName ('text')
                .setDescription ('text')
                .setMaxLength (128)
                .setRequired (true)
        }),

    link: new SlashCommandBuilder ()
        .setName ('link')
        .setDescription ('link'),

    // reset: new SlashCommandBuilder ()
    //     .setName ('reset')
    //     .setDescription ('reset'),
}

export let handlers = {
    ping: function (interaction) {
        interaction .reply (`pong`)
    },

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

    reset: function (interaction) {
        spit_reset ()
        interaction .reply (`okay`)
    },
}

export async function register_commands () {
    let body = Object .values (commands)
    let rest = new REST () .setToken (config.discord_token)
    let response = await rest .put (Routes .applicationCommands (config.discord_application), { body })
    return response
}

export let register_response = await register_commands ()
