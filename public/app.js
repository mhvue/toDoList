let numberTask=0;

$("#btn").on("click", function(event){
    event.preventDefault();
    numberTask++; 

    //grabs the text inputted
    const text = $("#taskName").val();
   // console.log(text)
    const deleteBtn= $("<button>").text("Delete").addClass("deleteTask")

    $("#taskName").val(" ");

    const taskInfo = $("<p>").text(numberTask + text).addClass("textList").attr("id","taskNo."+numberTask)

    //append the input text to the div showing it
    $(".taskContainer").append(taskInfo, deleteBtn);

    //option to delete the tasks
    $(".deleteTask").on("click",function(){
        //console.log("cilcked")
        //need to grab that speific task then change class to striked and using css, strike out that tasks
        const taskNoInfo= $(this).prev().removeClass("textList").addClass("striked")
      
                    
    })
});
