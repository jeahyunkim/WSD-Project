
$(document).ready(function () {


    $("#file").on('change',function () {
        ext = $(this).val().split('.').pop().toLowerCase();

        if($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
            resetFormElement($(this)); //폼 초기화
            alert("이미지 파일이 아닙니다! (gif, png, jpg, jpeg 만 업로드 가능)");
        } else {
            file = $('#file').prop("files")[0];
            blobURL = window.URL.createObjectURL(file);
            $('#imagePreview').attr('src', blobURL);
        }
    })

})