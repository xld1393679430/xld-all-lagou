const obj = {
	first: "a",
	last: "b",
}

for (const [key, value] of Object.entries(obj)) {
	console.log(key, value);
}