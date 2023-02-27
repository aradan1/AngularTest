const { readFileSync, writeFileSync } = require('fs');

const path = process.env.DB_PATH;

export function readDB(): JSON{

    const data = readFileSync(path);

    return JSON.parse(data);
}

export function writeDB(content: JSON): void{

    try {
        writeFileSync(path, JSON.stringify(content, null, 2), 'utf8');
    } catch (error) {
        console.log('An error has occurred ', error);
    }

}