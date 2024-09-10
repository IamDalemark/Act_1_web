import './style.css'
type Tasks = {
  task_name: string,
  due_date: string,
  due_time: string
  id: string,
  li_class: string
  li_function: void
}

let task_list: Tasks[] = []


function AddTask(){
  document.querySelector("#add_task")!.addEventListener("click", () =>{
    // add task
    const item_name = document.querySelector('#input') as HTMLInputElement;
    const value = item_name?.value.trim();
    if (value === '') return
    const node = document.createElement("li");
    const value_no_space = value.replace(/\s+/g, ''); // removes spaces between words
    // local storage
    const user = JSON.parse(localStorage.getItem('task')!);
    console.log(user.task_name)

    const due_date = document.getElementById("due_date") as HTMLInputElement;
    const due_date_value = due_date.value;

    const time = document.getElementById("due_time") as HTMLInputElement;
    const time_value = time.value;
    const textnode = document.createTextNode(`${value} - ${time_value} ${due_date_value}`);


    //mark task complete
     const markcomplete = node.addEventListener('click', () =>{
      if (node.getAttribute("class") === 'complete'){
        node.setAttribute("class","items")
        taskData.li_class = "items";
        
      }
      else {
      node.setAttribute("class", "complete");
      taskData.li_class = "complete";
    }
    saveTasksToLocalStorage()
    })
    markcomplete

    // add text
    node.appendChild(textnode);



    // delete button
    const button = document.createElement("button");
    button.setAttribute('class', 'delete_button');
    node.setAttribute("id", `li-${value_no_space}`); // li id
    node.setAttribute("class", 'items');
    node.appendChild(button);


    //remove task
    button.addEventListener("click", () => {
      document.querySelector(`#li-${value_no_space}`)?.remove();
      const index = task_list.indexOf(taskData);
      task_list.splice(index, 1 )
      saveTasksToLocalStorage()
    })
    const taskData: Tasks = {
      task_name: value,
      due_date: due_date_value,
      due_time: time_value,
      id: `${value_no_space}`,
      li_class: node.getAttribute("class")!,
      li_function: markcomplete
    };

    task_list.push(taskData);
    
    

    // add to ul
    document.querySelector("#cart")!.appendChild(node);
    item_name!.value = '';
    saveTasksToLocalStorage()
  })
}


function RenderTask(){
  // sort
  const today = new Date()
  const today_time = today.getTime()
  document.getElementById("sort_time")!.addEventListener("click" ,()=> {
    task_list.sort((a, b) => {
      const dateA = new Date(`${a.due_date} ${a.due_time}`);
      const dateB = new Date(`${b.due_date} ${b.due_time}`);
      return dateA.getTime() - dateB.getTime()
    });

  document.querySelector("#cart")!.innerHTML = "";
  task_list.forEach(task => {
    const node =document.createElement("li");
    
    const node_text = `${task.task_name} - ${task.due_time} ${task.due_date}`;
    node.setAttribute("class", task.li_class);
    node.setAttribute("id", task.id)
    node.append(node_text);
    
     
    // delete button
    const button = document.createElement("button");
    button.setAttribute('class', 'delete_button');
    node.appendChild(button);


    //markcomplete
    const markcomplete = node.addEventListener('click', () =>{
      if (node.getAttribute("class") === 'complete'){
        node.setAttribute("class","items")
        task.li_class = "items";
      }
      else {
      node.setAttribute("class", "complete");
      task.li_class = "complete";
    }
      saveTasksToLocalStorage()
    })
    markcomplete
    // expiry
    const expiry = new Date(`${task.due_date} ${task.due_time}`).getTime();

    if (today_time > expiry && task.li_class!= "complete"){
      node.setAttribute("class", "expire")
    }
    //remove task
    button.addEventListener("click", () => {
      document.querySelector(`#${task.id}`)?.remove();
      const index = task_list.indexOf(task);
      task_list.splice(index, 1 )
      saveTasksToLocalStorage()
    })
    

    document.querySelector("#cart")?.appendChild(node);

  })
})

}
function saveTasksToLocalStorage() {
  localStorage.setItem("task_list", JSON.stringify(task_list));
}

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("task_list");
  if (storedTasks) {
    task_list = JSON.parse(storedTasks);
    document.getElementById("sort_time")!.click();
    RenderTask();
  }
}


AddTask();
RenderTask();
window.onload = loadTasksFromLocalStorage;

