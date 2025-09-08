"use strict";

import { getDB } from "../db.js";
import { deleteNoteDB, uploadEdition } from "../functions.js";
import { form, notesContainer } from "../selectors.js";

export default class UI {
    constructor() {

    }

    showAlert(message, type) {

        const divMessage = document.createElement('div');
        divMessage.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');
        
        const prevMessage = document.querySelector('.alert')
        prevMessage?.remove()
        
        if(type === 'error') {
             divMessage.classList.add('bg-red-500')
        } else {
             divMessage.classList.add('bg-green-500')
        }

        divMessage.textContent = message;

        form.parentElement.insertBefore(divMessage, form);

        setTimeout( () => {
            divMessage.remove();
        }, 3000);
   }

   showNotes() {
       
        this.cleanHTML();

        const db = getDB();
        const objectStore = db.transaction(['Notes']).objectStore('Notes');

        objectStore.openCursor().onsuccess =  function(e) {

            const cursor = e.target.result;

            if(cursor) {
                const {title, description, id} = cursor.value;

                const divNote = document.createElement('div');
                divNote.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');
                divNote.dataset.id = id;

                const titleParagraph = document.createElement('h2');
                titleParagraph.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
                titleParagraph.innerHTML = `<span class="font-bold uppercase text-3xl">${title}</span> `;

                const descriptionParagraph = document.createElement('p');
                descriptionParagraph.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
                descriptionParagraph.innerHTML = `<span class="font-bold">Description: </span> ${description}`;

                const deleteBtn = document.createElement('button');
                deleteBtn.onclick = () => deleteNoteDB(id); // añade la opción de eliminar
                deleteBtn.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
                deleteBtn.innerHTML = 'Delete <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

                const editBtn = document.createElement('button');
                editBtn.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', 'btn-editar');
                editBtn.innerHTML = 'Edit <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
                const note = cursor.value;
                
                editBtn.onclick = () => uploadEdition(note);
                editBtn.classList.add('btn', 'btn-info');
                editBtn.innerHTML = 'Edit <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

                const buttonsContainer = document.createElement('DIV')
                buttonsContainer.classList.add('flex', 'justify-between', 'mt-10')

                buttonsContainer.appendChild(editBtn);
                buttonsContainer.appendChild(deleteBtn);

                // Agregar al HTML
                divNote.appendChild(titleParagraph);
                divNote.appendChild(descriptionParagraph);
                divNote.appendChild(buttonsContainer);

                notesContainer.appendChild(divNote);

                cursor.continue();
            }
        }

        objectStore.openCursor().onerror = function(e) {
            console.log('Error cursor', e.target.error);
            
        }
        
   }

   cleanHTML() {
        while(notesContainer.firstChild) {
            notesContainer.removeChild(notesContainer.firstChild);
        }
   }
}