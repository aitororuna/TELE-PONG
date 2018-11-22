//Variables globales
var bucle;
var movimiento = 5;
var canvas = document.getElementById("canvas");
var areaW = canvas.width;
var areaH = canvas.height;
var ctx = canvas.getContext("2d"); 
var puntosj1 = 0;
var puntosj2 = 0;
var tamanoBarra = 50;
var superficie = areaH-tamanoBarra;
var gelditu = 0;

//Clases
class Base {
	choque(obj){
		if(this.FondoDeLaBarra < obj.y || this.y > obj.FondoDeLaBarra || this.DerechaBarra < obj.x || this.x > obj.DerechaBarra){
			return false;
		} else {
			return true;
		}
	}
}
class Puntos { //colocar marcador
	constructor(x){
		this.x = x;
		this.y = 35;
		this.punto = 0;
	}
	dibujar(){
		ctx.font = "38px Cursiva";
        ctx.fillText(this.punto.toString(), this.x, this.y);  //marcador
	}
}
class Bola extends Base {
	constructor(){
		super();
		this.velocidad;
		this.t = 15;       
		this.x =  canvas.width/2;
		this.y = canvas.height/2;
		this.xdir = movimiento;
		this.ydir = movimiento;
		this.p1 = new Puntos(25);  //separación marcador (x)
		this.p2 = new Puntos(560);
	}
	choqueV(){
		if(this.y <= 15 || this.y >= (285)){
			this.ydir = -this.ydir;
		}
	}
	choqueH(){
		if(this.x <= 0){
			this.xdir = -this.xdir;
            puntosj2++;
			this.p2.punto = puntosj2;			//actualizar marcador
			this.x = canvas.width/2;
			this.y = canvas.height/2;
			gelditu = 1;
		}
			if(this.x >= (585)){
			this.xdir = -this.xdir;
			puntosj1++;
			this.p1.punto = puntosj1;
			this.x = canvas.width/2;
			this.y = canvas.height/2;
			gelditu = 1;
		}
		
	}
	
	mover(){
		this.x+=this.xdir;
		this.y+=this.ydir;
		this.FondoDeLaBarra = this.y+this.t;
		this.DerechaBarra = this.x+this.t;
		this.choqueV();
		this.choqueH();
	}
	dibujar(){ //pelota, puntos
		ctx.fillRect(this.x, this.y, this.t, this.t);  
		this.p1.dibujar();
		this.p2.dibujar();
	}
}

class Barra extends Base {
	constructor(x){
		super();
		this.x = x;
		this.w = 10;
		this.h = tamanoBarra;
		this.y = Math.floor(Math.random() * superficie);
		this.dir = 0;
	}
	dibujar(){
		ctx.fillRect(this.x,this.y,this.w,this.h);
	}
	mover(){
		this.y+=this.dir;
		this.DerechaBarra = this.w+this.x;
		this.FondoDeLaBarra = this.h+this.y;
		if(this.y <= 0){
			this.y = 0;
			this.dir = 0;
		}
		if(this.y >= superficie){
			this.y = superficie;
			this.dir = 0;
		}
	}
}

//objetos
var bola = new Bola();
var jugador1 = new Barra(0);
var jugador2 = new Barra(590);

//funciones de control
function moverBarras(event){
	var tecla = event.keyCode;
	if(tecla == 38){           //codigo flecha arriba
        jugador2.dir = -movimiento;
    }
	if(tecla == 40){           //flecha abajo
		jugador2.dir = movimiento;
	}
	if(tecla == 87){           // W
		jugador1.dir = -movimiento;
	}
	if(tecla == 83){           // S
		jugador1.dir = movimiento;
	}
	if(tecla == 80){
		gelditu = 0;
	}
}

function choque(){
	if(bola.choque(jugador1) || bola.choque(jugador2)){
		bola.xdir = -bola.xdir*1.10;
	}
}
//funciones globales
function dibujar(){
	ctx.clearRect(0,0,areaW, areaH);        //borrar los movimientos anteriormente realizados
	bola.dibujar();
	jugador1.dibujar();
	jugador2.dibujar();
	
}
function frame(){
	if(gelditu == 0){
	bola.mover();
	}
	jugador1.mover();
	jugador2.mover();
	dibujar();
	choque();
	bucle=requestAnimationFrame(frame);
}
function iniciar(){
	var modal = document.getElementById("modal");
	modal.style.display = "none";
	frame();
}

