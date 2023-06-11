#!/usr/bin/env node

let config = {
    discord_appid: '1117233923034972222',
    discord_token: 'MTExNzIzMzkyMzAzNDk3MjIyMg.GxG511.hax7LIjwdWMg9YjQp40UU0Ng9jBQlnQ766siTM',
    fastify_port: 8001,
}

Object .assign (config, process.env)

export default config
