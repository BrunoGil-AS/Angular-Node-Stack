import http from "http";

/**
 * A simple HTTP server using Node.js native 'http' module.
 * It handles basic routing for
 * -  `route`: '/'
 * -  `route`: '/api/users' endpoints.
 *
 *  **Main issue with this approach**:
 *  - Lacks advanced features:
 *      - middleware support.
 *      - routing.
 *      - easy JSON handling.
 */
export default function NativeHttp() {
  const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    res.setHeader("Content-Type", "text/plain");

    if (req.url === "/") {
      res.statusCode = 200;
      res.end("Hello, World!\n");
    } else if (req.url === "/api/users") {
      res.statusCode = 200;
      res.end(
        JSON.stringify([
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
        ])
      );
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  });
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}
