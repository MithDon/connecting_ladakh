export function phoneValidator(phone) {
  if (!phone) return "Please enter phone number"
  if (phone.length < 10) return 'Invalid Phone Number'
  return ''
}
