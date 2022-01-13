const fs = require("fs");
const path = require("path");

function copyFileSync(source, target) {
    let targetFile = target;
    if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) targetFile = path.join(target, path.basename(source));
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderSync(source, target) {
    const targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder);

    if (fs.lstatSync(source).isDirectory()) {
        fs.readdirSync(source).forEach((file) => {
            const curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) copyFolderSync(curSource, targetFolder);
            else copyFileSync(curSource, targetFolder);
        });
    }
}

module.exports = function (extractPath, electronVersion, platform, arch, done) {
    const www = path.join(__dirname, "../www");
    copyFolderSync(www, extractPath);
    done();
};
