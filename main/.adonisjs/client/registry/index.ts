/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'link.home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['link.home']['types'],
  },
  'link.price': {
    methods: ["GET","HEAD"],
    pattern: '/price',
    tokens: [{"old":"/price","type":0,"val":"price","end":""}],
    types: placeholder as Registry['link.price']['types'],
  },
  'link.tos': {
    methods: ["GET","HEAD"],
    pattern: '/tos',
    tokens: [{"old":"/tos","type":0,"val":"tos","end":""}],
    types: placeholder as Registry['link.tos']['types'],
  },
  'link.gallery': {
    methods: ["GET","HEAD"],
    pattern: '/gallery',
    tokens: [{"old":"/gallery","type":0,"val":"gallery","end":""}],
    types: placeholder as Registry['link.gallery']['types'],
  },
  'link.contact': {
    methods: ["GET","HEAD"],
    pattern: '/contact',
    tokens: [{"old":"/contact","type":0,"val":"contact","end":""}],
    types: placeholder as Registry['link.contact']['types'],
  },
  'link.form': {
    methods: ["GET","HEAD"],
    pattern: '/form',
    tokens: [{"old":"/form","type":0,"val":"form","end":""}],
    types: placeholder as Registry['link.form']['types'],
  },
  'link.profile': {
    methods: ["GET","HEAD"],
    pattern: '/profile',
    tokens: [{"old":"/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['link.profile']['types'],
  },
  'link.signin': {
    methods: ["GET","HEAD"],
    pattern: '/signin',
    tokens: [{"old":"/signin","type":0,"val":"signin","end":""}],
    types: placeholder as Registry['link.signin']['types'],
  },
  'link.signin-alias': {
    methods: ["GET","HEAD"],
    pattern: '/sign-in',
    tokens: [{"old":"/sign-in","type":0,"val":"sign-in","end":""}],
    types: placeholder as Registry['link.signin-alias']['types'],
  },
  'link.signout': {
    methods: ["GET","HEAD"],
    pattern: '/signout',
    tokens: [{"old":"/signout","type":0,"val":"signout","end":""}],
    types: placeholder as Registry['link.signout']['types'],
  },
  'link.signout-alias': {
    methods: ["GET","HEAD"],
    pattern: '/sign-out',
    tokens: [{"old":"/sign-out","type":0,"val":"sign-out","end":""}],
    types: placeholder as Registry['link.signout-alias']['types'],
  },
  'link.signup': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['link.signup']['types'],
  },
  'link.signup-alias': {
    methods: ["GET","HEAD"],
    pattern: '/sign-up',
    tokens: [{"old":"/sign-up","type":0,"val":"sign-up","end":""}],
    types: placeholder as Registry['link.signup-alias']['types'],
  },
  'link.emails.verify': {
    methods: ["GET","HEAD"],
    pattern: '/verify/:uuid',
    tokens: [{"old":"/verify/:uuid","type":0,"val":"verify","end":""},{"old":"/verify/:uuid","type":1,"val":"uuid","end":""}],
    types: placeholder as Registry['link.emails.verify']['types'],
  },
  'link.verify-instruction': {
    methods: ["GET","HEAD"],
    pattern: '/verify',
    tokens: [{"old":"/verify","type":0,"val":"verify","end":""}],
    types: placeholder as Registry['link.verify-instruction']['types'],
  },
  'client.clients.store': {
    methods: ["POST"],
    pattern: '/api/v1/clients',
    tokens: [{"old":"/api/v1/clients","type":0,"val":"api","end":""},{"old":"/api/v1/clients","type":0,"val":"v1","end":""},{"old":"/api/v1/clients","type":0,"val":"clients","end":""}],
    types: placeholder as Registry['client.clients.store']['types'],
  },
  'client.clients.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/clients/:id',
    tokens: [{"old":"/api/v1/clients/:id","type":0,"val":"api","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"clients","end":""},{"old":"/api/v1/clients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['client.clients.show']['types'],
  },
  'client.clients.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/clients/:id',
    tokens: [{"old":"/api/v1/clients/:id","type":0,"val":"api","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"clients","end":""},{"old":"/api/v1/clients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['client.clients.update']['types'],
  },
  'client.clients.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/clients/:id',
    tokens: [{"old":"/api/v1/clients/:id","type":0,"val":"api","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"clients","end":""},{"old":"/api/v1/clients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['client.clients.destroy']['types'],
  },
  'client.commissions.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/commissions',
    tokens: [{"old":"/api/v1/commissions","type":0,"val":"api","end":""},{"old":"/api/v1/commissions","type":0,"val":"v1","end":""},{"old":"/api/v1/commissions","type":0,"val":"commissions","end":""}],
    types: placeholder as Registry['client.commissions.index']['types'],
  },
  'client.commissions.store': {
    methods: ["POST"],
    pattern: '/api/v1/commissions',
    tokens: [{"old":"/api/v1/commissions","type":0,"val":"api","end":""},{"old":"/api/v1/commissions","type":0,"val":"v1","end":""},{"old":"/api/v1/commissions","type":0,"val":"commissions","end":""}],
    types: placeholder as Registry['client.commissions.store']['types'],
  },
  'client.commissions.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/commissions/:id',
    tokens: [{"old":"/api/v1/commissions/:id","type":0,"val":"api","end":""},{"old":"/api/v1/commissions/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/commissions/:id","type":0,"val":"commissions","end":""},{"old":"/api/v1/commissions/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['client.commissions.show']['types'],
  },
  'client.commissions.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/commissions/:id',
    tokens: [{"old":"/api/v1/commissions/:id","type":0,"val":"api","end":""},{"old":"/api/v1/commissions/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/commissions/:id","type":0,"val":"commissions","end":""},{"old":"/api/v1/commissions/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['client.commissions.destroy']['types'],
  },
  'auth.session.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signin',
    tokens: [{"old":"/api/v1/auth/signin","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signin","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signin","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signin","type":0,"val":"signin","end":""}],
    types: placeholder as Registry['auth.session.store']['types'],
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
