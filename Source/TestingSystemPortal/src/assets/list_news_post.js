function openDetail(title, id) {
	localStorage.setItem("newsID", id);
	var contextPath = $("#contextPath").val();
	title = removeDiacritics(title).replace(/[^\w\s]/gi, "").replace(/ /g, "-");
	window.location.href = "/tin-tuc/" + title + "-" + id;
}

$(document).ready(function() {
	$(".title-rec").dotdotdot({
		ellipsis: "\u2026 ",
		truncate: "word",
	});

});
