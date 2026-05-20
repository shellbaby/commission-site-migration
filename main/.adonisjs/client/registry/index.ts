/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'drive.fs.serve': {
    methods: ["GET","HEAD"],
    pattern: '/uploads/*',
    tokens: [{"old":"/uploads/*","type":0,"val":"uploads","end":""},{"old":"/uploads/*","type":2,"val":"*","end":""}],
    types: placeholder as Registry['drive.fs.serve']['types'],
  },
  'link._dev.email/password_change': {
    methods: ["GET","HEAD"],
    pattern: '/_dev/email/password_change',
    tokens: [{"old":"/_dev/email/password_change","type":0,"val":"_dev","end":""},{"old":"/_dev/email/password_change","type":0,"val":"email","end":""},{"old":"/_dev/email/password_change","type":0,"val":"password_change","end":""}],
    types: placeholder as Registry['link._dev.email/password_change']['types'],
  },
  'link.static.home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['link.static.home']['types'],
  },
  'link.static.price': {
    methods: ["GET","HEAD"],
    pattern: '/price',
    tokens: [{"old":"/price","type":0,"val":"price","end":""}],
    types: placeholder as Registry['link.static.price']['types'],
  },
  'link.static.tos': {
    methods: ["GET","HEAD"],
    pattern: '/tos',
    tokens: [{"old":"/tos","type":0,"val":"tos","end":""}],
    types: placeholder as Registry['link.static.tos']['types'],
  },
  'link.static.gallery': {
    methods: ["GET","HEAD"],
    pattern: '/gallery',
    tokens: [{"old":"/gallery","type":0,"val":"gallery","end":""}],
    types: placeholder as Registry['link.static.gallery']['types'],
  },
  'link.static.contact': {
    methods: ["GET","HEAD"],
    pattern: '/contact',
    tokens: [{"old":"/contact","type":0,"val":"contact","end":""}],
    types: placeholder as Registry['link.static.contact']['types'],
  },
  'link.commissions.create': {
    methods: ["GET","HEAD"],
    pattern: '/commissions/form',
    tokens: [{"old":"/commissions/form","type":0,"val":"commissions","end":""},{"old":"/commissions/form","type":0,"val":"form","end":""}],
    types: placeholder as Registry['link.commissions.create']['types'],
  },
  'link.commissions.auth.index': {
    methods: ["GET","HEAD"],
    pattern: '/commissions',
    tokens: [{"old":"/commissions","type":0,"val":"commissions","end":""}],
    types: placeholder as Registry['link.commissions.auth.index']['types'],
  },
  'link.commissions.auth.show': {
    methods: ["GET","HEAD"],
    pattern: '/commissions/:commission_uuid',
    tokens: [{"old":"/commissions/:commission_uuid","type":0,"val":"commissions","end":""},{"old":"/commissions/:commission_uuid","type":1,"val":"commission_uuid","end":""}],
    types: placeholder as Registry['link.commissions.auth.show']['types'],
  },
  'link.commissions.guest.show': {
    methods: ["GET","HEAD"],
    pattern: '/commissions/guest/:commission_uuid',
    tokens: [{"old":"/commissions/guest/:commission_uuid","type":0,"val":"commissions","end":""},{"old":"/commissions/guest/:commission_uuid","type":0,"val":"guest","end":""},{"old":"/commissions/guest/:commission_uuid","type":1,"val":"commission_uuid","end":""}],
    types: placeholder as Registry['link.commissions.guest.show']['types'],
  },
  'link.clients.profile': {
    methods: ["GET","HEAD"],
    pattern: '/profile',
    tokens: [{"old":"/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['link.clients.profile']['types'],
  },
  'link.registration.signin': {
    methods: ["GET","HEAD"],
    pattern: '/signin',
    tokens: [{"old":"/signin","type":0,"val":"signin","end":""}],
    types: placeholder as Registry['link.registration.signin']['types'],
  },
  'link.registration.signin-alias': {
    methods: ["GET","HEAD"],
    pattern: '/sign-in',
    tokens: [{"old":"/sign-in","type":0,"val":"sign-in","end":""}],
    types: placeholder as Registry['link.registration.signin-alias']['types'],
  },
  'link.registration.signup': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['link.registration.signup']['types'],
  },
  'link.registration.signup-alias': {
    methods: ["GET","HEAD"],
    pattern: '/sign-up',
    tokens: [{"old":"/sign-up","type":0,"val":"sign-up","end":""}],
    types: placeholder as Registry['link.registration.signup-alias']['types'],
  },
  'link.email.verify': {
    methods: ["GET","HEAD"],
    pattern: '/verify/:uuid',
    tokens: [{"old":"/verify/:uuid","type":0,"val":"verify","end":""},{"old":"/verify/:uuid","type":1,"val":"uuid","end":""}],
    types: placeholder as Registry['link.email.verify']['types'],
  },
  'link.email.verify.instruction': {
    methods: ["GET","HEAD"],
    pattern: '/verify',
    tokens: [{"old":"/verify","type":0,"val":"verify","end":""}],
    types: placeholder as Registry['link.email.verify.instruction']['types'],
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
    methods: ["PATCH"],
    pattern: '/api/v1/clients',
    tokens: [{"old":"/api/v1/clients","type":0,"val":"api","end":""},{"old":"/api/v1/clients","type":0,"val":"v1","end":""},{"old":"/api/v1/clients","type":0,"val":"clients","end":""}],
    types: placeholder as Registry['client.clients.update']['types'],
  },
  'client.clients.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/clients',
    tokens: [{"old":"/api/v1/clients","type":0,"val":"api","end":""},{"old":"/api/v1/clients","type":0,"val":"v1","end":""},{"old":"/api/v1/clients","type":0,"val":"clients","end":""}],
    types: placeholder as Registry['client.clients.destroy']['types'],
  },
  'client.commissions.store': {
    methods: ["POST"],
    pattern: '/api/v1/commissions',
    tokens: [{"old":"/api/v1/commissions","type":0,"val":"api","end":""},{"old":"/api/v1/commissions","type":0,"val":"v1","end":""},{"old":"/api/v1/commissions","type":0,"val":"commissions","end":""}],
    types: placeholder as Registry['client.commissions.store']['types'],
  },
  'client.commissions.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/commissions/:commission_uuid',
    tokens: [{"old":"/api/v1/commissions/:commission_uuid","type":0,"val":"api","end":""},{"old":"/api/v1/commissions/:commission_uuid","type":0,"val":"v1","end":""},{"old":"/api/v1/commissions/:commission_uuid","type":0,"val":"commissions","end":""},{"old":"/api/v1/commissions/:commission_uuid","type":1,"val":"commission_uuid","end":""}],
    types: placeholder as Registry['client.commissions.destroy']['types'],
  },
  'client.password.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/password',
    tokens: [{"old":"/api/v1/password","type":0,"val":"api","end":""},{"old":"/api/v1/password","type":0,"val":"v1","end":""},{"old":"/api/v1/password","type":0,"val":"password","end":""}],
    types: placeholder as Registry['client.password.update']['types'],
  },
  'guest.commissions.store': {
    methods: ["POST"],
    pattern: '/api/v1/guest/commissions',
    tokens: [{"old":"/api/v1/guest/commissions","type":0,"val":"api","end":""},{"old":"/api/v1/guest/commissions","type":0,"val":"v1","end":""},{"old":"/api/v1/guest/commissions","type":0,"val":"guest","end":""},{"old":"/api/v1/guest/commissions","type":0,"val":"commissions","end":""}],
    types: placeholder as Registry['guest.commissions.store']['types'],
  },
  'auth.session.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signin',
    tokens: [{"old":"/api/v1/auth/signin","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signin","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signin","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signin","type":0,"val":"signin","end":""}],
    types: placeholder as Registry['auth.session.store']['types'],
  },
  'auth.session.destroy': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/auth/signout',
    tokens: [{"old":"/api/v1/auth/signout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signout","type":0,"val":"signout","end":""}],
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
