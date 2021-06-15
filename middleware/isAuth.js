const User = require("../models/User");
const jwt = require("jsonwebtoken");
const isAuth = async (req, res, next) => {
  console.log('in Auth middleware');
  try {
    //    import token
    // headers=> authorization
    const token = req.headers["authorization"];
    // console.log(token);
    //   si mathamch token
    if (!token) {
      console.log('no token')
      return res
        .status(401)
        .send({ errors: [{ msg: "you are not authorized1" }] });
    }
    // you are not authorized
    // on doit verifie si token est valide
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log('decode id  : '+ decode.id);
    // test if the user exist with that id
    const user = await User.findOne({ _id: decoded.id }).select("-password");
    // you are not authorised
    if (!user) {
      return res
        .status(401)
        .send({ errors: [{ msg: "you are not authorized2" }] });
    }

    // si non
    // req bech nzid user
    req.user = user;
    // next
    next();
  } catch (error) {
    console.log('catch from try');
    res.status(401).send({ errors: [{ msg: "you are not authorized" }] });
  }
};

module.exports = isAuth;
