import fs from "fs";
import path from "path";
import brain from "brain.js";
import { cwd } from "process";

const rawData: Buffer = fs.readFileSync(path.join(cwd(), "./training/training.json"));
const parsedData = JSON.parse(rawData.toString());

const network: brain.recurrent.LSTM = new brain.recurrent.LSTM();

const trainingData: brain.IRNNTrainingData[] = parsedData.map((item: any) => (
	{
		input: item.text,
		output: item.category
	}
));

export default () => {
	console.log("training nueral net...");
	network.train(trainingData, { iterations: 2000 });
	fs.writeFileSync(path.join(cwd(), "./networks/network.json"), JSON.stringify(network.toJSON()));
	console.log("trained nueral net added to ./networks/network.json");
};