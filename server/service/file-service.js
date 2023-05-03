const BASEDIR = process.env.BASEDIR;
const fs = require('fs');

class FileService {

    async getFiles(dirName) {
        
    }

    async deleteFiles(dirName, files) {

    }

    async saveFiles(files, userDir) {
        const result = {
            avatar: '',
            background: '',
        };
        files.forEach(async (file) => {
            const data = await fs.promises.readFile(file.path);
            await fs.promises.writeFile(`${BASEDIR}/${userDir}/${file.name}`, data);
            file.type === 'avatar' ? result.avatar = `${file.name}` : result.background = `${file.name}`;
        });
        return {
            ...result
        }
    }

    async makeDirectory(dirName) {
        const fullPath = `${BASEDIR}/${dirName}`;
        await fs.promises.mkdir(fullPath, { recursive: true });
    }

}

module.exports = new FileService();