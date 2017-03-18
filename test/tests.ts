'use strict';

import * as assert from 'assert';
import * as fs from 'fs-extra';
import * as path from 'path';
import {Fixture} from 'util.fixture';
import {debug} from './helpers';
import {getFileList} from '../index';

describe('Testing util.filelist', () => {

	after(() => {
		debug('final cleanup');
		let directories = Fixture.cleanup();
		directories.forEach((directory: string) => {
			assert(!fs.existsSync(directory));
		});
	});

	it('Validating file list creation', () => {
		let fixture = new Fixture('simple');
		let lines = getFileList(path.join(fixture.dir, 'testfile.list'));

		assert(lines instanceof Array);
		assert(lines.length === 3);
		assert.equal(lines[0], 'item1');
		assert.equal(lines[1], 'item2');
		assert.equal(lines[2], 'item 3');
	});
});
