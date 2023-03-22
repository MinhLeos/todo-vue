import { reactive } from 'vue'

const TODOS_LIST = reactive([
    {
        id: '1',
        name: 'Learn Vue',
        description: 'Vue is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.',
        isDone: false,
        createdAt: '2023-03-21T15:15:30Z'
    },
    {
        id: '2',
        name: 'Learn .Net',
        description: 'Vue is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.',
        isDone: true,
        createdAt: '2023-03-21T13:15:30Z'
    },
    {
        id: '3',
        name: 'Learn NodeJS',
        description: 'Vue is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.',
        isDone: true,
        createdAt: '2023-03-20T13:15:30Z'
    },
    {
        id: '4',
        name: 'Learn Java',
        description: 'Vue is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.',
        isDone: false,
        createdAt: '2023-03-19T13:15:30Z'
    },
])

function deleteOneTodo(id) {
    const idx = TODOS_LIST.findIndex(todo => todo.id === id)
    if (idx > -1) {
        TODOS_LIST.splice(idx, 1)
    }
}

function addTodo(name, description){
    const newTodo = {
        id: Math.random().toString(),
        name,
        description,
        isDone: false,
        createdAt: new Date()
    }
    TODOS_LIST.unshift(newTodo)
}

function editTodo(id, name, description) {
    const idx = TODOS_LIST.findIndex(todo => todo.id === id)
    if (idx > -1) {
        TODOS_LIST[idx].name = name
        TODOS_LIST[idx].description = description
    }
}
function changeStatus(id) {
    const idx = TODOS_LIST.findIndex(todo => todo.id === id)
    if (idx > -1) {
        TODOS_LIST[idx].isDone = !TODOS_LIST[idx].isDone
    }
}
export {
    TODOS_LIST, addTodo, deleteOneTodo, editTodo, changeStatus
}
