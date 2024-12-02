import { readFile } from "node:fs/promises";
import path from "node:path";

const inputPath = path.join(import.meta.dirname, "inputs", "1-1.txt");
const content = await readFile(inputPath, { encoding: "utf-8" });

const numbers = content
	.split("\n")
	.map((line) => line.split(" "))
	.map((line) => line.filter((a) => a !== ""))
	.map((line) => line.map((a) => Number.parseInt(a, 10)));

const leftList: number[] = [];
const rightList: number[] = [];

for (let i = 0; i < numbers.length; ++i) {
	leftList.push(numbers[i][0]);
	rightList.push(numbers[i][1]);
}

const appearances: [number, number][] = [];
for (let i = 0; i < leftList.length; ++i) {
	if (leftList[i] === undefined) {
		continue;
	}

	const amount = findAllAppearances(rightList, leftList[i]).length;
	appearances.push([leftList[i], amount]);
}

const score = appearances.reduce(
	(acc, [value, times]) => acc + value * times,
	0,
);

console.log(score);

function findAllAppearances<T>(values: T[], toFind: T): number[] {
	const indexes: number[] = [];

	for (let i = 0; i < values.length; ++i) {
		if (values[i] === toFind) {
			indexes.push(i);
		}
	}

	return indexes;
}
