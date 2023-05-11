import App from './App.svelte';
import data from "./data.json"

/**
 * ÜBERNOMMEN AUS WEBAPP DER EDA STUDIE (ZEILE 1 - 15)
 */

const app = new App({
	target: document.body,
	props: {
		dataObject: data,
	}
});

export default app;