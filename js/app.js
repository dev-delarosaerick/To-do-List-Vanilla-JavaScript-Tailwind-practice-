"use strict";

import { notesData } from "./functions.js";
import { descriptionInput, titleInput } from "./selectors.js";

window.addEventListener('DOMContentLoaded', ()=> {

    titleInput.addEventListener('change', notesData);
    descriptionInput.addEventListener('change', notesData);

});