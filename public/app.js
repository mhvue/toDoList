let numberTask=0;

if(localStorage != null){
    $(".taskContainer").html(JSON.parse(localStorage.getItem("taskInfo")))
}

$("#btn").on("click", function(event){
    //prevent the default action of the button on this form
    event.preventDefault();

    //grabs the text inputted
    const text = $("#taskName").val().trim();

    //creating a delete button
     doneBtn= $("<button>").text("Done").addClass("deleteTask")

    if(text) {
      
        $("#cannotBlank").remove();
        $("#nothingMsg").remove()
        //numberTask will increase to allow numbered list in tasks entered
        numberTask++; 

        //variable to hold the text entered by user, with a class and id 
       //const taskInfo = $("<p>").val(numberTask + ")", text).addClass("textList").attr("id","taskNo."+numberTask)
    
        localStorage.setItem("taskInfo", JSON.stringify(numberTask + ")" + text))
         const data = JSON.parse(localStorage.getItem("taskInfo"))

        //append the input text to the div, allow it to show 
        const info="<span class='textList' id='taskNo.'>" + data + "</span>";

        $(".taskContainer").append(info, doneBtn)

    
        //option to strike out the tasks
        $(".deleteTask").on("click",function(){
            //need to grab that speific task then change class to striked and using css, have it strike out that tasks 
            const taskNoInfo= $(this).prev().removeClass("textList").addClass("striked")
            localStorage.removeItem("taskInfo")
        });

        //clearing our input box 
        $("#taskName").val(" ");
    }
    else{
        $("#taskName").before("<span id='cannotBlank'>Task cannot be blank</span>");
    }

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
             $(".textList, .striked,.deleteTask").remove();
            
            //reseting numbers back to 0 so a new list can start with correct numerical order again
            numberTask=0;
         });
       
    }
   
})


//need to do:
    //incorpoate localStorage 
    //issues ran into: localStorage can only store strings meaning we cannot store the done button next to it
    //fix issues with refresh, as localstorage clear but still showing data on to do list
    //fix appending issue