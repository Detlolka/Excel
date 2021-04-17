
console.log('Module')

async function start() {
   return await Promise.resolve().
    then(console.log('Node'))
}

start()
