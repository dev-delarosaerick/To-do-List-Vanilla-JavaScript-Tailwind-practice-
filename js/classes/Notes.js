"use strict";

export default class Notes {
    constructor() {
        this.notes = [];
    }

    addNote(note) {
        this.notes = [...this.notes, note];
    }

    editNote(updatedNote) {
        this.notes = this.notes.map( note => note.id === updatedNote.id ? updatedNote : note);
    }

    deleteNote(id) {
        this.notes = this.notes.filter( note => note.id !== id);
    }
}