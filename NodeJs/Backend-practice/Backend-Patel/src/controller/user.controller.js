import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {});
const loginUser = asyncHandler(async (req, res) => {});
const logoutUser = asyncHandler(async (req, res) => {});
const changePassword = asyncHandler(async (req, res) => {});
const forgetPassword = asyncHandler(async (req, res) => {});

export { registerUser, loginUser, logoutUser, changePassword, forgetPassword };
