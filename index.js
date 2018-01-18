var yo = require('yo-yo')
 
var todos = [] // start empty 
var done = []
var el = list(todos, done, update, removeTodo)
 
function list (itemsTodo, itemsDone, onclick, del) {
  return yo`<div>
    ToDo's
    <ul>
      ${itemsTodo.map(function (item) {
        return yo`<li>${item} <input type="checkbox" checked="false" onclick=${del}></li>`
      })}
    </ul>
    <input id="todoVal" type="text">
    <button onclick=${onclick}>Add ToDo</button>
    <br><br>
    Done:
    <ul>
      ${itemsDone.map(function (item) {
        return yo`<li>${item}<input type="checkbox" checked="true" onclick=${del}></li>`
      })}
    </ul>
  </div>`
}
 
function update () {
  // add a new random number to our list 
  var inputVal = document.getElementById("todoVal")
  todos.push(inputVal.value);
  inputVal.value = '';
  
  // construct a new list and efficiently diff+morph it into the one in the DOM 
  var newList = list(todos, done, update, removeTodo)
  yo.update(el, newList)
}

function removeTodo(){
    var removed = this.parentNode;
    removed.removeChild(this);
    removed = removed.innerHTML;
    if(this.checked){
        done.push(removed);
        todos.splice(todos.indexOf(removed));
    }else{
        todos.push(removed)
        done.splice(done.indexOf(removed));
    }

    
    var newList = list(todos, done, update, removeTodo)
    yo.update(el, newList)
}
 
document.body.appendChild(el)