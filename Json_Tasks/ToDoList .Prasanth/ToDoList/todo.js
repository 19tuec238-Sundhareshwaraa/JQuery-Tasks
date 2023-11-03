$(document).ready(function(){
    $("#add").click(function(){
        addTask();
        $(".box2").fadeIn(600);
    });
    $(".value").keypress(function(e){
        if(e.which === 13){
            addTask();
            $(".box2").fadeIn(600);
        }
    });

    function addTask(){
        var taskInput = $(".value").val();
        var dateInput = $(".date").val();
        var status = $("#status").val(); 

        if( taskInput !== ""){
            let input = $(`<div id="list" class="p-3 m-2 mb-3" style="word-wrap: break-word;"></div>`).html(
                taskInput + `<br> <small>(Due: ${dateInput} )</small>`
            );

            let rem = $(`<span class="material-symbols-outlined icons">delete</span>`).click(function(){
                if (status === "Pending" || status === "Completed" || status === "In Progress") {
                    $(rem).parent().css("background-color","red")
                    $(rem).parent().fadeOut(1000, function(){
                        $(rem).parent().remove();
                    });
                } 
               
            });
            let completed = $(`<span class="material-symbols-outlined icons" style="color: green !important;font-weight:bold">done</span>`).click(function(){
                if (status === "Pending" || status === "In Progress") {
                    $(completed).parent().toggleClass("strike")
                    $(completed).parent().css("background-color","rgb(170, 243, 164)")
                    $(completed).parent().fadeOut(1000,function(){
                     let completedVal=$(completed).parent().contents().filter(function(){
                        return this.nodeType===3;
 
                    }).text().trim();
                    if (status === "Pending") {

                        $("#inProgressTab .completed_items").append(`<div id="list" class="p-2 m-2">${completedVal}
                        <br> <small>(Due: ${dateInput} )</small>
                        <span class="material-symbols-outlined icon-done" style="color: green !important;font-weight:bold">done</span>
                        <span class="material-symbols-outlined icon-edit" style="color: #8CA6DB !important;font-weight:bold">edit</span>
                        <span class="material-symbols-outlined icons">delete</span>
                        </div>`)
                        $(".icon-edit").click(function(){
                            let editVals = $(this).parent().contents().filter(function(){
                                return this.nodeType === 3;
                            }).text().trim();
                            $(".value").val(editVals);
                            $(".icon-edit").parent().remove();
                        })
                        $(".icon-done").click(function(){
                            $(this).parent().css("background-color","rgb(170, 243, 164)")
                            $(this).parent().addClass("strike")
                            $(this).parent().fadeOut(1000,function(){
                            $("#completedTab .completed_items").append(`<div id="list" class="p-2 m-2">${completedVal}
                            <span class="material-symbols-outlined icons">delete</span></div>`)
                            $(".icon-done").parent().remove();
                            });
                         
                        })

                    } else if (status === "In Progress") {
                        $("#completedTab .completed_items").append(`<div id="list" class="p-2 m-2">${completedVal}
                        <span class="material-symbols-outlined icons">delete</span></div>`)
                   
                    }
                    console.log(completedVal);
                })
                }
            });
            
            let edited = $(`<span class="material-symbols-outlined icons" style="color: #8CA6DB !important;font-weight:bold">edit</span>`).click(function(){
                let editVals = $(edited).parent().contents().filter(function(){
                    return this.nodeType === 3;
                }).text().trim();
                $(".value").val(editVals);
                $(edited).parent().remove();
            });
            input.append(completed, edited, rem);
            if (status === "Pending") {
                $("#pendingTab .completed_items").append(input);
            } else if (status === "Completed") {
                $("#completedTab .completed_items").append(input);
            } else if (status === "In Progress") {
                $("#inProgressTab .completed_items").append(input);
            }

            $(".value").val("");
            $(".date").val("");
        }

        const tasks = {
            task: taskInput,
            date: dateInput,
            status: status
        };
        console.log(JSON.stringify(tasks));
    }
    $(document).on("click", ".completed_items .icons", function (e) {
        $(e.target).parent().fadeOut(1000, function(){
            $(e.target).parent().remove();
        });
    });

    let isToggled = false;
    $(".showbtn").click(function(){
        if(isToggled){
            $(".arrow").html(`<span class="material-symbols-outlined arrow">keyboard_double_arrow_right</span>`)
            isToggled = false;
        } else {
            $(".arrow").html(`<span class="material-symbols-outlined arrow" style="color: white;">keyboard_double_arrow_left</span>`)
            isToggled = true;
        }
        $(".box2").fadeToggle(600);
    });


    });


