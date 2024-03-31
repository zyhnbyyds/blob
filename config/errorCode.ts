/**
 * Error codes and their descriptions.
 */
export const codes = {
  404: {
    title: 'Not Found',
    description: 'The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.',
  },
  503: {
    title: 'Service Unavailable',
    description: 'The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.',
  },
  403: {
    title: 'Forbidden',
    description: 'The server understood the request, but is refusing to fulfill it.',
  },
  500: {
    title: 'Internal Server Error',
    description: 'The server encountered an unexpected condition that prevented it from fulfilling the request.',
  },
  unknown: {
    title: 'Unknown Error',
    description: 'An unknown error occurred.',
  },
} as { [key: string]: { title: string, description: string } }
