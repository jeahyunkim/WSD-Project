$(document).ready(function (){
    $(".heart_icon").click(function(event){
        //event.preventDefault();
        var content_id = $(this).data("value");
        //alert(content_id);
        if(!$("#i_" +  content_id).hasClass("after_heart")) {
            $.ajax({
                type:"POST",
                url:"/timeline/heart",
                data: { id: content_id},
                success:function(data){
                    $("#i_" + content_id).addClass("after_heart");
                    $("#s_" + content_id).text($("#s_" + content_id).text() * 1 + 1);
                    $("#s_" + content_id).css("color", "red");
                },
                error:function(e){
                    alert(e.responseText);
                }
            });
        }
    });
});