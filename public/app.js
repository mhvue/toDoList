let numberTask=0;

$("#btn").on("click", function(event){
    //prevent the default action of the button on this form
    event.preventDefault();
    //numberTask will increase to allow numbered list in tasks entered
    numberTask++; 

    //grabs the text inputted
    const text = $("#taskName").val().trim()

    //creating a delete button
    const deleteBtn= $("<button>").text("Done").addClass("deleteTask")


    //clearing our input box 
    $("#taskName").val(" ");

    //variable to hold the text entered by user, with a class and id 
    const taskInfo = $("<p>").text(numberTask + ")" + text).addClass("textList").attr("id","taskNo."+numberTask)

    //append the input text to the div, allow it to show 
    $(".taskContainer").append(taskInfo, deleteBtn);

    //option to delete the tasks
    $(".deleteTask").on("click",function(){
        //need to grab that speific task then change class to striked and using css, have it strike out that tasks
        const taskNoInfo= $(this).prev().removeClass("textList").addClass("striked")
                    
    });

});

  //clear task list 
    $("#clearBtn", document.body).on("click", function(){

        //delete everything in the taskContainer
        $(".textList, .striked,.deleteTask").remove();

        //resting numbers back to 0 so a new list can start with correct numerical order again
        numberTask=0;
     
    })
