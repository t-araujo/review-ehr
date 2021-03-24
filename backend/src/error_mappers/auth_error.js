module.exports = (error) => {
  if (error.message !== 'Authentication Error') {
    throw error
  }
  return [{
    code: 401,
    message: error.message,
  }]
}
