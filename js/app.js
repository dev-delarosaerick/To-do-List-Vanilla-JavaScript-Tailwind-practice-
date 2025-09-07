"use strict";

import { descriptionInput, titleInput } from "./selectors.js";

window.addEventListener('DOMContentLoaded', ()=> {

    titleInput.addEventListener('change', noteData);
    descriptionInput.addEventListener('change', noteData);

});

function noteData(e) {
    console.log(`Value: ${e.target.value}, Input: ${e.target.name}.`);
}