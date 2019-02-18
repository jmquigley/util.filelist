"use strict";

import * as fs from "fs-extra";

export function getFileList(filename: string) {
	const arr: string[] = [];

	if (fs.existsSync(filename)) {
		const lines = fs
			.readFileSync(filename)
			.toString()
			.split(/\r?\n|\r/);

		lines.forEach((line) => {
			line = line.trim();

			if (!line.startsWith("#") && line !== "") {
				arr.push(line);
			}
		});
	}

	return arr;
}
