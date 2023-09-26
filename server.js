const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

app.engine(".html", require("ejs").__express);
app.set("views", __dirname);
app.set("view engine", "html");
app.use(cors());

app.get("/:id", (req, res) => {
  // set headers here
  res.set("X-Content-Type-Options", "nosniff");
  res.set(
    "Content-Security-Policy",
    "default-src 'unsafe-inline' data: blob: http://localhost:3001;"
    // --------------------------------------^ change this to your domain
  );

  // render html views
  res.render(req.params.id);

  // or proxy fetch request (example for real inscription usage)
  // fetch(
  //   `https://api.hiro.so/ordinals/v1/inscriptions/${req.params.id}/content`
  // ).then((response) => {
  //   response.body.pipeTo(
  //     new WritableStream({
  //       start() {
  //         response.headers.forEach((v, n) => {
  //           if (
  //             ["content-security-policy", "content-encoding"].includes(
  //               n.toLowerCase()
  //             )
  //           )
  //             return;
  //           res.setHeader(n, v);
  //         });
  //       },
  //       write(chunk) {
  //         res.write(chunk);
  //       },
  //       close() {
  //         res.end();
  //       },
  //     })
  //   );
  // });
});

app.get("/content/:id", (req, res) => {
  res.redirect(`/${req.params.id}`);
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
