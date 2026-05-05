/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  link: {
    home: typeof routes['link.home']
    price: typeof routes['link.price']
    tos: typeof routes['link.tos']
    gallery: typeof routes['link.gallery']
    contact: typeof routes['link.contact']
    form: typeof routes['link.form']
    commissions: typeof routes['link.commissions']
    commissionDetails: typeof routes['link.commission-details']
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
    commissions: {
      index: typeof routes['client.commissions.index']
      store: typeof routes['client.commissions.store']
      show: typeof routes['client.commissions.show']
      destroy: typeof routes['client.commissions.destroy']
    }
  }
  auth: {
    session: {
      store: typeof routes['auth.session.store']
    }
  }
}
