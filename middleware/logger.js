let urlLogger = (req, _res, next) => {
  console.log(`url: ${req.originalUrl}`);
  next();
};

let postBodyLogger = (req, _res, next) => {
  console.log(`body: ${JSON.stringify(req.body)}`);
  next();
};

module.exports = { urlLogger, postBodyLogger };
