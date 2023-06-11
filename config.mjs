#!/usr/bin/env node

let config = {
    discord_application: '1117233923034972222',
    discord_token: ['MTExNzIzMzkyMzAzNDk3MjIyMg.GpLYS1.Xq', '_2skpQeSSFup43nJoUFJGRi5UaRU9iky_fMw'] . join (''),
    fastify_port: 8001,
}

Object .assign (config, process.env)

export default config
