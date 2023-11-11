import axios from "axios";
import * as qs from "qs";

const requester = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat" })
});

class Service {
  static async getVideoById(id: string) {
    const response = await requester.get("/videos", {
      params: {
        key: process.env.GOOGLE_API_KEY,
        id: [id],
        part: ["id", "snippet"]
      },
    });

    return response.data.items;
  }

  static async getPlaylistById(id: string) {
    const response = await requester.get("/playlistItems", {
      params: {
        key: process.env.GOOGLE_API_KEY,
        playlistId: [id],
        part: ["id", "snippet"]
      },
    });

    return response.data.items;
  }
}

export default Service;
