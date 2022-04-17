const hasUppercase = val => /[A-Z]/.test(val)
const hasLowercase = val => /[a-z]/.test(val)
const hasSpecialChars = val => /[!@#$%^&*]/.test(val)
const hasNumbers = val => /[0-9]/.test(val)

export {hasUppercase, hasLowercase, hasSpecialChars, hasNumbers}