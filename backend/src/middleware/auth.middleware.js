import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'
import config from '../config/config.js'

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : req.cookies?.accessToken

    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized',
      })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET)
    const user = await userModel.findById(decoded.id)

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized',
      })
    }

    req.user = user
    next()
  } catch {
    return res.status(401).json({
      message: 'Invalid Token',
    })
  }
}
