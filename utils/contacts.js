const fs = require('fs');

// create dir if it doesn't exist
const dataPath = './dataBase';
if(!fs.existsSync(dataPath)){
    fs.mkdirSync(dataPath);
}

// create file if it doesn't exist
const filePath = `${dataPath}/contacts.json`; 
if(!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath , '[]' , 'utf8');
}

// create renderContact function
const renderContact = () => {
    const fileBuffer = fs.readFileSync(filePath, 'utf8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
};

// find contact
const detailContact = (name) => {
    const contacts = renderContact();
    return contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
}

// Export Module
module.exports = {
    renderContact , 
    detailContact
}