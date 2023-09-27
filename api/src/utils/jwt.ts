import jwt from "jsonwebtoken";

import config from "./config";

/* const generateToken = (payload: any) => {
  const token = jwt.sign(payload, config.secret);
  return token;
}; */

const getToken = (token: any) => {
  const tokenRegex = /Bearer "(.*?)"/;
  const match = token.match(tokenRegex);
  return token = match && match[1];
}

const tokeSign = async (user: any) => {
  return jwt.sign({
    id: user.id,
    admin: user.admin,
    password: user.password
  },
    config.secret,
    {
      expiresIn: "365d"
    }
  );
}

const verifyToken = async (token: string) => {
  try {
    return jwt.verify(token, config.secret)
  } catch (error) {
    return { error: true, message: "token no valido" }
  }
}

const checkAuth = async (req: any, res: any, next: any) => {
  try {

    let token = req.headers.authorization

    if (token) {
      const tokenData: any = await verifyToken(getToken(token));

      if (tokenData.id) {
        console.log('token valido')
        next()
      } else {
        console.log("token no valido")
        res.send({ errorToken: true })
      }
    }



  } catch (error) {

  }
}



export { tokeSign, verifyToken, checkAuth, getToken };