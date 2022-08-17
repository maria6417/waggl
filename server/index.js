/* eslint-disable no-console */
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const db = require("../database/postgres");
const accountSettingsRoutes = require("./routes/accountSettingsRoutes");
// const messageRoutes = require('./routes/messageRoutes');
const packsRoutes = require("./routes/packsRoutes");
const eventsRoutes = require("./routes/eventsRoutes");

dotenv.config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB connected");
  }
});
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
app.use(express.json());
const socketRouter = require("./routes/socketRouter.js")(io);
const messageRoutes = require("./routes/messageRoutes.js");
app.use(express.static(path.join(__dirname, "../dist")));
app.use(cors());
app.use("/api/message", () => socketRouter());
app.use("/api/messages", messageRoutes);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist")));
app.use("/api/accountSettings", accountSettingsRoutes);
app.use("/api/packs", packsRoutes);
app.use("/api/events", eventsRoutes);
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

// example query:
// app.get('some endpoint', async (req, res) => {
// const yourData = await.process.postgresql.query(
// 'Your query here;'
// )
// res.status(200).send(JSON.stringify(yourData))
// })
