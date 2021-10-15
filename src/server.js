const express = require("express");
const cors = require("cors");

const postRouter = require("./routes/posts.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/posts", postRouter);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
