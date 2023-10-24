/**
 * This is a simplified logic.
 * Consider using `import isEmail from 'validator/lib/isEmail'` from
 * https://github.com/validatorjs/validator.js/blob/7376945b4ce028b65955ae57b8fccbbf3fe58467/src/lib/isEmail.js
 * for a more robust version.
 */
export const isEmail = (string: string) => {
  const regex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  return regex.test(string)
}

export const email = (value: string) => {
  return value && !isEmail(value.trim()) ? '无效的邮箱' : null
}

const isDirty = (value: string | number) => {
  return value || value === 0
}

export const required = (requiredFields: readonly string[], values: Record<string, string>): Record<string, string> => {
  return requiredFields.reduce(
    (fields, field) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: 'Required' })
    }),
    {}
  )
}
