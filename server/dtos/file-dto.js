module.exports = class FileDto{
    filename;
    tmpPath;
    type;

    constructor(formDataFile, type) {
        this.filename = formDataFile.name;
        this.tmpPath = formDataFile.path;
        this.type = type;
    }
}