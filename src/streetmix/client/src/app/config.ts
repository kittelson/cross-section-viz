/**
 * Environment variables are passed in as strings. This means falsy values are
 * implicitly converted to strings, which become truthy as a result.
 *
 * This function parses incoming variables and converts them to boolean.
 */
function parseBoolean(value: string | undefined): boolean {
  switch (value) {
    case 'true':
      return true
    default:
      return false
  }
}

export const ENV: string | undefined = import.meta.env.MODE
export const STREETMIX_INSTANCE: string | undefined =
  undefined
export const SPONSOR_BANNER: string | undefined = undefined
export const FACEBOOK_APP_ID: string | undefined = undefined
export const OFFLINE_MODE: boolean = parseBoolean(undefined)
export const PELIAS_API_KEY: string | undefined = undefined
export const PELIAS_HOST_NAME: string | undefined = undefined
export const CARTO_API_KEY: string | undefined = undefined
export const AUTH0_CLIENT_ID: string | undefined = undefined
export const AUTH0_DOMAIN: string | undefined = undefined
export const USERBACK_TOKEN: string | undefined = undefined
