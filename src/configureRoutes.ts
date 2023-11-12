import { FastifyInstance } from "fastify";

import Controller from "./controller";

function configureRoutes(app: FastifyInstance) {
  app.get("/youtube/video", Controller.handleVideoRequest);
  app.get("/youtube/playlist", Controller.handlePlaylistRequest);
  app.get("/youtube/playlistItems", Controller.handlePlaylistItemsRequest);
}

export default configureRoutes;