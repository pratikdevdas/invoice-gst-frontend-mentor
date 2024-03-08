const generateID = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  const randomLetter = () => letters.charAt(Math.floor(Math.random() * letters.length))
  const randomNumber = () => Math.floor(Math.random() * 10)

  const id = `${randomLetter()}${randomLetter()}${randomNumber()}${randomNumber()}${randomNumber()}${randomNumber()}`

  return id
}

export default generateID
