import { Test } from "../model/test.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllData = asyncHandler(async (req, res) => {
  const data = await Test.find();

  if (!data) {
    return res.send("No Data Found");
  }

  return res.send(data);
});

const createData = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  // Check if user already exists by username or email
  const existingUser = await Test.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return res.status(409).send("User already exists");
  }

  const data = await Test.create({ username, email, password });

  if (!data) {
    return res.status(500).send("Failed to create user");
  }

  return res.status(201).send(data);
});

const deleteData = asyncHandler(async (req, res) => {
  const data = await Test.findOneAndDelete({ _id: req.params.id });

  if (!data) {
    return res.send("No data found corresponds to this id: ", req.params.id);
  }

  return res.send(data);
});

const updateData = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const data = await Test.findOneAndUpdate(
      { _id: req.params.id },
      { username, password },
      { new: true }
    );

    if (!data) {
      return res.send("ID not found");
    }

    return res.send(data);
  } else if (username) {
    const data = await Test.findById(req.params.id);

    data.username = username;

    await data.save({ validateBeforeSave: false });

    if (!data) {
      return res.send("ID not found");
    }

    return res.send(data);
  } else if (password) {
    const data = await Test.findById(req.params.id);

    data.password = password;

    await data.save({ validateBeforeSave: false });

    if (!data) {
      return res.send("ID not found");
    }

    return res.send(data);
  }
});

export { deleteData, getAllData, createData, updateData };
