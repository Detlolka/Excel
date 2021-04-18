console.log('Module');
const get = async function() {
  return await Promise.resolve().
      then(console.log('MOS'));
};
get();
