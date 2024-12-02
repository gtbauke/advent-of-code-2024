import { readFile } from "node:fs/promises";
import path from "node:path";

const inputPath = path.join(import.meta.dirname, "inputs", "2-1.txt");
const content = await readFile(inputPath, { encoding: "utf-8" });

const lines = content
	.split("\n")
	.map((line) => line.split(" "))
	.map((line) => line.filter((a) => a !== ""))
	.map((line) => line.map((a) => Number.parseInt(a, 10)))
	.filter((line) => line.length > 0);

const safeLines = lines.filter((line) => isSafe(line) || canBeSafe(line));
console.log(safeLines.length);

function canBeSafe(line: number[]): boolean {
	const possibilities = line.map((_, i) => {
		const copy = [...line];
		copy.splice(i, 1);

		return copy;
	});
	const safe = possibilities.some(isSafe);

	return safe;
}

function isSafe(line: number[]): boolean {
	const diffs: number[] = [];

	for (let i = 0; i < line.length; ++i) {
		const current = line[i];
		const next = line[i + 1];

		if (next === undefined) {
			continue;
		}

		diffs.push(current - next);
	}

	const monotonic =
		diffs.every((diff) => diff >= 0) || diffs.every((diff) => diff <= 0);
	const inRange = diffs.every(
		(diff) => Math.abs(diff) > 0 && Math.abs(diff) <= 3,
	);

	return monotonic && inRange;
}
