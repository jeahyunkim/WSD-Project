
$(document).ready(function () {

    $("#photo").on('change',function () {
        ext = $(this).val().split('.').pop().toLowerCase();

        if($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
            $(this).wrap('<form>').closest('form').get(0).reset();
            $(this).unwrap();
            alert("이미지 파일이 아닙니다! (gif, png, jpg, jpeg 만 업로드 가능)");
        } else {
            file = $('#photo').prop("files")[0];
            blobURL = window.URL.createObjectURL(file); // file을 참조하는 URL 생성
            $('#imagePreview').attr('src', blobURL);
        }
    })

})