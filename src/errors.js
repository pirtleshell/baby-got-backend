class BabyGotError extends Error {
  constructor(message) {
    super('[BabyGotBackEnd] ' + message);
  }
}

module.exports = BabyGotError;
