import { getToken, verifyToken } from "./jwt";

const checkRoleAuth = (type: any) => async (req: any, res: any, next: any) => {
  let token = req.headers.authorization
  try {
    const tokenData: any = await verifyToken(getToken(token));
    console.log(type, "typooo");

    let typeRole = type[0] == 'admin' ? 1 : 0;

    if (tokenData.admin === typeRole) {
      console.log('neexr');
      next();
    } else {
      return res.status(403).json({ error: true });
    }
  } catch (error) {
    return res.status(401).json({ error: true });
  }
}

export { checkRoleAuth };