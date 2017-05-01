function lessBy(property) {
  return function (thisValue, thatValue) {
    return thisValue[property] < thatValue[property] ? -1
      : thisValue[property] > thatValue[property] ? 1
      : 0;
  };
}

module.exports = lessBy;
