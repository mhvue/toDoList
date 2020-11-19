let taskArr=JSON.parse(localStorage.getItem("taskInfo")) || [];

//adding a task 
function addTasks(task){
    //have a const to hold our listed items (which will be numbered)
     const info="<li class='taskItem' id='"+ task + "'" +"><span>" + task + "</span><button class='deleteTask'>x</button></li>";

    //append those li to our taskList (which is ol on html side)
    $("#taskList").append(info); 

}


//saving task to local storage 
function saveTaskData(){
    //console.log(this)
    //scan the list for objects that are not removed 

    //either way can work below:
    // $("#taskList > li") //direct children
    // $("#taskList  li") //desecent children
    let arr=[];

    //take those and save them into an new array. we will use this new array to save to local storage 
    $("#taskList > li").not(".fade").children("span").each(function(){
        console.log(this);
        arr.push($(this).text());
    });

    //set local storage with these items now 
    localStorage.setItem("taskInfo", JSON.stringify(arr));
}

//loop through task array 
for(let i = 0; i < taskArr.length; i++){
    //call addtask func with all the items from task array so the function can show user all the tasks 
    addTasks(taskArr[i]);
}

 //when pressing submit btn when done inputing a task  
$("#btn").on("click", function(event){
    //prevent the default action of the button on this form
    event.preventDefault();

    //grabs the text inputted
    const text = $("#taskName").val().trim();

    if(text) {
        //removeing msg of cannot be blank if user enters text
        $("#cannotBlank").remove();
        //remove the msg to user informing there's no task added so far 
        $("#nothingMsg").remove();
        
        addTasks(text);

        saveTaskData();
        //clearing our input box 
        $("#taskName").val(" ");
    }
    else{
        //show msg that input cannot be empty 
         $("#btn").after(" " + "<span id='cannotBlank'>*Task cannot be blank*</span>");
    }

});

//every time sortable is done, an array is updated 
   $("#taskList").sortable({
       update: function(){
        //have to rearrange an array as users move items due to sortable, then loop through again to push to new array 

        //have to another empty array
        let arrAfterMove = [];
        console.log(arrAfterMove)
        //take those and save them into an new array. we will use this new array to save to local storage 

        //loop though again 
        $(".taskItem").each(function(){
             arrAfterMove.push($(this).children("span").text());
         });
    
    
        //set local storage with these items now 
        localStorage.setItem("taskInfo", JSON.stringify(arrAfterMove))
    
    }
    
   }); 


 // fade out the tasks
$(".deleteTask").on("click",function(){
    console.log(this)
    //finding the item to be faded out 
     $(this).parent().addClass("fade").fadeOut();
    saveTaskData();
});



//clear ALL the tasks in the list 
$("#clearBtn", document.body).on("click", function(){
     //adding msg if there are no tasks listed, but clear all btn was pressed by user
    //credit If statement to https://stackoverflow.com/questions/6813227/how-do-i-check-if-an-html-element-is-empty-using-jquery/18488130
    if(($.trim($("#taskList").html())=='')){
        $("#taskList").html("<span id='nothingMsg'>Nothing to delete</span>")
    }
    else{
        //show modal asking if user is sure to delete everything
        $(".deleteModal").modal();

        //when click on Yes to agree on deleting everything, then delete everything tasks listed and clear local storage
        $(".yesBtn").on("click", function(){
            //delete everything in the taskContainer
             $(".fade,.deleteTask, .taskItem").remove();

             //clear local storage 
             localStorage.clear();
         });
       
    }
   
})

//to do make sure not to add duplicate for tasks