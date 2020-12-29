module.exports = function (func) {
  return async (req, res, next) => {
    try {
      if (!func) throw { message: 'controller not defined' }
      await func(req, res);
    } catch (error) {
      if (error.errors) {
        res.status(400).send({
          status: false,
          message: error._message,
          details: error.errors
        })
      } else if (error.message) {
        res.status(500).send({
          status: false,
          message: error.message
        });
      }
    }
  }
}
