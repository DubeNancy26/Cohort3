const taskForm=document.querySelector("#taskForm")
const tasktitle=document.querySelector("#tasktitle")
const category1=document.querySelector("#category")

const taskContainer=document.querySelector(".taskContainer")
const themeToggle=document.querySelector("#themeToggle")

const grandparent=document.querySelector("#grandparent")
const parent=document.querySelector('#Parent')
const child=document.querySelector('#Child')

//when event starts from the child and moves upward to the parent and grandparent is knowm as event bubbling
grandparent.addEventListener("click",()=>{
    console.log("Grandparent")
})
parent.addEventListener("click",()=>{
    console.log("Parent")
})
child.addEventListener("click",()=>{
    console.log("Child")
})

//when event starts from the grandparent and moves downward to the parent and child is known as event capturing
grandparent.addEventListener("click",()=>{
    console.log("Grandparent")
},true)
parent.addEventListener("click",()=>{
    console.log("Parent")
},true)
child.addEventListener("click",()=>{
    console.log("Child")
},true)


themeToggle.addEventListener("click",()=>{
    // document.body.classList.toggle("dark")
    // console.log(document.body.dataset.theme)
    // document.body.setAttribute("data-theme","dark")
    // console.log(document.body.dataset.theme)
    if(document.body.dataset.theme==='light'){
        document.body.classList.add("dark")
        document.body.setAttribute("data-theme",'dark')
        themeToggle.textContent="Light Mode"
    }else{
        document.body.classList.remove("dark")
        document.body.setAttribute("data-theme","light")
        themeToggle.textContent="Dark Mode"
    }
    console.log(document.body.dataset.theme)
})



taskForm.addEventListener("submit",(event)=>{
    event.preventDefault()

    console.log(event.target)
    console.log(event.currentTarget)
    const title=tasktitle.value.trim();
    const category=category1.value;

    if(title===""){
        return;
    }

    console.log(title)
    console.log(category)
    
    const div=document.createElement("div")
    div.setAttribute("data-id",1)
    const id=div.getAttribute("data-id")
    console.log(id)
    console.log(div.hasAttribute("data-id"))

    div.setAttribute("data-status","pending")
    console.log(div.hasAttribute("data-status"))
    div.removeAttribute("data-status")
    console.log(div.hasAttribute("data-status"))
    div.setAttribute("data-status","pending")
    
    div.setAttribute("data-category",category)
    const dataCategory=div.getAttribute("data-category")
    console.log(dataCategory)
    console.log(div.hasAttribute("data-category"))

    //dataset
    console.log(div.dataset.id)
    console.log(div.dataset.status)
    console.log(div.dataset.category)

    const titleElement=document.createElement("h4")
    const p=document.createElement("p")

    const editBtn= document.createElement("button");
    editBtn.append("Edit")

    editBtn.addEventListener("click",(event)=>{
        const editInput=document.createElement("input")
        editInput.value=title;

        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);
        titleElement.replaceWith(editInput);
        
        editInput.addEventListener("change",()=>{
            const newTitle=editInput.value.trim();
            if(newTitle===""){
                return;
            }

            const newTitleElement=document.createElement("h4");
        
            newTitleElement.append(newTitle)

            editInput.replaceWith(newTitleElement)
        })
    })

    const completeBtn= document.createElement("button");
    completeBtn.append("Complete")

    completeBtn.addEventListener("click",(event)=>{
        div.setAttribute("data-status", "completed")
        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);
        titleElement.style.textDecoration = "line-through";
        titleElement.style.color = "gray";
    })

    const deleteBtn= document.createElement("button");
    deleteBtn.append("Delete")
    deleteBtn.addEventListener("click",(event)=>{
        //console.log("Deleted")
        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);
        div.remove()
        
    })

    const Task=document.createElement("h1")
    Task.prepend("Task")

    const taskHeading=document.createElement("h4")
    taskHeading.prepend("Task Title:")
    
    const line2=document.createElement("hr")
    

    const titleText=document.createTextNode(title)
    const categoryText=document.createTextNode(category)

    titleElement.append(titleText)
    p.append(categoryText)

    // div.append(taskHeading)
    div.append(titleElement)
    div.append(p)
    p.after(line2)
    div.append(editBtn)
    div.append(completeBtn)
    div.append(deleteBtn)
    div.prepend(Task)


    titleElement.before(taskHeading)
    
    
    taskContainer.append(div)

    tasktitle.value=""
})


taskContainer.addEventListener("click", (event) => {

    if (event.target.textContent === "Edit") {
        console.log("Edit");
    }

    if (event.target.textContent === "Complete") {
        console.log("Complete");
    }

    if (event.target.textContent === "Delete") {
        console.log("Delete");
    }

});


//value give the current value of the input
console.log(tasktitle.value);

//getAttribute give the value stored in html  
console.log(tasktitle.getAttribute("value"));