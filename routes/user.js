const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/UserSchema');

// @Path        : /user
// @description : Add the user (Post request)
// @Access      : PUBLIC
router.post('/', (req, res) => {
      const {name, email, password} = req.body;

      if(!name || !email | !password) return res.status(400).json({msg:'Enter all credentials'});

      User.findOne({email})
      .then(user => {
            if(user) return res.status(400).json({msg:'Email Already exsist'});

            const newUser = new User({
                  name,
                  email,
                  password
            });

            bcrypt.genSalt((err, salt) => {
                  if(err) throw err;

                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;

                        newUser.password = hash;
                        newUser.save()
                        .then(user => {

                              jwt.sign(
                                    {id: user.id},
                                    config.get('jwtSecret'),
                                    {expiresIn: 3600},
                                    (err, token)=> {
                                    if(err) throw err;

                                    res.json({
                                          token,
                                          user: {
                                                id: user.id,
                                                name: user.name,
                                                email: user.email,
                                                registeredDate: user.registeredDate
                                          }
                                    })
                              })
                        })
                  })
            })
      })

})

module.exports = router