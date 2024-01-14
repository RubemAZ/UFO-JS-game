let screenW,screenH,screenMessage,frames;

let ForceFieldLife,ForceFieldBar;

let playerDirectionY,playerDirectionX,player,playerSpeed,
playerInitialPositionX,playerInitialPositionY,playerOnOff;

let lightningSpeed;

let rocketCounter,rocketCounterPanel,rocketSpeed,
rocketLaunchInterval,rocketsTotal;

let shockExplosion,shockSound;


const keyDowN = (event) =>{
	let key=event.keyCode;
	if(key==38){//move up
		playerDirectionY=-1;
	}else if(key==40){//move down
		playerDirectionY=1;
	}
	if(key==37){//move left
		playerDirectionX=-1;
	}else if(key==39){//move right
		playerDirectionX=1;
	}
	if(key==32){// space = lightningshot
		lightningLauncher(playerInitialPositionX+17,playerInitialPositionY);
	}
}

const keyUP = (event) =>{
	let key=event.keyCode;
	if((key==38)||(key==40)){
		playerDirectionY=0;
	}
	if((key==37)||(key==39)){
		playerDirectionX=0;
	}
}

const rocketLauncher = () =>{
	if(playerOnOff){
		let y=0;
		let x=Math.random()*screenW;
		let rocket=document.createElement("div");
		let attributeClass=document.createAttribute("class");
		let attributeStyle=document.createAttribute("style");
		attributeClass.value="rocket";
		attributeStyle.value="bottom:" + y + "px; left: " + x + "px;";
		rocket.setAttributeNode(attributeClass);
		rocket.setAttributeNode(attributeStyle);
		document.body.appendChild(rocket);
		rocketCounter--;
	}
}

const rocketControls = () =>{
	rocketsTotal=document.getElementsByClassName("rocket");
	let rocketsTotalArray=rocketsTotal.length;
	for(let index = 0; index < rocketsTotalArray; index++){
		if(rocketsTotal [index] ){
			let  indexPosition=rocketsTotal [index] .offsetTop;
			 indexPosition-=rocketSpeed;
			rocketsTotal[index].style.top= indexPosition+"px";
			if( indexPosition<=0){
				ForceFieldLife-=40;
				shockMaker(2,rocketsTotal[index].offsetLeft,null);
				rocketsTotal[index].remove();
			}
		}
	}
}

const lightningLauncher = (x,y) =>{
	let t=document.createElement("div");
	let attributeClass=document.createAttribute("class");
	let attributeStyle=document.createAttribute("style");
	attributeClass.value="playersLightningShot";
	attributeStyle.value="top:"+y+"px;left:"+x+"px";
	t.setAttributeNode(attributeClass);
	t.setAttributeNode(attributeStyle);
	document.body.appendChild(t);
}

const lightningShotsController = () =>{
	let lightningShots=document.getElementsByClassName("playersLightningShot");
	let rocketsTotalArray=lightningShots.length;
	for(let index = 0; index < rocketsTotalArray; index++){
		if(lightningShots[index]){ 
			let lightningPosition=lightningShots[index].offsetTop;
			lightningPosition+=lightningSpeed;
			lightningShots[index].style.top=lightningPosition+"px";
			rocketLightningShotShock(lightningShots[index]);
			if(lightningPosition>900){
				lightningShots[index].remove();
			}
		}
	}
}

const rocketLightningShotShock = (lightShot) =>{
	let rocketsTotalArray=rocketsTotal.length;
	for(let index = 0; index < rocketsTotalArray; index++){
		if(rocketsTotal[index]){
			if(
				(
					(lightShot.offsetTop<=(rocketsTotal[index].offsetTop+40))&& //Cima lightShot com baixo rocket
					((lightShot.offsetTop+6)>=(rocketsTotal[index].offsetTop)) //Baixo lightShot com cima rocket
				)
				&&
				(
					(lightShot.offsetLeft<=(rocketsTotal[index].offsetLeft+40))&& //Esquerda lightShot com direita rocket
					((lightShot.offsetLeft+40)>=(rocketsTotal[index].offsetLeft)) //Direita lightShot  com esquerda rocket
				)
			){
				shockMaker(1,rocketsTotal[index].offsetLeft-25,rocketsTotal[index].offsetTop);
				rocketsTotal[index].remove();
				lightShot.remove();
			}
		}
	}
}

const shockMaker =(tipo,x,y) =>{ //Tipo 1=AR, 2=TERRA
	if(document.getElementById("explosion"+(shockExplosion-4))){
		document.getElementById("explosion"+(shockExplosion-4)).remove();
	}
	let explosion=document.createElement("div");
	let img=document.createElement("img");
	let sound=document.createElement("audio");
	//Atributos para div
	let attributeClass=document.createAttribute("class");
	let attributeStyle=document.createAttribute("style");
	let attributeId=document.createAttribute("id");
	//Atributo para imagem
	let attributeImgLightningRocketShock=document.createAttribute("src");
	//Atributos para audio
	let attributeSound=document.createAttribute("src");
	let attributeSoundId=document.createAttribute("id");

	attributeId.value="explosion"+shockExplosion;
	if(tipo==1){
		attributeClass.value="lightningRocketShock";
		attributeStyle.value="top:" + y + "px; left:" + x + "px;";
		attributeImgLightningRocketShock.value="explosion_ar.gif?"+new Date();
	}else{
		attributeClass.value="topShock";
		attributeStyle.value="top:" + (screenH-57) + "px; left:" + (x-17) + "px;";
		attributeImgLightningRocketShock.value="explosion_chao.gif?"+new Date();
	}
	attributeSound.value="flames.mp3?"+new Date();
	attributeSoundId.value="sound"+shockSound;
	explosion.setAttributeNode(attributeClass);
	explosion.setAttributeNode(attributeStyle);
	explosion.setAttributeNode(attributeId);
	img.setAttributeNode(attributeImgLightningRocketShock);
	sound.setAttributeNode(attributeSound);
	sound.setAttributeNode(attributeSoundId);
	explosion.appendChild(img);
	explosion.appendChild(sound);
	document.body.appendChild(explosion);
	document.getElementById("sound"+shockSound).play();
	shockExplosion++;
	shockSound++;
}

const playerController = () =>{
	playerInitialPositionY+=playerDirectionY*playerSpeed;
	playerInitialPositionX+=playerDirectionX*playerSpeed;
	player.style.top=playerInitialPositionY+"px";
	player.style.left=playerInitialPositionX+"px";
}

const gameManager = () =>{
	ForceFieldBar.style.width=ForceFieldLife+"px";
	if(rocketCounter <= 0){
		playerOnOff=false;
		clearInterval(rocketLaunchInterval);

		screenMessage.style.backgroundImage="url('winback.gif')";
		screenMessage.style.display="block";
		screenMessage.style.width = '100%';
		screenMessage.style.backgroundPosition = 'center center';

		const interval = window.setTimeout(function () {
			console.log('interval...')
			screenMessage.style.backgroundImage=null;
		}, 2000)

		window.clearInterval(interval)
		screenMessage.style.backgroundImage=null;

	}
	if(ForceFieldLife<=0){
		playerOnOff=false;
		clearInterval(rocketLaunchInterval);
		screenMessage.style.backgroundImage="url('lose.gif')";
		screenMessage.style.display="block";
		screenMessage.style.width = '100%';
		screenMessage.style.backgroundPosition = 'center center'		
	}
}

const gameLoop = () =>{
	if(playerOnOff){
		//FUNÇÕES DE CONTROLE
		playerController();
		lightningShotsController();
		rocketControls();
	}
	gameManager();
	frames=requestAnimationFrame(gameLoop);
}

const restart = () =>{
	rocketsTotal=document.getElementsByClassName("rocket");
	let rocketsTotalArray=rocketsTotal.length;
	for(let index = 0; index < rocketsTotalArray; index++){
		if(rocketsTotal[index]){
			rocketsTotal[index].remove();
		}
	}

	screenMessage.style.display="none";
	clearInterval(rocketLaunchInterval);
	cancelAnimationFrame(frames);
	ForceFieldLife=screenW;
	playerInitialPositionX=screenW/2;
	playerInitialPositionY=screenH/5;
	player.style.top=playerInitialPositionY+"px";
	player.style.left=playerInitialPositionX+"px";
	rocketCounter=10;
	playerOnOff=true;
	rocketLaunchInterval=setInterval(rocketLauncher,1700);
	gameLoop();
}

const start = () =>{
	playerOnOff=false;

	//Ini Tela
	screenH=window.innerHeight;
	screenW=window.innerWidth;

	//Ini Jogador
	playerDirectionX=playerDirectionY=0;
	playerInitialPositionX=screenW/2;
	playerInitialPositionY=screenH/5;
	playerSpeed=lightningSpeed=5;
	player=document.getElementById("naveJog");
	player.style.top=playerInitialPositionY+"px";
	player.style.left=playerInitialPositionX+"px";

	//Controles das rockets
	rocketCounter=60;
	rocketSpeed=3;
	
	//Controles do planeta
	ForceFieldLife=screenW;
	ForceFieldBar=document.getElementById("ForceFieldBar");
	ForceFieldBar.style.width=ForceFieldLife+"px";

	//Controles de explosão
	shockExplosion=shockSound=0;

	//Telas
	screenMessage=document.getElementById("screenMessage");
	screenMessage.style.backgroundImage="url('intro.png')";
	screenMessage.style.display="block";
	document.getElementById("buttonStart").addEventListener("click",restart);

}

window.addEventListener("load",start);
document.addEventListener("keydown",keyDowN);
document.addEventListener("keyup",keyUP);