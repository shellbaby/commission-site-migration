/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  clients: {
    store: typeof routes['clients.store']
  }
  client: {
    clients: {
      show: typeof routes['client.clients.show']
      update: typeof routes['client.clients.update']
      destroy: typeof routes['client.clients.destroy']
    }
  }
  auth: {
    emails: {
      verify: typeof routes['auth.emails.verify']
    }
    session: {
      store: typeof routes['auth.session.store']
      destroy: typeof routes['auth.session.destroy']
    }
  }
}
