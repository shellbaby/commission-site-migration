import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'link.home': { paramsTuple?: []; params?: {} }
    'link.price': { paramsTuple?: []; params?: {} }
    'link.tos': { paramsTuple?: []; params?: {} }
    'link.gallery': { paramsTuple?: []; params?: {} }
    'link.contact': { paramsTuple?: []; params?: {} }
    'link.form': { paramsTuple?: []; params?: {} }
    'link.profile': { paramsTuple?: []; params?: {} }
    'link.signin': { paramsTuple?: []; params?: {} }
    'link.signin-alias': { paramsTuple?: []; params?: {} }
    'link.signout': { paramsTuple?: []; params?: {} }
    'link.signout-alias': { paramsTuple?: []; params?: {} }
    'link.signup': { paramsTuple?: []; params?: {} }
    'link.signup-alias': { paramsTuple?: []; params?: {} }
    'link.emails.verify': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'link.verify-instruction': { paramsTuple?: []; params?: {} }
    'client.clients.store': { paramsTuple?: []; params?: {} }
    'client.clients.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.clients.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.clients.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.commissions.index': { paramsTuple?: []; params?: {} }
    'client.commissions.store': { paramsTuple?: []; params?: {} }
    'client.commissions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.commissions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.session.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'link.home': { paramsTuple?: []; params?: {} }
    'link.price': { paramsTuple?: []; params?: {} }
    'link.tos': { paramsTuple?: []; params?: {} }
    'link.gallery': { paramsTuple?: []; params?: {} }
    'link.contact': { paramsTuple?: []; params?: {} }
    'link.form': { paramsTuple?: []; params?: {} }
    'link.profile': { paramsTuple?: []; params?: {} }
    'link.signin': { paramsTuple?: []; params?: {} }
    'link.signin-alias': { paramsTuple?: []; params?: {} }
    'link.signout': { paramsTuple?: []; params?: {} }
    'link.signout-alias': { paramsTuple?: []; params?: {} }
    'link.signup': { paramsTuple?: []; params?: {} }
    'link.signup-alias': { paramsTuple?: []; params?: {} }
    'link.emails.verify': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'link.verify-instruction': { paramsTuple?: []; params?: {} }
    'client.clients.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.commissions.index': { paramsTuple?: []; params?: {} }
    'client.commissions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'link.home': { paramsTuple?: []; params?: {} }
    'link.price': { paramsTuple?: []; params?: {} }
    'link.tos': { paramsTuple?: []; params?: {} }
    'link.gallery': { paramsTuple?: []; params?: {} }
    'link.contact': { paramsTuple?: []; params?: {} }
    'link.form': { paramsTuple?: []; params?: {} }
    'link.profile': { paramsTuple?: []; params?: {} }
    'link.signin': { paramsTuple?: []; params?: {} }
    'link.signin-alias': { paramsTuple?: []; params?: {} }
    'link.signout': { paramsTuple?: []; params?: {} }
    'link.signout-alias': { paramsTuple?: []; params?: {} }
    'link.signup': { paramsTuple?: []; params?: {} }
    'link.signup-alias': { paramsTuple?: []; params?: {} }
    'link.emails.verify': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'link.verify-instruction': { paramsTuple?: []; params?: {} }
    'client.clients.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.commissions.index': { paramsTuple?: []; params?: {} }
    'client.commissions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'client.clients.store': { paramsTuple?: []; params?: {} }
    'client.commissions.store': { paramsTuple?: []; params?: {} }
    'auth.session.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'client.clients.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'client.clients.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'client.clients.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.commissions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}