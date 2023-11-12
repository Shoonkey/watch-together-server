import { FastifyReply, FastifyRequest } from "fastify";

import Service from "./service";

interface GetVideoByIdQuery {
  id?: string;
}

interface GetPlaylistByIdQuery {
  id: string;
}

interface GetPlaylistItemsQuery {
  playlistId: string;
  pageToken?: string;
}

class Controller {
  static async handleVideoRequest(
    request: FastifyRequest<{ Querystring: GetVideoByIdQuery }>,
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
    request: FastifyRequest<{ Querystring: GetPlaylistByIdQuery }>,
    reply: FastifyReply
  ) {
    const playlistId = request.query.id;

    if (!playlistId) return reply.code(400).send("Invalid playlist ID");

    try {
      const playlist = await Service.getPlaylistById(playlistId, { withDetails: true });

      if (playlist) reply.code(200).send(playlist);
      else reply.code(404).send("Playlist not found");
    } catch (err) {
      request.log.error(err);
      reply.code(400).send(err);
    }
  }

  static async handlePlaylistItemsRequest(
    request: FastifyRequest<{ Querystring: GetPlaylistItemsQuery }>,
    reply: FastifyReply
  ) {
    const playlistId = request.query.playlistId;

    if (!playlistId) return reply.code(400).send("Invalid playlist ID");

    try {
      const items = await Service.getPlaylistItems(playlistId, request.query.pageToken);

      if (items) reply.code(200).send(items);
      else reply.code(404).send("Playlist not found");
    } catch (err) {
      request.log.error(err);
      reply.code(400).send(err);
    }
  }
}

export default Controller;
