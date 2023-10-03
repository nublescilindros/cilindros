import jwt from "jsonwebtoken";

import config from "./config";

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

export { tokeSign};