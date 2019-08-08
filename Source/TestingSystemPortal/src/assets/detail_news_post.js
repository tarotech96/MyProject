function ready() {
    var newsId = $('#news_post_id_ip').val();
    var userId = $('#user_id_ipp').val();
    let fad = $('#ip_favorited').val();
    let fa = $('#ip_favorite').val();
    if (userId === undefined || userId.trim().length <= 0)
        return;
    $.post("/portal/interactnews/is_like", {idNews: newsId, idUser: userId},
        function (data, status) {
            if (data >= 0) {
                let fad = $('#ip_favorited').val();
                $('#btn-like-fb').html("<i class='fa fas fa-heart' aria-hidden='true'></i> " + fad);
                $('#isLike').val(1);
            }
        });
}

document.addEventListener("DOMContentLoaded", ready);
$(document).ready(function () {
    $.ajaxSetup({
        cache: true
    });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {
        FB.init({
            appId: '1926250761029280',
            version: 'v3.0'
        });
    });
    $('#btn-share-fb').click(function () {
        var url = window.location.href;
        FB.ui({
            method: 'share',
            display: 'popup',
            href: url,
        }, function (response) {
            if (response.error_message !== undefined) {
                return;
            }

            $.post("/portal/interactnews/update", {id: newsId, action: 2},
                function (data, status) {
                });

        });
    });
    $('#btn-like-fb').click(function () {
        var newsId = $('#news_post_id_ip').val();
        let fad = $('#ip_favorited').val();
        let fa = $('#ip_favorite').val();
        $.post("/portal/interactnews/update", {id: newsId, action: 1},
            function (data, status) {

                if (data == "") {
                    alert("Bạn chưa đăng nhập");
                }
                if (data == "true") {
                    if (data == "true") {
                        if ($('#isLike').val() == 1) {
                            $('#isLike').val(0);
                            $('#btn-like-fb').html("<i class='fa fa-heart-o' aria-hidden='true'></i> " + fa);
                        } else {
                            $('#isLike').val(1);
                            $('#btn-like-fb').html("<i class='fa fas fa-heart' aria-hidden='true'></i> " + fad);
                        }
                    }
                }
            });
    });

    // Khi ấn bình luận
    $('#input-cmt').on('keyup', function (e) {
        var newsId = localStorage.getItem("newsID");
        if (e.keyCode === 13) {
            var name = $("#current_user").val();
            var content = $('#input-cmt').val();
            var idCm = $('#parent-id').val();
            $('#input-cmt').val('');
            $.post("/portal/comments/save", {news_post_id: newsId, level: 1, content: content},
                function (data) {
                    var result = parseInt(data);
                    var currentdate = new Date();
                    var datetime = currentdate.getDate() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getFullYear() + " ";
                    if (result <= 0) {
                        alert("Bạn chưa đăng nhập");
                    } else {
                        var el = $("<li class='clearfix'><input type='hidden' value='${" + result + "}' id='parent-id'><img src='https://cdn4.iconfinder.com/data/icons/48-bubbles/48/30.User-128.png' class='avatar' alt=''><div class='post-comments'><p class='meta'><a>" + name + "</a> vào" + "&nbsp" + datetime + " bình luận :<i id='x-cmt' class='pull-right fa fa-times' style='margin-top: 5px;margin-left: 20px;cursor: pointer' aria-hidden='true'></i><i class='pull-right'><a id='reply-cmt'  class='sub-reply-btn'><small>Trả lời</small></a></i></p><p>" + content + "</p></div><div id='sub-comment-div' style='display: none;'><ul class='comments' id='sub-comment-ul'></ul><div class='form-group col-xs-5' id='input-div-sub-cmt'><input class='form-control input-sub-cmt'type='text'placeholder='Nhập vào đây....'></div></div></li>");
                        $('#comment-div').append(el);
                        el.find('.sub-reply-btn').each(function () {
                            $(this).on('click', function () {
                                var postComment = $(this).parent().parent().parent().parent();
                                var subComment = postComment.children('#sub-comment-div');
                                if (subComment.is(":visible")) {
                                    subComment.hide();
                                } else {
                                    subComment.show();
                                }
                            })
                        });

                        el.find('.input-sub-cmt').each(function () {
                            $(this).on('keyup', function (e) {
                                var postComment = $(this).parent().parent();
                                if (e.keyCode === 13) {
                                    var name = $("#current_user").val();
                                    var parentId = result;
                                    var content = $(this).val();
                                    $(this).val('');
                                    $.post("/portal/comments/sub/save", {parent_id: parentId, news_post_id: newsId, level: 2, content: content},
                                        function (data, status) {
                                            var currentdate = new Date();
                                            var datetime = currentdate.getDate() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getFullYear() + " ";
                                            if (data === "false") {
                                                alert("Bạn chưa đăng nhập");
                                            } else {
                                                postComment.children('#sub-comment-ul').append("<li class='clearfix'><img src='https://cdn4.iconfinder.com/data/icons/48-bubbles/48/30.User-128.png' class='avatar' alt=''><div class='post-comments'><p class='meta'><a>" + name + "</a> vào" + "nbsp" + datetime + "bình luận: <i class='pull-right'><a id='reply-cmt'><small>Reply</small></a></i></p><p>" + content + "</p></div></li>");
                                            }
                                        });
                                }
                            });
                        });

                    }
                });
        }
    });
    $('.sub-reply-btn').click(function () {
        var postComment = $(this).parent().parent().parent().parent();
        var subComment = postComment.children('#sub-comment-div');
        if (subComment.is(":visible")) {
            subComment.hide();
        } else {
            subComment.show();
        }
    });

    $('.input-sub-cmt').on('keyup', function (e) {
        var newsId = localStorage.getItem("newsID");
        var postComment = $(this).parent().parent().parent();
        var parrentIdInput = postComment.children('#parent-id');
        if (e.keyCode === 13) {
            var name = $("#current_user").val();
            var parentId = parrentIdInput.val();
            var content = $(this).val();
            $(this).val('');
            $.post("/portal/comments/sub/save", {parent_id: parentId, news_post_id: newsId, level: 2, content: content},
                function (data, status) {
                    var currentdate = new Date();
                    var datetime = currentdate.getDate() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getFullYear() + " ";
                    if (data === "false") {
                        alert("Bạn chưa đăng nhập");
                    } else {
                        postComment.children('#sub-comment-div').children('#sub-comment-ul').append("<li class='clearfix'><img src='https://cdn4.iconfinder.com/data/icons/48-bubbles/48/30.User-128.png' class='avatar' alt=''><div class='post-comments'><p class='meta'><a>" + name + "</a> vào" + "&nbsp" + datetime + "bình luận:</p><p>" + content + "</p></div></li>");
                    }
                });
        }
    });

    $(".title-rec").dotdotdot({
        ellipsis: "\u2026 ",
        truncate: "word",
    });
    
    $(".job-detail h5").each(function() {
        if ($(this).next().is(':hidden')) {
            $(this).find("i:last-of-type").addClass("rotate-right");
        } else {
            $(this).find("i:last-of-type").removeClass("rotate-right");
        }
    });
    
    $(".content-sp .expand").click(function() {
        let title = $(this);
        title.next().slideToggle(function() {
            if ($(this).is(':hidden')) {
                title.find("i").addClass("rotate-right");
            } else {
                title.find("i").removeClass("rotate-right");
            }
        });
    });

    $("#btn-share-fb").attr("data-href", window.location.href);
    $(".fb-comments").attr("data-href", window.location.href);

});

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.0&appId=1926250761029280&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function deleteComment(id) {
    $.ajax({
        type: 'POST',
        url: "/portal/comments/delete",
        data: {id: id},
        success: function (data) {
            if (data === "true") {
                window.location = window.location.href;
            } else {
                alert('Xảy ra lỗi');
            }
        }
    })
}