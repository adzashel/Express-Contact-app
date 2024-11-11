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
    const fileBuffer = fs.readFileSync(filePath);
    const contacts = JSON.parse(fileBuffer);
    return contacts;
};

// find contact

const detailContact = (name) => {
    const contacts = renderContact();
    const findContact = contacts.find(contact => contact.name === name);
    return findContact;
}

// save any changes contact
const saveContact = (contacts) => {
    fs.writeFileSync(filePath, JSON.stringify(contacts), 'utf8'); //parsing into string
}

// add new contact
const addContact = (contact) => {
    const contacts = renderContact();
    contacts.push(contact);
    saveContact(contacts);
}

// check duplicates name
const checkDuplicate = (name) => {
    const contacts =  renderContact();
    return contacts.find(contact => contact.name === name);
}


// check duplicates email
const checkExistEmail = (email) => {
    const contacts = renderContact();
    const isEmailExist = contacts.find((contact) => contact.email === email);
    return isEmailExist;
}

const deleteContact = (name) => {
    const contacts = renderContact();
    const filteredContact = contacts.filter((contact) => contact.name !== name);
    saveContact(filteredContact);
}

// Export Module
module.exports = {
    renderContact , 
    detailContact,
    addContact,
    checkDuplicate,
    checkExistEmail,
    deleteContact,
 };
