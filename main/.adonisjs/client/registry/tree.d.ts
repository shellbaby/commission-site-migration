/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  link: {
    static: {
      home: typeof routes['link.static.home']
      price: typeof routes['link.static.price']
      tos: typeof routes['link.static.tos']
      gallery: typeof routes['link.static.gallery']
      contact: typeof routes['link.static.contact']
    }
    commissions: {
      create: typeof routes['link.commissions.create']
      auth: {
        index: typeof routes['link.commissions.auth.index']
        show: typeof routes['link.commissions.auth.show']
      }
      guest: {
        show: typeof routes['link.commissions.guest.show']
      }
    }
    clients: {
      profile: typeof routes['link.clients.profile']
    }
    registration: {
      signin: typeof routes['link.registration.signin']
      signinAlias: typeof routes['link.registration.signin-alias']
      signup: typeof routes['link.registration.signup']
      signupAlias: typeof routes['link.registration.signup-alias']
    }
    email: {
      verify: typeof routes['link.email.verify'] & {
        instruction: typeof routes['link.email.verify.instruction']
      }
    }
  }
  client: {
    clients: {
      store: typeof routes['client.clients.store']
      show: typeof routes['client.clients.show']
      update: typeof routes['client.clients.update']
      destroy: typeof routes['client.clients.destroy']
    }
    commissions: {
      store: typeof routes['client.commissions.store']
      destroy: typeof routes['client.commissions.destroy']
    }
  }
  guest: {
    commissions: {
      store: typeof routes['guest.commissions.store']
    }
  }
  auth: {
    session: {
      store: typeof routes['auth.session.store']
      destroy: typeof routes['auth.session.destroy']
    }
  }
}
