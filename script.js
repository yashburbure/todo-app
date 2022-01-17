function push(event){
    event.preventDefault();
    let tex=document.getElementById("todo-input").value;
    console.log(tex);
    add(tex);
}