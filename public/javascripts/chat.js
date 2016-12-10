/**
 * Created by jinho on 2016-12-06.
 */
$(document).ready(function () {

    var temp = null;
    var webSocket = null;

    function onMessage(event) {
        console.log("상대 : " + event.data );
        $('#messageList').append('<div class="chatReciveMessage">' + event.data +'</div><br/><br/>');
    }
    function onOpen(event) {
        console.log("연결")
    }
    function onError(event) {
        console.log(event)
    }

    $("#switcher, #showSwitcher").removeClass('hide');


    $("#showSwitcher").click(function () {
        if($("#showSwitcher").is(":visible")){
            var _identifier = "#showSwitcher";
            $("#switcher").animate({"margin-left": "0px"}, 500).show();
        }else{
            var _identifier = "#switcher";
            jQuery("#showSwitcher").show().animate({"margin-left": "0"}, 500);
        }

        $(_identifier).animate({"margin-left": "-500px"}, 500, function () {
            jQuery(this).hide();
        });

    });

    $('#hideSwitcher').on('click',function () {
        $("#showSwitcher").animate({"margin-left": "0px"}, 500).show();
        $('#switcher').animate({"margin-left": "-500px"}, 500, function () {
            $('#switcher').hide();
        });
    })

    $(document).on('click',"#chatList > button",function () {
        webSocket = new WebSocket('ws://localhost:9000/chat?location='+this.id);

        webSocket.onerror = function(event) {
            onError(event)
        };
        webSocket.onopen = function(event) {
            onOpen(event)
        };
        webSocket.onmessage = function(event) {
            onMessage(event)
        };

        $.ajax({
            type: 'post',
            url: '/chat/getMessage',
            dataType: 'json',
            data: {'location' : this.id},
            success: function (data) {
                temp = $('#chatList');
                $('#chatList').remove();
                var chatRoom =
                    '<div id="content-switcher" class="content-switcher">' +
                    '<button id="backBtn" class="btn btn-3d btn-teal btn-block margin-top-30">뒤로가기</button>'+
                    '<div id="messageList">';
                    console.log()
                for(var i = 0; i < data.messages.length; i++){


                    if(data.messages[i].userId != '<%= user_id %>') {
                        chatRoom += '<div><div>' + data.messages[i].userId + '</div><div class="chatReciveMessage">' + data.messages[i].message + '</div></div><br/><br/><br/>'
                    }else{
                        chatRoom += '<div><div>' + data.messages[i].userId + '</div><div class="messageSend">' + data.messages[i].message + '</div></div><br/><br/><br/>'
                    }
                }

                chatRoom += '</div>' +
                    '<div class="inputBox" id="inputBox"><textarea id="inputText" class="form-control" rows="2"></textarea><button id="messageSend" class="btn btn-3d btn-teal btn-block margin-top-30">보내기</button></div>'+
                    '</div>';
                $('#switcher').append(chatRoom);
                $('#content-switcher').css('height','90%');
                // $('#messageList').css('overflow','scroll').css('height','60%');
                $('#messageList').css('height','50%').css('overflow','auto').css('width','90%');
                // $('#messageList').scrollTop($(document).height());
                $('#inputBox').css('position','absolute').css('bottom','10px').css('width','90%');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + ' : ' + errorThrown);
            }

        })
    });


    $(document).on('click','#messageSend',function () {
        webSocket.send($('#inputText').val());
    });

    $(document).on('click','#backBtn',function () {
        webSocket.close();
        $('#content-switcher').remove();
        $('#switcher').append(temp);

    });




});