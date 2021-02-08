import fs from "fs";
import path from "path";
import brain from "brain.js";
import { cwd } from "process";

import train from "./services/train";

const inputs: string[] = [
	"this is an api issue",
	"the motherboard is fried"
];

const network: brain.recurrent.LSTM = new brain.recurrent.LSTM();
let training: brain.INeuralNetworkJSON;

try {
	const net: Buffer = fs.readFileSync(path.join(cwd(), "./networks/network.json"));
	training = JSON.parse(net.toString());
} catch (e) {
	console.log("no trained networks");
	train();
	const net: Buffer = fs.readFileSync(path.join(cwd(), "./networks/network.json"));
	training = JSON.parse(net.toString());
}
finally {
	network.fromJSON(training);
	inputs.forEach(input => {
		console.log(`'${input}': ${network.run(input)}`);
	});
}