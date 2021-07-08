#!/bin/bash
echo "hideInPng.sh: Hide a ZIP file in a PNG - Bash Version";
echo "    hideInPng.sh  Copyright (C) 2021  0J3";
echo "    This program comes with ABSOLUTELY NO WARRANTY; for details, see README.md or the JS version.";
echo "    This is free software, and you are welcome to redistribute it";
echo "    under certain conditions; see https://www.gnu.org/licenses/agpl-3.0.html for details.";
echo ""
echo "Copying in.png to out.png"
cat in.png > out.png
echo "Adding in.zip to out.png"
cat in.zip >> out.png
echo "Done!"
echo "You can now unzip it using the unzip command or a similar program"
