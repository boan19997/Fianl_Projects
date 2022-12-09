//hash password
const argon2 = require("argon2");

//jwt
var jwt = require("jsonwebtoken");
//
const user = require("../models/user");
const middlewareController = require("./middleware");

const admin = require("../config/firebase.config");

const router = require("express").Router();
//tên của chức năng dùng để ghép vs phần ở app.js để ra api
router.get("/login", async (req, res) => {
  // đây là gửi api qua postman
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invallid Token" });
  }

  const token = req.headers.authorization.split(" ")[1];

  //format body trong postman
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(505).json({ message: "Un Authorized" });
    } else {
      //Checking user exists or not
      const userExists = await user.findOne({ user_id: decodeValue.user_id });
      if (!userExists) {
        newUserData(decodeValue, req, res);
      } else {
        updateNewUserData(decodeValue, req, res);
      }
    }
  } catch (error) {
    return res.status(505).json({ message: error });
  }
});

// tạo data user
const newUserData = async (decodeValue, req, res) => {
  const newUser = new user({
    name: decodeValue.name,
    email: decodeValue.email,
    imageURL: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verified: decodeValue.email_verified,
    role: "member",
    auth_time: decodeValue.auth_time,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
};

//update Data user
const updateNewUserData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };

  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await user.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      options
    );
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
};

router.get("/getUsers", async (req, res) => {
  const options = {
    sort: {
      createdAt: 1,
    },
  };

  const cursor = await user.find(options);
  if (cursor) {
    res.status(200).send({ success: true, data: cursor });
  } else {
    res.status(400).send({ success: false, msg: "No Data Found" });
  }
});

router.put("/updateRole/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };
  const role = req.body.data.role;

  try {
    const result = await user.findOneAndUpdate(filter, { role: role });
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

router.delete("/deleteUser/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };

  const result = await user.deleteOne(filter);

  if (result.deletedCount === 1) {
    res.status(200).send({ success: true, msg: "User Removed" });
  } else {
    res.status(400).send({ success: false, msg: "User Not Found " });
  }
});

//đăng nhập
router.post("/logine", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập email" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "vui lòng nhập mật khẩu" });
  }

  //check email
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!email.match(mailformat)) {
    return res
      .status(400)
      .json({ success: false, message: "Email không hợp lệ" });
  }

  //check pass
  if (password.length < 8) {
    return res
      .status(400)
      .json({ success: false, message: "Mật khẩu không hợp lệ" });
  }

  try {
    //kiểm tra tài khoản có tồn tại không
    const userinfor = await user.findOne({ email });
    // console.log(user.password);
    if (!userinfor) {
      return res.status(400).json({
        success: false,
        message: "Kiểm tra lại tài khoản và mật khẩu",
      });
    }
    //kiem tra password
    const passwordValid = await argon2.verify(userinfor.password, password);
    if (!passwordValid) {
      return res.status(400).json({
        success: false,
        message: "Kiểm tra lại tài khoản và mật khẩu",
      });
    }
    //All good
    const accessToken = jwt.sign(
      {
        _id: userinfor._id,
        email: userinfor.email,
        role: userinfor.role,
        name: userinfor.name,
      },
      process.env.ACCESSTOKEN_MK,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      accessToken,
      user: userinfor
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, msg: "Try again next time" });
  }
});

//đăng kí
router.post("/register", async (req, res) => {
  const { email, password, role, name } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập email" });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng nhập mật khẩu",
    });
  }

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng nhập tên",
    });
  }

  //check email
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!email.match(mailformat)) {
    return res
      .status(400)
      .json({ success: false, message: "Không đúng định dạng email" });
  }

  //check pass
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Mật khẩu phải trên 8 ký tự",
    });
  }

  try {
    //kiểm tra tài khoản có tồn tại không
    const User = await user.findOne({ email }).count();

    if (User > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Tài khoản đã tồn tại" });
    }
    //All ok
    const hashPassword = await argon2.hash(password);
    const newUser = new user({
      email,
      password: hashPassword,
      role,
      name,
      // user_id: decodeValue.user_id,
    });
    //luu vao DB
    await newUser.save();

    return res.status(200).json({ success: true, message: "Tạo thành công" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, msg: "Try again next time" });
  }
});

//send role
router.post("/role", middlewareController.verifyToken, async (req, res) => {
  try {
    return res
      .status(200)
      .json({
        success: true,
        data: {
          role: req.user.role,
          UserID: req.user._id,
          name: req.user.name,
        },
      });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Try again next time" });
  }
});

//getone
router.get("/getoneuser/:id", async (req, res) => {
  const {id} = req.params
  try {
    const data = await user.findById({_id:id})
    return res
      .status(200)
      .json({
        user: data
      });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Try again next time" });
  }
});

module.exports = router;
