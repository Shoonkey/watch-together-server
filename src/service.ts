import axios from "axios";
import * as qs from "qs";

const requester = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat" }),
  params: {
    key: process.env.GOOGLE_API_KEY
  }
});

interface GetPlaylistOptions {
  withDetails?: boolean;
}

class Service {
  static async getVideoById(id: string) {
    const response = await requester.get("/videos", {
      params: {
        key: process.env.GOOGLE_API_KEY,
        id: [id],
        part: ["id", "snippet", "statistics"]
      },
    });

    return response.data.items[0];
  }

  static async getPlaylistById(id: string, { withDetails = false }: GetPlaylistOptions = {}) {
    const part = ["id"];

    if (withDetails)
      part.push("snippet", "contentDetails");

    const response = await requester.get("/playlists", {
      params: {
        id: [id],
        part
      }
    });

    return response.data.items[0];
  }

  static async getPlaylistItems(playlistId: string, pageToken?: string) {
    const response = await requester.get("/playlistItems", {
      params: {
        playlistId: [playlistId],
        part: ["id", "snippet"],
        pageToken
      }
    });

    return response.data.items;
  }
}

export default Service;
