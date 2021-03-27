async function loadContent() {

	const body = document.getElementsByTagName("body")[0];
	//loadHeader(body);
	


	var requestList = new XMLHttpRequest();
	requestList.open('GET', 'data/data.txt', true);
	requestList.onload = function (e) {
	    if (requestList.readyState === 4) {
	    	
	        if (requestList.status === 200) {

				var lineas = requestList.responseText.split('\n');

				for(var linea of lineas) {
					loadStudent(body, linea);
				}

	        	console.log(requestList.responseText);

	        } else {
		            console.error(requestList.statusText);
		        }
	    }
	};
	requestList.send();

	

	/*
	var parser = new DOMParser();
	var doc = await parser.parseFromString(res, "text/html");
	const name = doc.getElementsByTagName("title")[0].innerText;
	console.log(name);
	*/
}


function loadHeader(body){
	//const body = document.getElementsByTagName("body")[0];
	const section = document.createElement("SECTION");
	section.classList.add("s-info");
	section.innerHTML = `<h1 class="s-info--title">Información</h1>`;
	const article = document.createElement("ARTICLE");
	article.classList.add("s-info__art");
	article.innerHTML = `<img class="s-info__art--img" src="images/crangarita.jpg" />`;
	const div = document.createElement("DIV");
	div.classList.add("s-info__div");
	div.innerHTML = `<p class="s-info__div--p">Hola buenas tardes</p>`;
	div.innerHTML += `<p class="s-info__div--p"><b>Todo correto</b></p>`;
	article.appendChild(div);
	section.appendChild(article);
	body.appendChild(section);
}

function loadStudent(body, student) {


	var request = new XMLHttpRequest();
	request.open('GET', 'students/'+student+'/index.html', true);
	request.onload = function (e) {
	    if (request.readyState === 4) {
	        if (request.status === 200) {

	        		var parser = new DOMParser();
					var doc = parser.parseFromString(request.responseText, 'text/html');
					var nombre = doc.head.getElementsByTagName("title")[0].childNodes[0].nodeValue;
					var email = doc.body.getElementsByClassName("email")[0].innerHTML;
					var github = doc.body.getElementsByClassName("github")[0].innerHTML;

	        		const section2 = document.createElement("SECTION");
					section2.classList.add("main");
					const article2 = document.createElement("ARTICLE");
					article2.classList.add("main__art");
					article2.innerHTML = `
				        <figure class="main__logo">
				            <img class="main__logo--img" src="images/logo.png" alt="logo" />
				        </figure>`;
					article2.innerHTML += `
				        <figure class="main__photo">
				            <img
				                class="main__photo--img"
				                src="students/${student}/img/foto.jpg"
				                alt="photo"
				            />
				        </figure>`;
					const footer = document.createElement("FOOTER");
					footer.classList.add("main__footer");
					const div1 = document.createElement("DIV");
					const div2 = document.createElement("DIV");
					const div3 = document.createElement("DIV");
					div1.classList.add("main__finfo");
					div2.classList.add("main__finfo");
					div3.classList.add("main__fbuttons");
					
					div1.innerHTML = `
				        <i class="far fa-envelope"></i>
				        <p class="main__finfo--p"><b>Email:</b></p>
				        <p class="main__finfo--p">${email}</p>`;
					div2.innerHTML = `
				        <i class="fab fa-github"></i>
				        <p class="main__finfo--p"><b>Github:</b></p>
				        <p class="main__finfo--p">${github}</p>`;
					div3.innerHTML = `
				        <a class="main__fbuttons--btn" href="students/${student}/index.html">Información</a>
				        <a class="main__fbuttons--btn" href="">Proyectos</a>`;
					footer.appendChild(div1);
					footer.appendChild(div2);
					footer.appendChild(div3);
					article2.appendChild(footer);
					article2.innerHTML += `
				        <h1 class="main__art--h1">${nombre}</h1>`;
					section2.appendChild(article2);
					body.appendChild(section2);

	        	} else {
	            console.error(request.statusText);
	        }
	    }
	};
	request.send();


	
}