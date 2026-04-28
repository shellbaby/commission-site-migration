/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  link: {
    home: typeof routes['link.home']
    price: typeof routes['link.price']
    tos: typeof routes['link.tos']
    form: typeof routes['link.form']
    gallery: typeof routes['link.gallery']
    contact: typeof routes['link.contact']
    profile: typeof routes['link.profile']
    signin: typeof routes['link.signin']
    signinAlias: typeof routes['link.signin-alias']
    signout: typeof routes['link.signout']
    signoutAlias: typeof routes['link.signout-alias']
    signup: typeof routes['link.signup']
    signupAlias: typeof routes['link.signup-alias']
    emails: {
      verify: typeof routes['link.emails.verify']
    }
    verifyInstruction: typeof routes['link.verify-instruction']
  }
  client: {
    clients: {
      store: typeof routes['client.clients.store']
      show: typeof routes['client.clients.show']
      update: typeof routes['client.clients.update']
      destroy: typeof routes['client.clients.destroy']
    }
  }
  auth: {
    session: {
      store: typeof routes['auth.session.store']
    }
  }
}
