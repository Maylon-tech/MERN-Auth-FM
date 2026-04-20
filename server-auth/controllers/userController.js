import asyncHandler from "../utils/asyncHandler"

export const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "user profile fetched successfully",
        data: {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            createdAt: req.user.createAt,
        }

    })
})