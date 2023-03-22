
document.addEventListener("DOMContentLoaded", function(){
	iniciarApp();
})

const email={
	name:"",
	telefono:"",
	email:"",
	msg:""
}

const formulario=document.querySelector("#formulario");
const botonFormulario=document.querySelector('#formulario .flex-center button[type="submit"]');
const spinner=document.querySelector(".spinner");
const contenidoFlecha=document.querySelector(".contenido-flecha");
const portafolio=document.querySelector("#Portafolio");
const contorno= document.querySelector(".contorno");
const barra=document.querySelector('.mobile-menu');


function iniciarApp(){

	addEventListeners();

	//modo oscuro
	darckMode();
	//ajuste al desplazar los colores
	ajuste();


	mostrarCambios();
	//typing
	typeText();

	interceptarPortafolio();
	//validar el formulario
	validarFormulario();



}

function addEventListeners(){
		//scroll al no mostrar el header o para la configuracion
		window.addEventListener("scroll", animacionScroll);
		//mostrar la barra de navegacion responsive
		barra.addEventListener("click", navegacionResponsive);
		
		contenidoFlecha.addEventListener("click", scrollUp);
}
//======llamando a la funcion del boton subir======
function animacionScroll(){
	const barra=document.querySelector('.barra');
		const header=document.querySelector('.header');
		
		barra.classList.toggle("abajo", window.scrollY>595)
		header.classList.toggle("abajo", window.scrollY>595)
		contenidoFlecha.classList.toggle("abajo", window.scrollY>300); 


		if(contorno.classList.contains("mostrando")){
			contorno.classList.remove("mostrando");
		}
}

function scrollUp(){
	const scrollCurrent=document.documentElement.scrollTop;
			if (scrollCurrent>0) {
				window.scrollTo(0,0);
			}
}


function darckMode(){

	// este codigo de aqui sirve para que deje el oscuro en todas las pestañas cuando cambie la pagina
	const prefieredarckMode=window.matchMedia('(prefers-color-scheme:dark)');
	
	if(prefieredarckMode){
		document.body.classList.add('oscuro');
	}else if(prefieredarckMode){
		document.body.classList.remove('oscuro');
	}

	const darck=document.getElementById("dark");

	darck.addEventListener("click", ()=>{
		document.body.classList.toggle("oscuro");

		if(document.body.classList.contains('oscuro')){
			localStorage.setItem("darck-mode","true");
		}else{
			localStorage.setItem("darck-mode","false");
		}
	});

	if(localStorage.getItem("darck-mode")==="true"){
		document.body.classList.add("oscuro");
	}else{
		document.body.classList.remove("oscuro");
	}
}

function ajuste(){
	const configuracion=document.getElementById("ajustes");
	configuracion.addEventListener("click", colores);
}

function navegacionResponsive(){
	const navegador=document.querySelector(".navegacion");

	if(navegador.classList.contains("mostrar")){
		navegador.classList.remove("mostrar");
	}else{
		navegador.classList.add("mostrar");
	}
}

//========================mostrar el contenido de configuracion con los colores========================//

function colores(){
	if (contorno.classList.contains("mostrando")) {
		contorno.classList.remove("mostrando");
	}else{
		contorno.classList.add("mostrando");
	}
}


//=================funcion para mostrar los cambios de color en la configuracion=================//

function mostrarCambios(){

	const colores=document.querySelectorAll('#color');
	colores.forEach(color=>{//se itera los colores y se coloca como alias 
		color.addEventListener("click", e=>{//evento al dar click a cada uno de los colores
			const colorSeleccionado=e.target.dataset.colorMostrado;//se obtiene el atributo data y su color
			// console.log(colorSeleccionado);
			 localStorage.setItem("color", colorSeleccionado);//en localStorage se guarda su llave "color" y el colorSeleccionado
			cambiarClase(colorSeleccionado);//se manda llamar la funcion
		});
	});

	const colorGuardado = localStorage.getItem("color");
	if (colorGuardado) {
	  cambiarClase(colorGuardado);
	}
}

function cambiarClase(color) {
		// console.log(color)
	if (color === "rojo") {
	document.body.classList.add("rojo");
	document.body.classList.remove("azul");
	document.body.classList.remove("verde");
	} else if (color === "azul") {
	document.body.classList.add("azul");
	document.body.classList.remove("rojo");
	document.body.classList.remove("verde");
	} else if (color === "verde") {
	document.body.classList.add("verde");
	document.body.classList.remove("rojo");
	document.body.classList.remove("azul");
	}
}


//========funcion para mostrar el texto en forma de tipyng=========//

function typeText(){
		const type=document.querySelector("#typed");

		if (type) {
		let typed = new Typed(type,{
		strings: ["","HTML", "CSS", "SASS", "JAVASCRIPT", "PHP"],
		typeSpeed:100,
		backSpeed:60,
		loop:true,
		shufle:true
		});
		}
}

//=========validar el formulario=============//

function validarFormulario(){
	const nombre=document.querySelector("#nombre");
	const telefono=document.querySelector("#telefono");
	const email=document.querySelector("#email");
	const mensaje=document.querySelector("#msg");

	if(nombre || telefono || email || mensaje){

	nombre.addEventListener("blur", validarCampos);
	telefono.addEventListener("blur", validarCampos);
	email.addEventListener("blur", validarCampos);
	mensaje.addEventListener("blur", validarCampos);
	formulario.addEventListener('submit', enviarEmail); //se toma todo el formulario
	}


}

function enviarEmail(e){
	// console.log("validando");
	e.preventDefault();
	spinner.classList.add("flex");
	spinner.classList.remove("hidden");

	setTimeout(()=>{
		spinner.classList.add('hidden');
		spinner.classList.remove("flex");

		email.name="";
		email.telefono="";
		email.email="";
		email.msg="";

		formulario.reset();

		comprobarEmail();

		const mensajeExito=document.createElement("P");
		mensajeExito.classList.add("exito");
		mensajeExito.textContent="Enviado con exito";

		formulario.appendChild(mensajeExito);

		setTimeout(()=>{
			mensajeExito.remove();
		},3000)
	},3000);
}

//footer 

const year=new Date().getFullYear();

const derechosAuthor=document.querySelector(".derechos-autor");
derechosAuthor.innerHTML=`<span>Todos Los Derechos Reservados &#9426</span> ${year}. Luis Alberto Lozano Rodiguez`;


//validar los campos que estan vacios
function validarCampos(e){
	if(e.target.value.trim()===""){
		mostrarMensaje(`el campo ${e.target.id} esta vacio`, e.target.parentElement);
		email[e.target.name]="";//antes de comprobar email para que se limpie ese campo y ya despues compruebe prque se queda el dato guardado
		comprobarEmail();//en caso de que el usario lo borre
		return;
	}

	const resultado=validarEmail(e.target.value);
	if(e.target.id==="email" && !resultado){
		mostrarMensaje(`el ${e.target.id} no es valido`, e.target.parentElement );
		email[e.target.name]="";//antes de comprobar email para que se limpie ese campo y ya despues compruebe
		comprobarEmail(); //en caso de que el usuario borre el correo o lo ponga mal
		return;
	}

	limpiarAlerta(e.target.parentElement);

	email[e.target.name]=e.target.value.trim().toLowerCase();
	// console.log(email);
	comprobarEmail();
}

function mostrarMensaje(mensaje, referencia){

	limpiarAlerta(referencia);
	const mensajeError=document.createElement("P");
	mensajeError.classList.add("error");
	mensajeError.textContent=mensaje;
	referencia.appendChild(mensajeError);
}

//limpiar la alerta si ya existe
function limpiarAlerta(referencia){
	const alerta=referencia.querySelector(".error");
	if (alerta) {
		alerta.remove();
	}
}

//validar el email
function validarEmail(email){
		const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ //expresion regular en internet para email

		const resultado=regex.test(email);
		// console.log(resultado);
		return resultado;//para que puedas usarlo en el if
}

//comprobar si el objeto esta vacio
function comprobarEmail(e){//no lleva nada por que el email esta como global
	// console.log(email);
	// console.log(Object.values(email).includes(""))
	if(Object.values(email).includes("")){//ya esta y dice que no estan vacios
		// console.log("los campos estan vacios");
		botonFormulario.disabled=true;
		botonFormulario.classList.add("opacity-50");
		return;
	}
	botonFormulario.disabled=false;
	botonFormulario.classList.remove("opacity-50");
}



function interceptarPortafolio(){
	const observador=new IntersectionObserver(llamandoObservador,{
		root:null,
		rootMargin:"0px",
		threshold:0.1
	})

	observador.observe(portafolio);
}

function llamandoObservador(entries, observer){
	entries.forEach(entrie=>{
		if (entrie.isIntersecting) {
			entrie.target.classList.add("visible");
		}
		
	})
}