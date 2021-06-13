module.exports = {
  isEmpty: (input) => {
    if (!input || input === undefined || input === null) return true;
    if (typeof input === 'object') return Object.keys(input).length < 1;
    return input.length < 1;
  },
};
