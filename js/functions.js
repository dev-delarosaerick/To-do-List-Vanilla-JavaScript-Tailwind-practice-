"use strict";

import { notesObj } from "./variables.js";

export function notesData(e) {
    notesObj[e.target.name] = e.target.value;
    console.log(notesObj);
}

export function generateId() {
    return Math.random().toString(36).substring(2) + Date.now()
}
