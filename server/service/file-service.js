const BASEDIR = process.env.BASEDIR;
const fs = require('fs');

class FileService {

    async getFiles(files) {

    } 

    async deleteFiles(files) {

    }

    async makeDirectory(dirName) {
        const fullPath = `${BASEDIR}/${dirName}`;
        await fs.promises.mkdir(fullPath, {recursive: true});
    }

}

module.exports = new FileService();