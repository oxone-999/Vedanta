const User = require("../models/user");
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
  try {
    const { name, employeeId, password, avatar } = req.body;

    // const images = await cloudinary.uploader.upload(avatar, {
    //   folder: "avatars-vedanta",
    // });

    const username = await User.findOne({ username: name });
    if (username) {
      res.status(400).json({ error: "Username already exists" });
    }

    const user = await User.findOne({ employeeId: employeeId });
    if (user) {
      res.status(400).json({ error: "employeeId already exists" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: name,
      employeeId: employeeId,
      password: hashedPassword,
      // avatar: {
      //   public_id: images.public_id,
      //   url: images.secure_url,
      // },
      avatar: avatar,
    });

    const savedUser = await newUser.save();
    res.status(200).json({ status: "ok", user: savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "Error creating user" });
  }
};

module.exports = {
  Signup,
};
