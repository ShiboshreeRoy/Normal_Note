document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('note-input');
    const addBtn = document.getElementById('add-btn');
    const noteList = document.getElementById('note-list');

    // Load saved notes from localStorage
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

    // Display saved notes
    function renderNotes() {
        noteList.innerHTML = '';
        savedNotes.forEach((note, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="note-text">${note.text}</div>
                <div class="timestamp">${note.dateTime}</div>
                <div class="actions">
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            noteList.appendChild(listItem);
        });
    }

    // Add a new note
    addBtn.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText) {
            const dateTime = new Date().toLocaleString();
            savedNotes.push({ text: noteText, dateTime });
            localStorage.setItem('notes', JSON.stringify(savedNotes));
            renderNotes();
            noteInput.value = '';
        } else {
            alert('Please write something before adding!');
        }
    });

    // Edit or Delete a note
    noteList.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        if (index !== null) {
            if (e.target.classList.contains('edit-btn')) {
                // Edit functionality
                const newText = prompt('Edit your note:', savedNotes[index].text);
                if (newText !== null && newText.trim() !== '') {
                    savedNotes[index].text = newText.trim();
                    savedNotes[index].dateTime = new Date().toLocaleString(); // Update timestamp
                    localStorage.setItem('notes', JSON.stringify(savedNotes));
                    renderNotes();
                }
            } else if (e.target.classList.contains('delete-btn')) {
                // Delete functionality
                savedNotes.splice(index, 1);
                localStorage.setItem('notes', JSON.stringify(savedNotes));
                renderNotes();
            }
        }
    });

    // Initial render
    renderNotes();
});
