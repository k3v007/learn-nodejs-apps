const fs = require("fs");
const chalk = require("chalk");

const file = "notes.json"

const addNote = (title, body) => {
    const notes = loadNotes()
    const index = notes.find((elm) => elm.title === title)

    if (index) {
        console.log(chalk.red.inverse("Title =", title, "already taken!"))
    } else {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("Note added successfully!"))
    }
}

const loadNotes = () => {
    try {
        const jsonData = fs.readFileSync(file).toString()
        return JSON.parse(jsonData)
    } catch (e) {
        console.log(chalk.yellow(e))
        return []
    }
}

const saveNotes = (notes) => {
    const jsonData = JSON.stringify(notes)
    fs.writeFileSync(file, jsonData)
}

const removeNote = (title) => {
    const notes = loadNotes()
    const index = notes.findIndex((elm) => elm.title === title)

    if (index == -1) {
        console.log(chalk.red.inverse("Note with title =", title, "doesn't exist"))
    } else {
        notes.splice(index, 1)
        saveNotes(notes)
        console.log(chalk.green.inverse("Note removed successfully!"))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.yellow.inverse("Here are your list of notes:"))
    notes.forEach((note, i) => {
        console.log(note.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((elm) => elm.title === title)
    if (!note) {
        console.log(chalk.red.inverse("Note with title =", title, "doesn't exist"))
    } else {
        console.log(chalk.yellow.inverse(note.title))
        console.log(note.body)
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}