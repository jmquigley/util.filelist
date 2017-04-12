'use strict';

import test from 'ava';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as uuid from 'uuid';
import {getFileList} from '../index';

const home = require('expand-home-dir');

const unitTestBaseDir = home(path.join('~/', '.tmp', 'unit-test-data'));
const unitTestDir = home(path.join(unitTestBaseDir, uuid.v4()));
if (!fs.existsSync(unitTestDir)) {
	fs.mkdirsSync(unitTestDir);
}
const f = path.join(unitTestDir, 'testfile.list');

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

test.after(t => {
	fs.removeSync(unitTestBaseDir);
	t.pass();
});

test('Validating file list creation', t => {
	let lines = getFileList(f);

	t.true(lines instanceof Array);
	t.is(lines.length, 3);
	t.is(lines[0], 'item1');
	t.is(lines[1], 'item2');
	t.is(lines[2], 'item 3');
});
