#!/usr/bin/env node

let config = {
    discord_application: '1117233923034972222',
    discord_secret: 'MTExNzIzMzkyMzAzNDk3MjIyMg.GFjetT.p5auhKK-viMecVGVuwpKqNXMMoy-UEatiH6NPg',
    fastify_port: 8001,
}

Object .assign (config, process.env)

export default config
