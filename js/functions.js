"use strict";

import Notes from "./classes/Notes.js";
import { getDB } from "./db.js";
import { form } from "./selectors.js";
import { notesObj } from "./variables.js";

export function notesData(e) {
    notesObj[e.target.name] = e.target.value;
    console.log(notesObj);
}

const adminNotes = new Notes();

export function newNote(e) {
    e.preventDefault();

    notesObj.id = generateId();

    const {title, description} = notesObj;

    if (title.trim() === '' || description.trim() === '') {
        console.log('All inputs need content.');
        return;
    } else {
        adminNotes.addNote({...notesObj});

        const db = getDB();
        const objectStore = db.transaction(['Notes'], 'readwrite').objectStore('Notes');
        objectStore.add(notesObj);
        console.log('Agregado a indexedDB correctamente');

    }

    restarObj();

    form.reset();
}

function restarObj() {
    Object.keys(notesObj).forEach(key => notesObj[key] = '');
}

function generateId() {
    return Math.random().toString(36).substring(2) + Date.now()
}