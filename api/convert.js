

function convert(input) {
  return input
    .replace(/\[STX\]/g, '\x02')
    .replace(/\[TAB\]/g, '\t')
    .replace(/\[ETX\]/g, '\x03');
}

module.exports = convert
