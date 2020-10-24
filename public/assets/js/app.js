$(document).ready(function () {
    $.get("/api/students", function (data) {
        // console.log(data);
        for (let i = 0; i< data.length;i++) {
            $(".container").append(`   <div class="card">
            <div class="card-body">
              ${data[i].name} <span style='color:red' class='del' data-name=${data[i].name}>X</span>
            </div>
            
          </div>`)
        }
     
    });

    $(document).on("click",".del",function(){
        // console.log(this);
        var name = $(this).attr("data-name");
        // console.log(name);

        $.ajax({
            url:"/api/student/"+name,
            method:"DELETE"
        }).then(function(data){
            console.log(data);
        })
    })

    // $.delete("/api/student/"+name, function(data){

    // })
});