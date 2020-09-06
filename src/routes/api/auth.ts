import * as express from 'express';
import UserModel from '../../models/UserModel';
import { check, validationResult } from 'express-validator'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { envVariable } from '../../config/configuration';
import seed from '../../utils/seedData';


const authRouter = express.Router();

// @route      POST /api/auth
// @desc       Authenticate user & get token
// @access     Public

authRouter.post('/', [
  check('email', 'Incorrect Email Id').isEmail(),
  check('password', 'Please enter password').exists(),
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
      // Check if user exist
      let user = await UserModel.findOne({ email })
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'User not found' }] })
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
        .status(400)
        .json({ errors: [{ msg: 'Incorrect password' }] })
      }
      await seed()

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload,
        envVariable.jwtSecret,
        // { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token })
        }
      )
      //Re-build Data for the User
    } catch (e) {
      res.status(500).send('Server Error')
    }
  })

export default authRouter;