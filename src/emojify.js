module.exports = function emojify(value) {
    let str = String(value);
    if (str.length === 1) {
        str = `0${str}`;
    };

    return str.split('').map(char => `${char}&#8419;`).join('');
};