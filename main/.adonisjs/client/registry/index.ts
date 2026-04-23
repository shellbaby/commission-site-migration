/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'clients.store': {
    methods: ["POST"],
    pattern: '/v1/client',
    tokens: [{"old":"/v1/client","type":0,"val":"v1","end":""},{"old":"/v1/client","type":0,"val":"client","end":""}],
    types: placeholder as Registry['clients.store']['types'],
  },
  'client.clients.show': {
    methods: ["GET","HEAD"],
    pattern: '/v1/client',
    tokens: [{"old":"/v1/client","type":0,"val":"v1","end":""},{"old":"/v1/client","type":0,"val":"client","end":""}],
    types: placeholder as Registry['client.clients.show']['types'],
  },
  'client.clients.update': {
    methods: ["PATCH"],
    pattern: '/v1/client',
    tokens: [{"old":"/v1/client","type":0,"val":"v1","end":""},{"old":"/v1/client","type":0,"val":"client","end":""}],
    types: placeholder as Registry['client.clients.update']['types'],
  },
  'client.clients.destroy': {
    methods: ["DELETE"],
    pattern: '/v1/client',
    tokens: [{"old":"/v1/client","type":0,"val":"v1","end":""},{"old":"/v1/client","type":0,"val":"client","end":""}],
    types: placeholder as Registry['client.clients.destroy']['types'],
  },
  'auth.emails.verify': {
    methods: ["GET","HEAD"],
    pattern: '/v1/auth/verify/:uuid',
    tokens: [{"old":"/v1/auth/verify/:uuid","type":0,"val":"v1","end":""},{"old":"/v1/auth/verify/:uuid","type":0,"val":"auth","end":""},{"old":"/v1/auth/verify/:uuid","type":0,"val":"verify","end":""},{"old":"/v1/auth/verify/:uuid","type":1,"val":"uuid","end":""}],
    types: placeholder as Registry['auth.emails.verify']['types'],
  },
  'auth.session.store': {
    methods: ["POST"],
    pattern: '/v1/auth/signin',
    tokens: [{"old":"/v1/auth/signin","type":0,"val":"v1","end":""},{"old":"/v1/auth/signin","type":0,"val":"auth","end":""},{"old":"/v1/auth/signin","type":0,"val":"signin","end":""}],
    types: placeholder as Registry['auth.session.store']['types'],
  },
  'auth.session.destroy': {
    methods: ["GET","HEAD"],
    pattern: '/v1/auth/signout',
    tokens: [{"old":"/v1/auth/signout","type":0,"val":"v1","end":""},{"old":"/v1/auth/signout","type":0,"val":"auth","end":""},{"old":"/v1/auth/signout","type":0,"val":"signout","end":""}],
    types: placeholder as Registry['auth.session.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
