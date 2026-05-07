import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/signin': ExtractProps<(typeof import('../../inertia/pages/auth/signin.tsx'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.tsx'))['default']>
    'auth/verify-email': ExtractProps<(typeof import('../../inertia/pages/auth/verify-email.tsx'))['default']>
    'commission-details': ExtractProps<(typeof import('../../inertia/pages/commission-details.tsx'))['default']>
    'commission-history': ExtractProps<(typeof import('../../inertia/pages/commission-history.tsx'))['default']>
    'contact': ExtractProps<(typeof import('../../inertia/pages/contact.tsx'))['default']>
    'errors/commission-details': ExtractProps<(typeof import('../../inertia/pages/errors/commission-details.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/not-found/commission': ExtractProps<(typeof import('../../inertia/pages/errors/not-found/commission.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'errors/verification-failed': ExtractProps<(typeof import('../../inertia/pages/errors/verification-failed.tsx'))['default']>
    'form': ExtractProps<(typeof import('../../inertia/pages/form.tsx'))['default']>
    'gallery': ExtractProps<(typeof import('../../inertia/pages/gallery.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'price': ExtractProps<(typeof import('../../inertia/pages/price.tsx'))['default']>
    'profile': ExtractProps<(typeof import('../../inertia/pages/profile.tsx'))['default']>
    'tos': ExtractProps<(typeof import('../../inertia/pages/tos.tsx'))['default']>
  }
}
