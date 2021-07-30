const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
	notes.forEach(note => addNewNote(note, true));
}

addBtn.addEventListener('click', () => addNewNote());

function addNewNote(text = '',edit = false) {
	const note = document.createElement('div');
	note.classList.add('note');

	note.innerHTML = `
                 <div class="tools">
                     <button class="edit" data-toggle="tooltip" title="" data-placement="bottom" data-html="true" data-original-title="<strong>Edit/Save</strong>"><i id="ed" class="fas fa-${!edit ?'save':'edit'}"></i></button>
                     <button class="delete" data-toggle="tooltip" title="" data-placement="bottom" data-html="true" data-original-title="<strong>Delete</strong>"><i class="fas fa-trash-alt"></i></button>
                 </div>
             
                 <div class="main ${text ? "" : "hidden"}"></div>
                 <textarea class="${text ? "hidden" : ""}"</textarea>
                 `

	const editBtn = note.querySelector('.edit');
	const deleteBtn = note.querySelector('.delete');
	const main = note.querySelector('.main');
	const textArea = note.querySelector('textarea');

	textArea.value = text;
	main.innerHTML = marked(text);

	deleteBtn.addEventListener('click', () => {
		note.remove();

		updateLS();
	})

	editBtn.addEventListener('click', () => {
		main.classList.toggle('hidden');
		textArea.classList.toggle('hidden');
		let ed = document.getElementById("ed");
		let faEdit = false;
		let faSave = false;
		for (const classListElement of ed.classList) {
			if (classListElement === "fa-save"){
				faSave = true;
				break;
			}
			if (classListElement === "fa-edit"){
				faEdit = true;
				break;
			}
		}
		if (faEdit){
			ed.classList.remove("fa-edit");
			ed.classList.add("fa-save");
		}else if (faSave) {
			ed.classList.remove("fa-save");
			ed.classList.add("fa-edit");
		}
	})

	textArea.addEventListener('input', (e) => {
		const { value } = e.target;

		main.innerHTML = marked(value);

		updateLS();
	})

	document.body.appendChild(note);
}

function updateLS() {
	const notesText = document.querySelectorAll('textarea');

	const notes = [];

	notesText.forEach(note => notes.push(note.value));

	localStorage.setItem('notes', JSON.stringify(notes));
}

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip({
		trigger : "hover"
	});
});