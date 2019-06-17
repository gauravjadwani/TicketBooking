// export default const getCircularReplacer = () => {
export const charFrequency = arr => {
  let count = {};
  arr.forEach(function(s) {
    count[s] ? count[s]++ : (count[s] = 1);
  });
  return count;
};
