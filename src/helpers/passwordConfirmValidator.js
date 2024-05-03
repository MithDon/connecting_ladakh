export function passwordConfirmValidator(conpassword,password) {
  if (!conpassword) return "Re-enter Password can't be empty."
  if (conpassword!=password) return 'Password not match.'
  return ''
}
