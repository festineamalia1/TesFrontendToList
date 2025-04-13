const addTodo = document.getElementById('add-todo');
const titleForm = document.getElementById('title');
const descForm = document.getElementById('desc');
const btnFilter = document.querySelectorAll('.btn-filter');
const todoList = document.getElementById('todo-list');
const toggleMode = document.getElementById('toggle-mode');
const bodyClass = document.getElementById('body-class');
const cardForm = document.getElementById('card-form');
const cardTodo = document.querySelectorAll('.card-todo')


if (localStorage.getItem('theme') === 'dark') {
    setDarkMode();
  }

  toggleMode.addEventListener('click', () => {
    if (bodyClass.classList.contains('bg-white')) {
      setDarkMode();
      localStorage.setItem('theme', 'dark');
    } else {
      setLightMode();
      localStorage.setItem('theme', 'light');
    }
    location.reload()
  });

  function setDarkMode() {
    bodyClass.classList.remove('bg-white', 'text-black');
    bodyClass.classList.add('bg-gray-900', 'text-white');
    cardForm.classList.remove('bg-white');
    cardForm.classList.add('bg-gray-800');
    titleForm.classList.add('bg-gray-700');
    descForm.classList.add('bg-gray-700');
  }

  function setLightMode() {
    bodyClass.classList.remove('bg-gray-900', 'text-white');
    bodyClass.classList.add('bg-white', 'text-black');
    cardForm.classList.add('bg-white');
    cardForm.classList.remove('bg-gray-800');
    titleForm.classList.remove('bg-gray-700');
    descForm.classList.remove('bg-gray-700');
  }



  let filter = 'all';
  let todo = JSON.parse(localStorage.getItem('todo')) || [];

  const mode = localStorage.getItem('theme')

function todoSave() {
    localStorage.setItem('todo', JSON.stringify(todo));
}

function todoRender() {
    todoList.innerHTML = '';
    todo
    .filter(dt => filter === 'all' || (filter === 'completed' && dt.completed) || (filter === 'pending' && !dt.completed))
    .forEach((d, index) => {
        
        const li = document.createElement('li');
        li.className = `flex justify-between items-center p-6 ${mode === 'light' ? 'bg-white' : 'bg-gray-800'}   border border-gray-200 rounded-lg shadow-sm `;
        li.innerHTML = `
        <div class="flex-1">
            <h3 class="font-bold ${d.completed ? 'line-through' : ''}">${d.title}</h3>
            <p class="${d.completed ? 'line-through' : ''}">${d.desc}</p>
        </div>
        <div class="ml-4 space-x-2">
            <button data-action="togle" data-index="${index}" class="togle px-2 py-1 bg-green-600 text-white rounded">Complete</button>
            <button data-action="edit" data-index="${index}" class="edit px-2 py-1 bg-yellow-400 rounded">Edit</button>
            <button data-action="delete" data-index="${index}" class="delete px-2 py-1 bg-red-500 text-white rounded">Delete</button>
        </div>`;

          todoList.appendChild(li);
        });
    }

    function submitTodo() {
      const title = titleForm.value.trim();
      const desc = descForm.value.trim();
      if (!title) return;
      todo.push({ title, desc, completed: false });
      todoSave();
      todoRender();
      titleForm.value = '';
      descForm.value = '';
    }

    function todoAction(e) {
      const action = e.target.dataset.action;
      const index = e.target.dataset.index;
      if (index === undefined) return;

      if (action === 'togle') {
        todo[index].completed = !todo[index].completed;

      } else if (action === 'edit') {
        const newTitle = prompt('Edit Title:', todo[index].title);
        const newDesc = prompt('Edit Description:', todo[index].desc);
        if (newTitle !== null) todo[index].title = newTitle;
        if (newDesc !== null) todo[index].desc = newDesc;
      } else if (action === 'delete') {
        todo.splice(index, 1);
      }
      todoSave();
      todoRender();
    }

    addTodo.addEventListener('click', submitTodo);
    todoList.addEventListener('click', todoAction);

    btnFilter.forEach(btn => {
            btn.addEventListener('click', () => {
                btnFilter.forEach(b => {
                    b.classList.remove("border-b-2", "border-blue-500", "text-blue-500", "font-semibold");
                  });
                  btn.classList.add("border-b-2", "border-blue-500", "text-blue-500", "font-semibold");
                filter = btn.dataset.filter;
                todoRender();
          });

        });

        todoRender();
