# HideInPNG
Hide a folder, or a file in an image
To get the original file, just unzip the image

## Too lazy to read the below usage
just use the [bash variant](bashVariant) (only linux)

## Example Usage
### Linux Only
hide `HideInPNGIsVeryPog` as a Text file named `data.txt` using the png at `bashVariant/in.png`: `echo "HideInPNGIsVeryPog" | node index.js -i bashVariant/in.png`
hide `Never gonna give you up` as a Text file named `data.txt` using the png at `bashVariant/in.png`: `echo "Never gonna give you up" | node index.js -i bashVariant/in.png`
hide the file at `./yarn.lock` as a Text file named `data.txt` using the png at `bashVariant/in.png`: `cat ./yarn.lock | node index.js -i bashVariant/in.png`
### Cross-Platform
hide the file at `./yarn.lock` (NOT ZIPPED - UNZIP WONT WORK) using the png at `bashVariant/in.png`: `node index.js -i bashVariant/in.png -I ./yarn.lock`
hide the folder at `./bashVariant` using the png at `bashVariant/in.png`: `node index.js -i bashVariant/in.png -I ./bashVariant`

there is more im just too lazy to type things