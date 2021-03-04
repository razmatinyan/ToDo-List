const addMessage = document.querySelector('.message');
const addButton = document.querySelector('.add');
const todo = document.querySelector('.todo');

let todoList = [];

if (localStorage.getItem('ToDo')) {
   todoList = JSON.parse(localStorage.getItem('ToDo'));
   displayMessages();
}

addButton.addEventListener('click', () => {
   if (!addMessage.value) return;

   let newToDo = {
      todo: addMessage.value,
      checked: false,
      important: false,
   };

   todoList.push(newToDo);
   displayMessages();

   localStorage.setItem('ToDo', JSON.stringify(todoList));
   addMessage.value = '';
});

function displayMessages() {
   let displayMessage = '';
   if (todoList.length === 0) todo.innerHTML = '';
   todoList.forEach((item, index) => {
      displayMessage += `
      <li>
         <input type='checkbox' id='item_${index}' ${item.checked ? 'checked' : ''}>
         <label for='item_${index}' class="${item.important ? 'important' : ''}">${item.todo}</label>
      </li>
      `;
      todo.innerHTML = displayMessage;
   })
}

todo.addEventListener('change', (event) => {
   let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;
   todoList.forEach((item) => {
      if (item.todo === valueLabel) {
         item.checked = !item.checked;
         localStorage.setItem('ToDo', JSON.stringify(todoList));
      }
   })
});

todo.addEventListener('contextmenu', (event) => {
   event.preventDefault();
   todoList.forEach((item, i) => {
      if (item.todo === event.target.innerHTML) {
         if (event.ctrlKey || event.metakey) {
            todoList.splice(i, 1);// jnjum enq mi haty
         }
         else {
            item.important = !item.important;
         }
         displayMessages();
         localStorage.setItem('ToDo', JSON.stringify(todoList));
      }
   })
})