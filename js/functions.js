"use strict";

import Notes from "./classes/Notes.js";
import UI from "./classes/UI.js";
import { getDB } from "./db.js";
import { descriptionInput, form, formInput, titleInput } from "./selectors.js";
import { editing, notesObj } from "./variables.js";

export function notesData(e) {
    notesObj[e.target.name] = e.target.value;
}

const adminNotes = new Notes();
const ui = new UI(adminNotes);

export function newNote(e) {
    e.preventDefault();

    notesObj.id = generateId();

    const {title, description} = notesObj;

    if (title.trim() === '' || description.trim() === '') {
        ui.showAlert('Todos los mensajes son Obligatorios', 'error');
        return;
    }
    if (editing) {

        adminNotes.editNote( {...notesObj} );

        // Crear transaction
        const db = getDB();
        const tx = db.transaction(['Notes'], 'readwrite');
        const objectStore = tx.objectStore('Notes');

        objectStore.put(notesObj);

        tx.oncomplete = function() {
            ui.showAlert('Saved completed.');
            formInput.textContent = 'Add Task/Note';
            editing.value = false;
            ui.showNotes();
        }

        tx.onerror = function() {
            console.log('There was an error.');
        }


    } else {
        adminNotes.addNote({...notesObj});

        const db = getDB();
        const objectStore = db.transaction(['Notes'], 'readwrite').objectStore('Notes');
        objectStore.add(notesObj);
        console.log('Added correctly to IndexedDB');
        ui.showAlert('The Task/Note was added.')
        ui.showNotes();
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

export function uploadEdition(note) {

    const {title, description, id } = note;

    // Reiniciar el objeto
    notesObj.title = title;
    notesObj.description = description;
    notesObj.id = id;

    // Llenar los Inputs
    titleInput.value = title;
    descriptionInput.value = description;

    formInput.textContent = 'Save changes';

    editing.value = true;

}

export function deleteNoteDB(id) {
    
    const db = getDB();
    const tx = db.transaction(['Notes'], 'readwrite');
    const objectStore = tx.objectStore('Notes');

    objectStore.delete(id);

    tx.oncomplete = function() {
        console.log(`Note ${id} deleted corerctly.`);

        ui.showNotes();
    }

    tx.onerror = function() {
        console.log('Error deleting from the DB.');
    }

}