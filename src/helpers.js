  
function generate_package_name() {
    // let's create a fun and human-readable Id
    return ['amazing', 'blessed', 'durable', 'engaged', 'hellish'][Math.floor(Math.random()*5)] +
    ['manatee', 'octopus', 'penguin', 'buffalo', 'axolotl'][Math.floor(Math.random()*5)] +
    'from' +
    ['western', 'unfunny', 'tainted', 'riddled', 'likable'][Math.floor(Math.random()*5)] +
    ['albania', 'belgium', 'jamaica', 'denmark', 'namibia'][Math.floor(Math.random()*5)];
}

module.exports = { generate_package_name: generate_package_name };