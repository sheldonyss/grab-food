// import * as Mustache from 'mustache';
const Mustache = require('mustache');
const fs = require('fs');
const nodeHtmlToImage = require('node-html-to-image');

function renderReceipt(viewData, i) {
  fs.readFile('./template.html', function (err, data) {
    if (err) throw err;
    const output = Mustache.render(data.toString(), viewData);
    nodeHtmlToImage({
      output: `./output/grab-receipt-${i}.png`,
      html: output,
    });
    fs.writeFileSync('./output/rendered.html', output);
    // do something with output...
  });
}

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function pickRandom(arrayItems) {
  const index = Math.floor((Math.random() * 100) % arrayItems.length);
  return arrayItems[index];
}

function getRandomTime(d) {
  const hour = pickRandom(['11', '12', '13']);
  let minutes = Math.floor(Math.random() * 60);
  if (minutes === 0 || minutes === 60) {
    minutes = 31;
  }
  return `${d} ${String(hour).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )} +0800`;
}

function getBookingCode() {
  const part1 = randomString(1, '123456789');
  const part2 = randomString(
    11,
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  );
  return `A-${part1}${part2}`.toUpperCase();
}

function main() {
  const dates = [
    '02 Jun 22',
    '09 Jun 22',
    '16 Jun 22',
    '23 Jun 22',
    '30 Jun 22',
    '07 Jul 22',
  ];
  const drivers = [
    'Jermaine Foo',
    'Henry Heng Kong',
    'Mark Cui',
    'Susan Tan',
    'Bryan Koh',
    'Cher Tan',
    'Robert Ng',
    'Andrew Wong',
    'Benny Lim Meng Pei',
    'Stephanie Tan Ai Lin',
    'Samuel Goh Chee Lai',
    'Minna Ko-Koh',
    'Bryan Wee Beng Chee',
    'Jovin Yeo Le Hock',
    'Aileen Zhang Xing Xing',
    'Simeon Tan',
  ];
  let i = 1;
  for (let date of dates) {
    const receiptInputs = {
      pickupDate: `${getRandomTime(date)}`, //06 Jan 22 11:23 +0800
      bookingCode: getBookingCode(), //A-2UOPRJGWWFQD
      driverName: pickRandom(drivers),
    };
    console.log(`generating ${i}th receipt.`);
    renderReceipt(receiptInputs, date);
    i++;
  }
}

main();
