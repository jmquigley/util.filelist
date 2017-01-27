'use strict';

const path = require('path');
const fs = require('fs-extra');
const test = require('ava');
const home = require('expand-home-dir');
const uuidV4 = require('uuid/v4');
const getFileList = require('./index');

let unitTestBaseDir = home(path.join('~/', '.tmp', 'unit-test-data'));
let unitTestDir = home(path.join(unitTestBaseDir, uuidV4()));
if (!fs.existsSync(unitTestDir)) {
	fs.mkdirsSync(unitTestDir);
}
let f = path.join(unitTestDir, 'testfile.list');

test.before(t => {
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
	fs.removeSync(unitTestBaseDir);
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
