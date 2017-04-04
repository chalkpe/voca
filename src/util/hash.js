import crc32 from 'crc-32'
import sha256 from 'sha256'

export default (password) => {
  const hash = crc32.str(password) >>> 0 // convert to uint32
  const padded = `0000000000${hash}`.slice(-10) // sprintf("%010s", str)

  return '@' + sha256(password + padded)
}
