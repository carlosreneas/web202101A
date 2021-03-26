document.addEventListener('DOMContentLoaded', function () {

	loadContent();
	/*
	var requestList = new XMLHttpRequest();
	requestList.open('GET', 'data/data.txt', true);
	requestList.onload = function (e) {
	    if (requestList.readyState === 4) {
	    	
	        if (requestList.status === 200) {

				var lineas = requestList.responseText.split('\n');

				for(var linea of lineas) {
					console.log(linea);
					const div = document.createElement("article");
	        		div.setAttribute("class", "estudiante");
	        		div.setAttribute("data-codigo", linea);
	        		cargar(div);
					document.getElementsByTagName("section")[0].appendChild(div);
				}

	        	console.log(requestList.responseText);

	        } else {
		            console.error(requestList.statusText);
		        }
	    }
	};
	requestList.send();
    console.log("¡Estamos en vivo!");    
    */
});


function cargar(el) {

    var request = new XMLHttpRequest();
	request.open('GET', 'students/'+el.dataset.codigo+'/index.html', true);
	request.onload = function (e) {
	    if (request.readyState === 4) {
	        if (request.status === 200) {
	        	
	        	var parser = new DOMParser();
				var doc = parser.parseFromString(request.responseText, 'text/html');

	        	const picture = document.createElement("picture");
	        	picture.setAttribute("class","datos__picture");
	        	const img = doc.body.getElementsByClassName("img")[0];
	        	picture.appendChild(img);
	        	el.appendChild(picture);

	        	const section = document.createElement("section");
	        	section.setAttribute("class","datos__informacion");
	        	const nombre = document.createElement("div");
	        	nombre.innerHTML = doc.head.getElementsByTagName("title")[0].childNodes[0].nodeValue;
	        	nombre.setAttribute("class","datos__nombre");
	        	section.appendChild(nombre);

	        	if(doc.body.getElementsByClassName("email")[0]) {
		        	const email = document.createElement("div");
		        	email.innerHTML = "Email: " + doc.body.getElementsByClassName("email")[0].innerHTML;
		        	section.appendChild(email);
		        }

		        if(doc.body.getElementsByClassName("github")[0]) {
		        	const github = document.createElement("div");
		        	const agithub = document.createElement("a");
		        	agithub.href = doc.body.getElementsByClassName("github")[0].innerHTML;
		        	agithub.innerHTML = doc.body.getElementsByClassName("github")[0].innerHTML;
		        	var githubTexto = document.createTextNode('Github: ');
		        	github.appendChild(githubTexto);
		        	github.appendChild(agithub);
		        	section.appendChild(github);
		        }
	        	
	        	var githubNode = doc.body.getElementsByClassName("semillero");
	        	if(githubNode[0]) {
	        		const semillero = document.createElement("div");
	        		semillero.innerHTML = "Semillero: ";
	        		section.appendChild(semillero);
	        	}
	        	
	        	const enlace = document.createElement("div");
	        	const informacion = document.createElement("a");
	        	informacion.href = el.dataset.codigo + "/index.html";
	        	informacion.setAttribute("class", "datos__enlace");
	        	informacion.innerHTML = "Información";

	        	enlace.appendChild(informacion);
	        	const proyectos = document.createElement("a");

	        	var proyectosNode = doc.body.getElementsByClassName("proyectos");

	        	if(proyectosNode[0]) {
	        		enlace.appendChild(proyectosNode[0]);
	        	}

	        	section.appendChild(enlace);
	        	el.appendChild(section);

	        } else {
	            console.error(request.statusText);
	        }
	    }
	};
	request.send();
};