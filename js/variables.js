"use strict";

import { generateId } from "./functions.js";

export let editando = {
    value: false
}

export const notesObj = {
    id: generateId(),
    title: '',
    description: ''
}