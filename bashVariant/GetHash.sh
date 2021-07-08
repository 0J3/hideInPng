files="./run.sh ./GetHash.sh"

echo "# Hashing" > hash.md
echo "(for $files)" >> hash.md
echo "Get md5"
echo "## \`md5sum\` outputs" >> hash.md
echo "\`\`\`" >> hash.md
md5sum $files >> hash.md
echo "\`\`\`" >> hash.md
echo "Get sha1"
echo "## \`sha1sum\` outputs" >> hash.md
echo "\`\`\`" >> hash.md
sha1sum $files >> hash.md
echo "\`\`\`" >> hash.md
echo "Get sha224"
echo "## \`sha224sum\` outputs" >> hash.md
echo "\`\`\`" >> hash.md
sha224sum $files >> hash.md
echo "\`\`\`" >> hash.md
echo "Get sha256"
echo "## \`sha256sum\` outputs" >> hash.md
echo "\`\`\`" >> hash.md
sha256sum $files >> hash.md
echo "\`\`\`" >> hash.md
echo "Get sha384"
echo "## \`sha384sum\` outputs" >> hash.md
echo "\`\`\`" >> hash.md
sha384sum $files >> hash.md
echo "\`\`\`" >> hash.md
echo "Get sha512"
echo "## \`sha512sum\` outputs" >> hash.md
echo "\`\`\`" >> hash.md
sha512sum $files >> hash.md
echo "\`\`\`" >> hash.md
