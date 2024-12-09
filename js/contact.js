let anchors = document.querySelectorAll('a[href="#home"]');


anchors.forEach(anchor => {
	anchor.addEventListener("click", function (){
		window.location.replace("index.html");
	});
});