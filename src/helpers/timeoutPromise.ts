export default function timeoutPromise(ts = 100) {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, ts);
	});
}
