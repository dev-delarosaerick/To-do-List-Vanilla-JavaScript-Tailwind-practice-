"use strict";

import { initDB } from "./db.js";
import { notesData } from "./functions.js";
import { descriptionInput, titleInput } from "./selectors.js";

window.onload = ()=> {

    titleInput.addEventListener('change', notesData);
    descriptionInput.addEventListener('change', notesData);
    
    initDB();

}