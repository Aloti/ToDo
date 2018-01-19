var yo = require('yo-yo')
var uuid = require('uuid/v1')
 
var todoList = []
var doneList = [] 
var el = list(todoList, doneList, update, removeTodo)
 
function list (itemsTodo, itemsDone, onclick, del) {
  return yo`<div>
    ToDo's
    <ul>
      ${itemsTodo.map(function (item) {
        return yo`<li id=${item.id} status=${item.status} value=${item.value}>${item.value} <input type="button" value="delete" onclick=${del}></li>`
      })}
    </ul>
    <input id="todoVal" type="text">
    <button onclick=${onclick}>Add ToDo</button>
    <br><br>
    Done:
    <ul>
      ${itemsDone.map(function (item) {
        return yo`<li id=${item.id} status=${item.status} value=${item.value}>${item.value}<input type="button" value="delete" onclick=${del}></li>`
      })}
    </ul>
  </div>`
}
 
function update () {
  // add a new random number to our list 
  var inputVal = document.getElementById("todoVal");

  var todo = {};
  todo.id = uuid();
  todo.value = inputVal.value;
  todo.status = 'pending';
  todoList = [
    ...todoList,
    todo
  ];

  inputVal.value = '';
  
  // construct a new list and efficiently diff+morph it into the one in the DOM 
  var newList = list(todoList, doneList, update, removeTodo)
  yo.update(el, newList)
}

function removeTodo(ev) {
  var todo = {};
  todo.id = ev.target.parentNode.getAttribute('id')
  todo.value = ev.target.parentNode.getAttribute('value')
  todo.status =  ev.target.parentNode.getAttribute('status')

  if(todo.status == 'pending'){
    todo.status = 'done';
    doneList = [
      ...doneList,
      todo
    ]
    todoList = todoList.filter(function(el, i) {
      return todo.id !== el.id;
    });
  }else{
    todo.status = 'pending';
    todoList = [
      ...todoList,
      todo
    ]
    doneList = doneList.filter(function(el, i) {
      return todo.id !== el.id;
    });
  }
  

  
  var newList = list(todoList, doneList, update, removeTodo)
  yo.update(el, newList)
}
 
document.body.appendChild(el)