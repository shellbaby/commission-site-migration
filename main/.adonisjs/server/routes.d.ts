import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'link.static.home': { paramsTuple?: []; params?: {} }
    'link.static.price': { paramsTuple?: []; params?: {} }
    'link.static.tos': { paramsTuple?: []; params?: {} }
    'link.static.gallery': { paramsTuple?: []; params?: {} }
    'link.static.contact': { paramsTuple?: []; params?: {} }
    'link.commissions.create': { paramsTuple?: []; params?: {} }
    'link.commissions.auth.index': { paramsTuple?: []; params?: {} }
    'link.commissions.auth.show': { paramsTuple: [ParamValue]; params: {'commission_uuid': ParamValue} }
    'link.commissions.guest.show': { paramsTuple: [ParamValue]; params: {'commission_uuid': ParamValue} }
    'link.clients.profile': { paramsTuple?: []; params?: {} }
    'link.registration.signin': { paramsTuple?: []; params?: {} }
    'link.registration.signin-alias': { paramsTuple?: []; params?: {} }
    'link.registration.signup': { paramsTuple?: []; params?: {} }
    'link.registration.signup-alias': { paramsTuple?: []; params?: {} }
    'link.email.verify': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'link.email.verify.instruction': { paramsTuple?: []; params?: {} }
    'client.clients.store': { paramsTuple?: []; params?: {} }
    'client.clients.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.clients.update': { paramsTuple?: []; params?: {} }
    'client.clients.destroy': { paramsTuple?: []; params?: {} }
    'client.commissions.store': { paramsTuple?: []; params?: {} }
    'client.commissions.destroy': { paramsTuple: [ParamValue]; params: {'commission_uuid': ParamValue} }
    'guest.commissions.store': { paramsTuple?: []; params?: {} }
    'auth.session.store': { paramsTuple?: []; params?: {} }
    'auth.session.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'link.static.home': { paramsTuple?: []; params?: {} }
    'link.static.price': { paramsTuple?: []; params?: {} }
    'link.static.tos': { paramsTuple?: []; params?: {} }
    'link.static.gallery': { paramsTuple?: []; params?: {} }
    'link.static.contact': { paramsTuple?: []; params?: {} }
    'link.commissions.create': { paramsTuple?: []; params?: {} }
    'link.commissions.auth.index': { paramsTuple?: []; params?: {} }
    'link.commissions.auth.show': { paramsTuple: [ParamValue]; params: {'commission_uuid': ParamValue} }
    'link.commissions.guest.show': { paramsTuple: [ParamValue]; params: {'commission_uuid': ParamValue} }
    'link.clients.profile': { paramsTuple?: []; params?: {} }
    'link.registration.signin': { paramsTuple?: []; params?: {} }
    'link.registration.signin-alias': { paramsTuple?: []; params?: {} }
    'link.registration.signup': { paramsTuple?: []; params?: {} }
    'link.registration.signup-alias': { paramsTuple?: []; params?: {} }
    'link.email.verify': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'link.email.verify.instruction': { paramsTuple?: []; params?: {} }
    'client.clients.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.session.destroy': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'link.static.home': { paramsTuple?: []; params?: {} }
    'link.static.price': { paramsTuple?: []; params?: {} }
    'link.static.tos': { paramsTuple?: []; params?: {} }
    'link.static.gallery': { paramsTuple?: []; params?: {} }
    'link.static.contact': { paramsTuple?: []; params?: {} }
    'link.commissions.create': { paramsTuple?: []; params?: {} }
    'link.commissions.auth.index': { paramsTuple?: []; params?: {} }
    'link.commissions.auth.show': { paramsTuple: [ParamValue]; params: {'commission_uuid': ParamValue} }
    'link.commissions.guest.show': { paramsTuple: [ParamValue]; params: {'commission_uuid': ParamValue} }
    'link.clients.profile': { paramsTuple?: []; params?: {} }
    'link.registration.signin': { paramsTuple?: []; params?: {} }
    'link.registration.signin-alias': { paramsTuple?: []; params?: {} }
    'link.registration.signup': { paramsTuple?: []; params?: {} }
    'link.registration.signup-alias': { paramsTuple?: []; params?: {} }
    'link.email.verify': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'link.email.verify.instruction': { paramsTuple?: []; params?: {} }
    'client.clients.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.session.destroy': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'client.clients.store': { paramsTuple?: []; params?: {} }
    'client.commissions.store': { paramsTuple?: []; params?: {} }
    'guest.commissions.store': { paramsTuple?: []; params?: {} }
    'auth.session.store': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'client.clients.update': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'client.clients.destroy': { paramsTuple?: []; params?: {} }
    'client.commissions.destroy': { paramsTuple: [ParamValue]; params: {'commission_uuid': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}