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

const sortedLeft = leftList.toSorted();
const sortedRight = rightList.toSorted();

const zipped = sortedLeft.map((_, i) => [sortedLeft[i], sortedRight[i]]);
const result = zipped.reduce(
	(acc, [left, right]) =>
		!left || !right ? acc : acc + Math.abs(left - right),
	0,
);

console.log(result);
