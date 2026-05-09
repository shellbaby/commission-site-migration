/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'drive.fs.serve': {
    methods: ["GET","HEAD"]
    pattern: '/uploads/*'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { '*': ParamValue[] }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'link.static.home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'link.static.price': {
    methods: ["GET","HEAD"]
    pattern: '/price'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'link.static.tos': {
    methods: ["GET","HEAD"]
    pattern: '/tos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'link.static.gallery': {
    methods: ["GET","HEAD"]
    pattern: '/gallery'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'link.static.contact': {
    methods: ["GET","HEAD"]
    pattern: '/contact'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'link.commissions.create': {
    methods: ["GET","HEAD"]
    pattern: '/commissions/form'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commission/commissions_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commission/commissions_controller').default['create']>>>
    }
  }
  'link.commissions.auth.index': {
    methods: ["GET","HEAD"]
    pattern: '/commissions'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commission/commissions_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commission/commissions_controller').default['index']>>>
    }
  }
  'link.commissions.auth.show': {
    methods: ["GET","HEAD"]
    pattern: '/commissions/:commission_uuid'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { commission_uuid: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commission/commissions_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commission/commissions_controller').default['show']>>>
    }
  }
  'link.commissions.guest.show': {
    methods: ["GET","HEAD"]
    pattern: '/commissions/guest/:commission_uuid'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { commission_uuid: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commission/guest/commissions_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commission/guest/commissions_controller').default['show']>>>
    }
  }
  'link.clients.profile': {
    methods: ["GET","HEAD"]
    pattern: '/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/client/clients_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/client/clients_controller').default['edit']>>>
    }
  }
  'link.registration.signin': {
    methods: ["GET","HEAD"]
    pattern: '/signin'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['create']>>>
    }
  }
  'link.registration.signin-alias': {
    methods: ["GET","HEAD"]
    pattern: '/sign-in'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'link.registration.signup': {
    methods: ["GET","HEAD"]
    pattern: '/signup'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/client/clients_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/client/clients_controller').default['create']>>>
    }
  }
  'link.registration.signup-alias': {
    methods: ["GET","HEAD"]
    pattern: '/sign-up'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'link.email.verify': {
    methods: ["GET","HEAD"]
    pattern: '/verify/:uuid'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { uuid: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/email/emails_controller').default['verify']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/email/emails_controller').default['verify']>>>
    }
  }
  'link.email.verify.instruction': {
    methods: ["GET","HEAD"]
    pattern: '/verify'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/email/emails_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/email/emails_controller').default['show']>>>
    }
  }
  'client.clients.store': {
    methods: ["POST"]
    pattern: '/api/v1/clients'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/client').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/client').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/client/clients_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/client/clients_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'client.clients.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/clients/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/client/clients_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/client/clients_controller').default['show']>>>
    }
  }
  'client.clients.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/clients'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/client/clients_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/client/clients_controller').default['update']>>>
    }
  }
  'client.clients.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/clients'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/client/clients_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/client/clients_controller').default['destroy']>>>
    }
  }
  'client.commissions.store': {
    methods: ["POST"]
    pattern: '/api/v1/commissions'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commission').commissionValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/commission').commissionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commission/commissions_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commission/commissions_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'client.commissions.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/commissions/:commission_uuid'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { commission_uuid: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commission/commissions_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commission/commissions_controller').default['destroy']>>>
    }
  }
  'guest.commissions.store': {
    methods: ["POST"]
    pattern: '/api/v1/guest/commissions'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commission').commissionValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/commission').commissionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commission/guest/commissions_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commission/guest/commissions_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.session.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signin'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/client').signinValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/client').signinValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.session.destroy': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/auth/signout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['destroy']>>>
    }
  }
}
