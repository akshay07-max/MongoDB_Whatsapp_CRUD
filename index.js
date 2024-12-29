const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./Models/chat.js"); // importing Chat model.
const methodOverride = require("method-override")

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// parse data coming from req.body
app.use(express.urlencoded({ extended: true }));

main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const PORT = 8080;

// index Route to see all Chats
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  // console.log(chats);
  res.render("index.ejs", { chats });
});

//New Chat
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create Route (adding new chat)
app.post("/chats", (req, res) => {
  let { from, msg, to } = req.body;
  let newChat = new Chat({
    from: from,
    msg: msg,
    to: to,
    createdAt: new Date(),
  });

  newChat
    .save()
    .then((res) => {
      console.log("chats saved");
    })
    .catch((err) => {
      console.log(err);
    });

  res.redirect("/chats");
});

// edit Route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// Update Route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

// Delete Route
app.delete("/chats/:id", async (req, res)=>{
  let {id} = req.params;
  let delChat = await Chat.findByIdAndDelete(id);
  console.log(delChat);
  res.redirect("/chats");

})

app.get("/", (req, res) => {
  res.send("Route is Working");
});

app.listen(PORT, () => {
  console.log(`You are on port ${PORT}`);
});
