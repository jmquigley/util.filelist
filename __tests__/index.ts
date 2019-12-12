import * as fs from "fs-extra";
import * as path from "path";
import * as uuid from "uuid";
import { getFileList } from "../index";

const home = require("expand-home-dir");

const unitTestBaseDir = home(path.join("~/", ".tmp", "unit-test-data"));
const unitTestDir = home(path.join(unitTestBaseDir, uuid.v4()));
if (!fs.existsSync(unitTestDir)) {
	fs.mkdirsSync(unitTestDir);
}
const f = path.join(unitTestDir, "testfile.list");

beforeAll(() => {
	const lines = ["# Comment line", "", "	item1", "item2", "", "	item 3   "];

	fs.writeFileSync(f, lines.join("\n"));
});

afterAll(() => {
	fs.removeSync(unitTestBaseDir);
});

test("Validating file list creation", () => {
	const lines = getFileList(f);

	expect(lines instanceof Array).toBe(true);
	expect(lines.length).toBe(3);
	expect(lines[0]).toBe("item1");
	expect(lines[1]).toBe("item2");
	expect(lines[2]).toBe("item 3");
});
