import { FastifyReply, FastifyRequest } from "fastify";

import Service from "./service";

interface VideoRequestData {
  id?: string;
}

interface PlaylistRequestData {
  id: string;
}

class Controller {
  static async handleVideoRequest(
    request: FastifyRequest<{ Querystring: VideoRequestData }>,
    reply: FastifyReply
  ) {
    const videoId = request.query.id;

    if (!videoId) return reply.code(400).send("Invalid video ID");

    try {
      const video = await Service.getVideoById(videoId);

      if (video) reply.code(200).send(video);
      else reply.code(404).send("Video not found");
    } catch (err) {
      request.log.error(err);
      reply.code(400).send(err);
    }
  }

  static async handlePlaylistRequest(
    request: FastifyRequest<{ Querystring: PlaylistRequestData }>,
    reply: FastifyReply
  ) {
    const playlistId = request.query.id;

    if (!playlistId) return reply.code(404).send("Video not found");

    try {
      const playlist = await Service.getPlaylistById(playlistId);

      if (playlist) reply.code(200).send(playlist);
      else reply.code(404).send("Video not found");
    } catch (err) {
      request.log.error(err);
      reply.code(400).send(err);
    }
  }
}

export default Controller;
