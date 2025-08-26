import { isURL as isURLValidator } from 'validator'

const WHITESPACE_REGEX = /^[\s\u180E]+$/

function getType(value: unknown): string {
  if (value === null) return 'null'
  const baseType = typeof value
  if (baseType !== 'object') return baseType
  const tag = Object.prototype.toString.call(value).slice(8, -1)
  const lowered = tag.toLowerCase()
  if (
    lowered !== 'object' &&
    (lowered === 'number' || lowered === 'boolean' || lowered === 'string')
  ) {
    return tag
  }
  return lowered
}

function hasOwnProp(obj: any, key: string): boolean {
  return !isNull(obj) && Object.prototype.hasOwnProperty.call(obj, key)
}

function isType(value: unknown, type: string): boolean {
  return getType(value) === type
}

function isBoolean(value: unknown): boolean {
  return isType(value, 'boolean')
}

function isString(value: unknown): boolean {
  return isType(value, 'string')
}

function isNumber(value: unknown): boolean {
  return isType(value, 'number') && Number.isFinite(value as number)
}

function isNan(value: unknown): boolean {
  return isType(value, 'number') && Number.isNaN(value)
}

function isInt(value: unknown): boolean {
  return isNumber(value) && Number.isInteger(value as number)
}

function isFloat(value: unknown): boolean {
  return isNumber(value) && !Number.isInteger(value as number)
}

const isArray = Array.isArray

function isValidArray(value: unknown): boolean {
  return isArray(value) && (value as any[]).length > 0
}

function isError(value: unknown): boolean {
  return isType(value, 'error')
}

function isFunction(value: unknown): boolean {
  return isType(value, 'function')
}

function isNull(value: unknown): boolean {
  return isType(value, 'null')
}

function isUndefined(value: unknown): boolean {
  return isType(value, 'undefined')
}

function isNil(value: unknown): boolean {
  return isNull(value) || isUndefined(value)
}

function isNotNil(value: unknown): boolean {
  return !isNil(value)
}

function isEmpty(arg: any): boolean {
  if (isNil(arg)) return true

  if (isBoolean(arg)) return false

  if (isNumber(arg)) return false

  if (isString(arg)) {
    return arg.length === 0 || WHITESPACE_REGEX.test(arg)
  }

  if (isFunction(arg) || isArray(arg)) {
    return arg.length === 0
  }

  switch (getType(arg)) {
    case 'file':
    case 'map':
    case 'weakmap':
    case 'set':
    case 'weakset': {
      return arg.size === 0
    }

    case 'object': {
      for (const key in arg) {
        if (Object.hasOwnProperty.call(arg, key)) return false
      }
      return true
    }

    default:
      break
  }

  return false
}

function isValid(value: unknown): boolean {
  return !isEmpty(value)
}

function isEqual(value: unknown, other: unknown): boolean {
  return String(value) === String(other)
}

function isNotEqual(value: unknown, other: unknown): boolean {
  return !isEqual(value, other)
}

function isTrue(value: unknown): boolean {
  return value === true || isEqual(value, 'true') || isEqual(value, '1')
}

function isFalse(value: unknown): boolean {
  return value === false || isEqual(value, 'false') || isEqual(value, '0')
}

function isBool(value: unknown): boolean {
  return isTrue(value) || isFalse(value)
}

function isURL(value?: string): boolean {
  return isValid(value) && isURLValidator(value!)
}

const helper = {
  isBoolean,
  isString,
  isNumber,
  isNan,
  isInt,
  isFloat,
  isArray,
  isValidArray,
  isError,
  isFunction,
  isNull,
  isUndefined,
  isNil,
  isNotNil,
  isEmpty,
  isValid,
  isEqual,
  isNotEqual,
  isTrue,
  isFalse,
  isBool,
  isURL
}

export { getType, hasOwnProp, helper }
