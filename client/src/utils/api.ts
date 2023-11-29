import axios from "axios";

import { config } from "../utils/config";

const apiInstance = (token: string) => {
  return {
    apiAxios: axios.create({
      baseURL: `${config.api}/api`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      },
    })
  }
}



export { apiInstance };
