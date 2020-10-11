let taskArr=JSON.parse(localStorage.getItem("taskInfo")) || [];


function addTasks(task){
    const info="<li><span>" + task + "</span><button class='deleteTask'>Done</button></li>";
    $("#taskList").append(info); 
}

function saveTaskData(){
    //console.log(this)
    //scan the list for objects that are not removed 
    // $("#taskList > li") //direct children
    // $("#taskList  li") //desecent children
    let arr=[];

    //take those and save them into an new array. we will use this new array to save to local storage 
    $("#taskList > li").not(".striked").children("span").each(function(){
        console.log(this);
        arr.push($(this).text());
    });

    //set local storage
    localStorage.setItem("taskInfo", JSON.stringify(arr))
}


for(let i = 0; i < taskArr.length; i++){
    addTasks(taskArr[i]);
}

 
$("#btn").on("click", function(event){
    //prevent the default action of the button on this form
    event.preventDefault();

    //grabs the text inputted
    const text = $("#taskName").val().trim();

    if(text) {
        $("#cannotBlank").remove();
        $("#nothingMsg").remove();
        
        addTasks(text);

        saveTaskData();
        //clearing our input box 
        $("#taskName").val(" ");
    }
    else{
        $("#taskName").before("<span id='cannotBlank'>Task cannot be blank</span>");
    }

});


 // strike out the tasks
$(".deleteTask").on("click",function(){
    //need to grab that speific task then change class to striked and using css, have it strike out that tasks 
    console.log("click")
    // want to remove the item from array 
    $(this).parent().addClass("striked");

    saveTaskData();
});



//clear task list 
$("#clearBtn", document.body).on("click", function(){
     //adding msg if there are empty div in the taskContainer but clear all btn was pressed
    //credit If statement to https://stackoverflow.com/questions/6813227/how-do-i-check-if-an-html-element-is-empty-using-jquery/18488130
    if(($.trim($(".taskContainer").html())=='')){
        console.log("empty");
        $(".taskContainer").html("<span id='nothingMsg'>Nothing to delete</span>")
    }
    else{
        //show modal asking if user is sure to delete everything
        $(".deleteModal").modal();
        //delete everything in the taskContainer
        $(".yesBtn").on("click", function(){
            localStorage.clear();

            if(localStorage == null){
               $(".taskContainer").text("")
           }
            //delete everything in the taskContainer
             $(".striked,.deleteTask").remove();
            
         });
       
    }
   
})


//need to do:
 //work on clear all due to added functions above on 10/11/20. Clear all now only deletes the Delete button