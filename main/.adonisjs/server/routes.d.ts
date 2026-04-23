import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'clients.store': { paramsTuple?: []; params?: {} }
    'client.clients.show': { paramsTuple?: []; params?: {} }
    'client.clients.update': { paramsTuple?: []; params?: {} }
    'client.clients.destroy': { paramsTuple?: []; params?: {} }
    'auth.emails.verify': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'auth.session.store': { paramsTuple?: []; params?: {} }
    'auth.session.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'client.clients.show': { paramsTuple?: []; params?: {} }
    'auth.emails.verify': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'auth.session.destroy': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'client.clients.show': { paramsTuple?: []; params?: {} }
    'auth.emails.verify': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'auth.session.destroy': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'clients.store': { paramsTuple?: []; params?: {} }
    'auth.session.store': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'client.clients.update': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'client.clients.destroy': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}