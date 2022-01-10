import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

export const userAuth = async (req, res) => {
  const { googleId, imageUrl, email, name } = req.body

  let user = await User.findOne({ email })

  if (!user) {
    user = await User.create({ googleId, imageUrl, email, name })
  } else {
    user = await User.findOneAndUpdate(
      { email },
      { googleId, imageUrl, email, name },
      { new: true }
    )
  }
  res.json({ user, token: generateToken(user._id) })
}
