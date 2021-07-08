// @ts-nocheck
import * as yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as fs from 'fs';
import * as path from 'path';
import { zip } from 'zip-a-folder';
import * as rln from 'readline';

const argv = yargs(hideBin(process.argv))
	.option('inputImage', {
		alias: ['image', 'img', 'i'],
		description: 'The path to the image (in png or jpg format) to use',
		type: 'string',
		demandOption: true,
	})
	.option('inputFile', {
		alias: ['input', 'in', 'I'],
		type: 'string',
		description: 'A path to input files or folders',
	})
	.option('pipedFileName', {
		alias: ['pipedName', 'pfn', 'pn', 'p'],
		type: 'string',
		description:
			'If piping data, this is the filename that the data is saved as',
		conflicts: ['inputFile'],
		default: 'data.txt',
	})
	.option('outPath', {
		alias: ['o'],
		description:
			'The path to the output file\nIf using a .jpg image, please set this to something such as ./out.jpg - otherwise this flag is optional',
		default: './out.png',
	}).argv;

(async () => {
	const tmpDir = fs.mkdtempSync('tmp_HideInPng');
	console.log(`➤ Created Temp Dir`);

	let inputFile = argv.inputFile;

	if (typeof inputFile === 'undefined') {
		inputFile = await new Promise(resolve => {
			const readline = rln.createInterface({
				input: process.stdin,
				output: process.stdout,
			});

			readline.question(
				`➤ '-I' not specified - checking for piped input\n  ➤ If its stuck here, enter some text to write that as the hidden data`,
				async data => {
					console.log(
						`➤ Data (as ${argv.pipedFileName} in final zip): ${data}`
					);
					readline.close();
					const xDir = path.resolve(tmpDir, 'pipedInput');
					const x = path.resolve(xDir, argv.pipedFileName);
					fs.mkdirSync(xDir);
					fs.writeFileSync(x, data);
					console.log(`➤ Wrote the above data to ${x}`);

					const inpZip = path.resolve(`${tmpDir}/inputZip.zip`);
					console.log(`➤ Zipping ${xDir} to ${inpZip}`);
					await zip(xDir, inpZip);
					console.log(`➤ Zipped ${xDir} to ${inpZip}!`);
					resolve(inpZip);
				}
			);
		});
	} else {
		fs.copyFileSync(inputFile, path.resolve(`${tmpDir}/inputFile`));
		console.log(`➤ Copied Input File/Folder to Temp Dir`);
		inputFile = path.resolve(`${tmpDir}/inputFile`);
	}

	fs.copyFileSync(argv.inputImage, path.resolve(`${tmpDir}/inputImage`));
	console.log(`➤ Copied Input Image to Temp Dir`);

	const stat = fs.statSync(inputFile);
	const isDir = stat.isDirectory();
	console.log(
		`➤ Got Stat for ${inputFile} (input ${isDir ? 'folder' : 'file'})`
	);
	let inp = inputFile;

	if (!isDir && !inputFile.endsWith('.zip'))
		console.warn(`➤ Warning: File will NOT be zipped`);
	if (isDir) {
		console.log(`➤ Zipping ${inp} to ${inpZip}...`);

		const inpZip = path.resolve(`${tmpDir}/inputZip.zip`);
		await zip(inp, inpZip);

		console.log(`➤ Zipped ${inp} to ${inpZip}!`);

		inp = inpZip;
	}

	console.log(`➤ Ready to hide zip in png...`);

	console.log(`➤ Copying Image to ${path.resolve(argv.outPath)}`);
	fs.copyFileSync(path.resolve(argv.inputImage), path.resolve(argv.outPath));
	console.log(`➤ Adding data to ${path.resolve(argv.outPath)}`);
	fs.appendFileSync(path.resolve(argv.outPath), fs.readFileSync(inp));

	console.log(`➤ Cleaning Up...`);
	fs.rmdir(path.resolve(tmpDir), { recursive: true }, err => {
		if (err) {
			throw err;
		}

		console.log(`➤ Deleted Temp Dir successfully!`);
		console.log(
			`➤ Done! To get the original, use something similar to the unix \`unzip\` command`
		);
	});
})();
