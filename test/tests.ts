'use strict';

import * as assert from 'assert';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as uuid from 'uuid';
import {getFileList} from '../index';

const home = require('expand-home-dir');

let unitTestBaseDir = home(path.join('~/', '.tmp', 'unit-test-data'));
let unitTestDir = home(path.join(unitTestBaseDir, uuid.v4()));
if (!fs.existsSync(unitTestDir)) {
	fs.mkdirsSync(unitTestDir);
}
let f = path.join(unitTestDir, 'testfile.list');

describe('Testing util.filelist', () => {

	before(() => {
		let lines = [
			'# Comment line',
			'',
			'	item1',
			'item2',
			'',
			'	item 3   '
		];

		fs.writeFileSync(f, lines.join('\n'));
	});

	after('cleanup', () => {
		fs.removeSync(unitTestBaseDir);
	});

	it('Validating file list creation', () => {
		let lines = getFileList(f);

		assert(lines instanceof Array);
		assert(lines.length === 3);
		assert.equal(lines[0], 'item1');
		assert.equal(lines[1], 'item2');
		assert.equal(lines[2], 'item 3');
	});
});
