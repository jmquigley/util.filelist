'use strict';

const fs = require('fs-extra');

module.exports = function(filename) {
    let arr = [];

    if (fs.existsSync(filename)) {
        let lines = fs.readFileSync(filename).toString().split(/\r?\n|\r/);

        lines.forEach(function(line) {
            line = line.trim();

            if (!line.startsWith('#') && line !== '') {
                arr.push(line);
            }
        });
    }

    return arr;
};
