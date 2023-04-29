let todo_items = []

const update_list = (todo) => {
    const list = document.getElementById('todo-items');
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if(todo.deleted) {
        item.remove();
        return;
    }

    const isChecked = todo.checked ? 'done': '';
    const node = document.createElement('li');
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);

    node.innerHTML = `
        <input id="${todo.id}" type="checkbox" />
        <label for="${todo.id}" class="tick"></label>
        <span>${todo.text}</span>
        <button class="delete-todo">
            <img src="assets/delete.png" />
        </button>
    `

    if(item){
        list.replaceChild(node, item);
    } else {
        list.append(node);
    }
}

const addToDo = (text) => {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    todo_items.push(todo);
    update_list(todo)
    console.log(todo);
}

const form = document.querySelector('.container');

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const input = document.querySelector('#input');

    const text = input.value.trim();
    if(text !== ''){
        addToDo(text);
        input.value = '';
        input.focus();
    }
})

const toggleDone = (key) => {
    const index = todo_items.findIndex(item => item.id === Number(key));

    todo_items[index].checked = !todo_items[index].checked;
    update_list(todo_items[index]);  
}

const deleteTodo = (key) => {
    const index = todo_items.findIndex(item => item.id === Number(key));

    const todo = {
        deleted: true,
        ...todo_items[index]
    };

    todo_items = todo_items.filter(item => item.id !== Number(key));
    update_list(todo);
}

const list = document.querySelector('#todo-items');

list.addEventListener('click', event => {
    if(event.target.classList.contains('tick')) {
         const itemKey = event.target.parentElement.dataset.key;
         toggleDone(itemKey);       
    }

    if(event.target.classList.contains('delete-todo')){
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});