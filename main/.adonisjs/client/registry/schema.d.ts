/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'clients.store': {
    methods: ["POST"]
    pattern: '/v1/client'
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
    pattern: '/v1/client'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/client/clients_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/client/clients_controller').default['show']>>>
    }
  }
  'client.clients.update': {
    methods: ["PATCH"]
    pattern: '/v1/client'
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
    pattern: '/v1/client'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/client/clients_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/client/clients_controller').default['destroy']>>>
    }
  }
  'auth.emails.verify': {
    methods: ["GET","HEAD"]
    pattern: '/v1/auth/verify/:uuid'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { uuid: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/email/emails_controller').default['verify']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/email/emails_controller').default['verify']>>>
    }
  }
  'auth.session.store': {
    methods: ["POST"]
    pattern: '/v1/auth/signin'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/client').usernameValidator)>|InferInput<(typeof import('#validators/client').emailValidator)>|InferInput<(typeof import('#validators/client').passwordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/client').usernameValidator)>|InferInput<(typeof import('#validators/client').emailValidator)>|InferInput<(typeof import('#validators/client').passwordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.session.destroy': {
    methods: ["GET","HEAD"]
    pattern: '/v1/auth/signout'
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
