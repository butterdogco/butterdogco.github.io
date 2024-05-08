var link = window.location.href;
if (!link.includes("https://b-dog.co")) {
    var things = document.querySelectorAll("a");
    var things_array = [...things];
    things_array.forEach(obj => {
        if (obj.parentNode.className = "card") {
            if (obj.getAttribute('data-alt-link')) {
                obj.href = obj.getAttribute('data-alt-link');
                obj.title = "Click to open alternate link";
            }
        }
    });
}
