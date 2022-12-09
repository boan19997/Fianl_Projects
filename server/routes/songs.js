const router = require("express").Router();

//our song model
const song = require("../models/song");
const user = require("../models/user");
//add fauvorites
router.post("/fauvorites/:id", async (req, res) => {
  const player = await user.findById(req.body._id);
  const newMusic = player.songs;
  const checkMusic = newMusic.includes(req.params.id);
  if (checkMusic == false) {
    newMusic.push(req.params.id);
  }
  player.update({
    songs: newMusic,
  });
  player.populate("songs");
  if (player) {
    await player.save();
    return res.status(200).send({ success: true, user: player });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});
router.get("/user/:id", async (req, res) => {
  let player = await user
    .findById(req.params.id)
    .populate("songs")
    .populate("playlist");
  if (player) {
    return res.status(200).send({ success: true, user: player });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});
router.post("/fauvoritesdetele/:id", async (req, res) => {
  const player = await user.findById(req.body._id);
  const allFauvorites = player.songs.filter((item) => item != req.params.id);
  await player.update({
    songs: allFauvorites,
  });
  // player.populate("songs")
  if (player) {
    await player.save();
    return res.status(200).send({ success: true, user: player });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});
//Add song mới
router.post("/save", async (req, res) => {
  const newSong = song({
    name: req.body.name,
    imageURL: req.body.imageURL,
    songURL: req.body.songURL,
    album: req.body.album,
    artist: req.body.artist,
    language: req.body.language,
    category: req.body.category,
  });

  try {
    const savedSong = await newSong.save();
    return res.status(200).send({ success: true, song: savedSong });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

//lấy 1 id của song
router.get("/getOne/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const data = await song.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, song: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

//lấy tất cả song kiểu như lấy danh sách
router.get("/getAll", async (req, res) => {
  const options = {
    sort: {
      createdAt: 1,
    },
  };

  const data = await song.find(options);
  if (data) {
    return res.status(200).send({ success: true, songs: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

//update song
router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await song.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
      },
      options
    );
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

//delete song
router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const result = await song.deleteOne(filter);
  if (result) {
    return res
      .status(200)
      .send({ success: true, msg: "Data Deleted successfully", data: result });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});
router.post("/playlist/:id", async (req, res) => {
  const player = await user.findById(req.body._id);
  const newMusic = player.playlist;
  const checkMusic = newMusic.includes(req.params.id);
  if (checkMusic == false) {
    newMusic.push(req.params.id);
  }
  player.update({
    playlist: newMusic,
  });
  player.populate("songs");
  if (player) {
    await player.save();
    return res.status(200).send({ success: true, user: player });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

router.post("/playlistdetele/:id", async (req, res) => {
  const player = await user.findById(req.body._id);
  const allPlaylist = player.playlist.filter((item) => item != req.params.id);
  await player.update({
    playlist: allPlaylist,
  });
  // player.populate("songs")
  if (player) {
    await player.save();
    return res.status(200).send({ success: true, user: player });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

//tăng lượt nghe bài hát
router.post("/addlistens/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ success: false, msg: "not id" });
  }

  try {
    const data = await song.findById({ _id: id });
    await song.findByIdAndUpdate({ _id: id }, { listens: data.listens + 1 });

    return res.status(200).send({ success: false, msg: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, msg: "Try again next time" });
  }
});

//xếp hạng bài hát
router.get("/rank", async (req, res) => {
  try {
    const data = await song.find().sort({ listens: -1 });

    return res.status(200).send({ success: false, songs: data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, msg: "Try again next time" });
  }
});

//tìm theo tên bài hát
router.post("/search", async (req, res) => {
  const { valueSearch } = req.body;

  try {
    const data = await song.find({
      name: { $regex: valueSearch, $options: "si" },
    })
      .limit(10)
      .sort({ name: -1 });

    if (data.length == 0) {
      return res
        .status(400)
        .json({ success: true, msg: "Dữ liệu Không tồn tại" });
    }

    return res
      .status(200)
      .json({ success: true, songs: data, totalPage: 1 });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg:  "Try again next time"});
  }
});

module.exports = router;
