document.addEventListener('DOMContentLoaded', function() {


let inputField=document.getElementById('new-task');
let addButton=document.getElementById('btn');
let todoListParent=document.getElementById('main-parent');
addButton.style.color='rgb(255,255,255)';
addButton.style.backgroundColor='rgb(0,0,0)';



inputField.addEventListener('change',statechange);
function statechange(){
    if(inputField.value==""){
        addButton.disabled=true;
        console.log(this,"value");

    }
    else{
        addButton.removeAttribute('disabled');
        addButton.classList.add('active');
        addButton.style.backgroundColor = '#000000';
        addButton.style.color = '#ffffff';
    }

}

// .................gives total count  of task left............
function taskLeft(){
    let checkboxArray=document.querySelectorAll('.checkbox-class');
    let total =checkboxArray.length;
    document.getElementById('add-data').innerText=total;
    
    

}

let count =1;


// common practice to add elements local storage for first time
if(!localStorage.getItem('data')){
    localStorage.setItem('data',JSON.stringify([]));
}

let set=new Set();
// Retrieve data from local storage...best common safe practice for data retrieval from local storage
let dataArray=JSON.parse(localStorage.getItem('data'))||[];

function recreateElements() {
    for (let value of dataArray) {
        let div = document.createElement('div');
        div.classList.add('todo-parent');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'name' + count;
        checkbox.value = 'value' + count;
        checkbox.id = 'id' + count;
        checkbox.classList.add('checkbox-class');
        checkbox.style.width = "22px";
        checkbox.style.height = "22px";

        let label = document.createElement('label');
        label.htmlFor = 'id' + count;
        if(value!=''){
            label.innerText = value;
        }
       
        label.style.fontSize = '2rem';
        label.style.marginLeft = '4px';

        div.appendChild(checkbox);
        div.appendChild(label);

        let deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.classList.add('delete');
        deleteButton.setAttribute('name','common-btn');
        deleteButton.innerText = 'X';
        div.appendChild(deleteButton);

        let hr = document.createElement('hr');
        hr.style.width = '87%';
        div.appendChild(hr);

        if (!set.has(value)) {
            todoListParent.appendChild(div);
            set.add(value);
        }
        
        taskLeft();

        count++;


        

    }
}
// Call the function to recreate elements on page load
window.addEventListener('load',recreateElements);

addButton.addEventListener('click', function() {
    let values = inputField.value;
    if(values==''){
        window.alert('Please add task!!!');
    }
    if (!dataArray.includes(values) &&values!='') {
        dataArray.push(values);
        localStorage.setItem('data', JSON.stringify(dataArray));
    }

    // Recreate the element dynamically
    recreateElements();

    inputField.value = ""; 

});

// Event listener for deleting tasks using event delegation
todoListParent.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        let taskElement = event.target.parentElement;
        console.log(taskElement);
        let taskLabel = taskElement.querySelector('label').innerText;
        let index = dataArray.indexOf(taskLabel);
        if (index !== -1) {
            dataArray.splice(index, 1);
            localStorage.setItem('data', JSON.stringify(dataArray));
            set.delete(taskLabel);
            taskElement.remove();
            taskLeft();
        }
    }
});



//show-completed task using event delegation..............

todoListParent.addEventListener('click', function(event) {
    if (event.target.classList.contains('checkbox-class')) {
        let taskElement = event.target.parentElement;
        let taskLabel = taskElement.querySelector('label').classList.toggle('clear-task');
        taskElement.querySelector('.delete').classList.toggle('display-none');
        if(taskElement.childNodes[0].checked){
            document.getElementById('add-data').innerText-=1;
        }
        else{
            let dynamicval=document.getElementById('add-data').innerText;
            document.getElementById('add-data').innerText=parseInt(dynamicval)+1;


        }


        console.log(taskLabel);
        
    }
});
          ///..............clearing completed tasks  using event delegation...............

let showCompletedButton = document.getElementById('clear-completeed-task');
    showCompletedButton.addEventListener('click', function() {
        let checkBoxList = document.querySelectorAll('input[type="checkbox"]');
        console.log(checkBoxList);
        checkBoxList.forEach(function(checkbox) {
            if (checkbox.checked) {
            let taskElement = checkbox.parentElement;
        let taskLabel=checkbox.parentElement.childNodes[1].innerText;
        let index = dataArray.indexOf(taskLabel);
        if (index !== -1) {
            dataArray.splice(index, 1);
            localStorage.setItem('data', JSON.stringify(dataArray));
            set.delete(taskLabel);
            taskElement.remove();
            taskLeft();
        }
                
            }
            
        });
    });
});