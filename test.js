'use strict';

const fs = require('fs-extra');
const test = require('ava');
const getFileList = require('./index');

let unitTestDir = 'tmp-unit-test-data';
let f = `${unitTestDir}/testfile.list`;

test.before(t => {
	if (fs.existsSync(unitTestDir)) {
		fs.removeSync(unitTestDir);
	}
	fs.mkdirSync(unitTestDir);

	let lines = [
		'# Comment line',
		'',
		'	item1',
		'item2',
		'',
		'	item 3   '
	];

	fs.writeFileSync(f, lines.join('\n'));

	t.pass();
});

test.after.always('cleanup', t => {
	fs.removeSync(unitTestDir);
	t.pass();
});

test('Validating file list creation', t => {
	let lines = getFileList(f);

	t.true(lines instanceof Array);
	t.true(lines.length === 3);
	t.is(lines[0], 'item1');
	t.is(lines[1], 'item2');
	t.is(lines[2], 'item 3');
});
