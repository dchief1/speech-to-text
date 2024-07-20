import app from "./app";
import http from "http";
import getServerPort from "./utils/getServerPort";
import swaggerDocs from "./utils/swagger";

const server = http.createServer(app);

const port = getServerPort();

server.listen(port, () => {
  console.log(`Server up and running, listening on http://localhost:${port}`);

  swaggerDocs(app, port);
});

export default server;
