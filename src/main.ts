import './style.css'
const placehold = document.querySelector('#input') as HTMLInputElement;
placehold.placeholder = "Enter your Task";

function Task(){
  document.querySelector("#add_task")!.addEventListener("click", () =>{
    // add task
    const item_name = document.querySelector('#input') as HTMLInputElement;
    const value = item_name?.value.trim();
    
    if (value === '') return
    const node = document.createElement("li");
    const textnode = document.createTextNode(value);
    const value_no_space = value.replace(/\s+/g, ''); // removes spaces between words

    //mark task complete
    node.addEventListener('click', () =>{
      if (node.getAttribute("class") === 'complete'){
        node.setAttribute("class","items")
      }
      else {node.setAttribute("class", "complete");}
      
    })

    // add text
    node.appendChild(textnode);


    // delete button
    const button = document.createElement("button");
    button.setAttribute('class', 'delete_button');
    node.setAttribute("id", value_no_space); // li id
    node.setAttribute("class", 'items');
    node.appendChild(button);


    //remove task
    button.addEventListener("click", () => {

      document.querySelector(`#${value_no_space}`)?.remove();

    })
    // add to ul
    document.querySelector("#cart")!.appendChild(node);
    item_name!.value = '';
  })
}



Task();

