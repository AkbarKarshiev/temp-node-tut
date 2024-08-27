const { createReadStream, writeFileSync } = require('fs');

// for (let i = 0; i < 100000; i++) {
//   writeFileSync('./content/big-file.txt', `hello world ${i}\n`, { flag: 'a' });
// }

const strean = createReadStream(
  './content/big-file.txt',
  { 
    highWaterMark: 90000, 
    // encoding: 'utf8' 
  }
);

// default 64kb
// last buffer - remainder
// highWaterMark - control size
// const strean = createReadStream('./content/big-file.txt', { highWaterMark: 90000 });
// const strean = createReadStream('./content/big-file.txt', { encoding: 'utf8' });

strean.on('data', (result) => {
  console.log('-----NEW CHUNK-----');
  console.log(result);
});

strean.on('error', (err) => console.log(err));
