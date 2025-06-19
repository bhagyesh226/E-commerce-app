async function userLogout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    });

    res.json({
      message: "User logged out",
      error: false,
      success: true,
      data: []
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
}

module.exports = userLogout;
