import App from './App.svelte';
import data from "./data.json"

const app = new App({
	target: document.body,
	props: {
		dataObject: data
	}
});

export default app;