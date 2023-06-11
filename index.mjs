#!/usr/bin/env node

import config from './config.mjs'
import discord from './discord.mjs'
import fastify from './fastify.mjs'

process.title = config.name
