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

fastify.get ('/spits.mjs', function (request, reply) {
    reply.type ('text/javascript')
    let file = createReadStream ('./spits.mjs')
    reply.send (file)
})

fastify.get ('/spits.txt', function (request, reply) {
    reply.type ('text/plain')
    let file = createReadStream ('./spits.txt')
    reply.send (file)
})

fastify.get ('/spoo.json', function (request, reply) {
    reply.send (spoo)
})

fastify .listen ({ port: config.fastify_port }, function (error, address) {
    console .log (new Date (), 'fastify:', address, 'ready!')
})

export default fastify
