#!/usr/bin/env node

import config from './config.mjs'
import { createReadStream } from 'node:fs'
import new_fastify from 'fastify'
import spoo from './spoo.mjs'

let fastify = new_fastify ()

fastify.get ('/', function (request, reply) {
    reply.type ('text/html')
    let file = createReadStream ('./index.html')
    reply.send (file)
})

fastify.get ('/spits_browser.mjs', function (request, reply) {
    reply.type ('text/javascript')
    let file = createReadStream ('./spits_browser.mjs')
    reply.send (file)
})

fastify.get ('/spits.txt', function (request, reply) {
    reply.type ('text/plain')
    let file = createReadStream ('./spits.txt')
    reply.send (file)
})

fastify.get ('/spoo.json', async function (request, reply) {
    let spoo_result = await spoo ()
    reply.send (spoo_result)
})

fastify .listen ({ port: config.fastify_port, host: config.fastify_host }, function (error, address) {
    console .log (new Date (), 'fastify:', address, 'ready!')
})

export default fastify
