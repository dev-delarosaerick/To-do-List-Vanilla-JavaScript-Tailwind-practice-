"use strict";

let DB;

export function initDB() {
    const request = window.indexedDB.open('TO-DO DB', 1);

    request.onupgradeneeded = function(e) {
        const db = e.target.result;
        
        const objectStore = db.createObjectStore('Notes', {
                keyPath: 'id',
                autoIncrement: true
            });

            objectStore.createIndex('title', 'title', { unique: false });
            objectStore.createIndex('description', 'description', { unique: false });
            objectStore.createIndex('id', 'id', { unique: true });
    }

    request.onerror = function () {
        alert("Error connecting to the database. Please reacharge the page.");
    };

    request.onsuccess = function() {
        DB = request.result;
    }
}


export function getDB() {
    return DB;
}