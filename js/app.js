"use strict";

import { initDB } from "./db.js";
import { newNote, notesData } from "./functions.js";
import { descriptionInput, form, titleInput } from "./selectors.js";

window.onload = ()=> {
   
    initDB();

    titleInput.addEventListener('change', notesData);
    descriptionInput.addEventListener('change', notesData);

    form.addEventListener('submit', newNote);
    
}