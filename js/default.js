 var windowWidth = window.innerWidth,
     windowHeight = window.innerHeight;
 var camera, renderer, scene;

var mesh1, mesh2, mesh3, mesh4;
var newMeshReady = false;
var sizeMesh1 = 11;
var sizeMesh2 = 19;
var sizeMesh3 = 24;
var sizeMesh4 = 28;
var radius1 = 3;
var radius2x = 12;
var radius2z = 10;
var omega1 =  1.032;
var omega2 = -3.729;
var xx = 0.5;
var yy = 0.1;
var zz = 0.1;

 head.ready(function() {
     Init();
     animate();
 });

 function Init() {
     scene = new THREE.Scene();

     //setup camera
     camera = new LeiaCamera({
         cameraPosition: new THREE.Vector3(_camPosition.x, _camPosition.y, _camPosition.z),
         targetPosition: new THREE.Vector3(_tarPosition.x, _tarPosition.y, _tarPosition.z)
     });
     scene.add(camera);


     //setup rendering parameter
     renderer = new LeiaWebGLRenderer({
         antialias: true,
         renderMode: _renderMode,
         shaderMode: _nShaderMode,
         colorMode: _colorMode,
         compFac:_depthCompressionFactor,
         devicePixelRatio: 1
     });
     renderer.Leia_setSize({
         width: windowWidth,
         height: windowHeight,
         autoFit: true
     });
     document.body.appendChild(renderer.domElement);

     //add object to Scene
     addObjectsToScene();

     //add Light
     addLights();

     //add Gyro Monitor
     //addGyroMonitor();
 }

 function animate() {
     requestAnimationFrame(animate);
    // renderer.setClearColor(new THREE.Color().setRGB(1.0, 1.0, 1.0));
   
   //LEIA.time = 2.6;
	if (newMeshReady) {

		//mesh1.position.set(0, 0, 2); 
//		mesh1.position.set(0, 0, 0); 
		//mesh1.rotation.x = omega1*0.3;
		//mesh1.rotation.y = Math.sin(omega1*1.3)/3;
		//mesh1.rotation.y = 0.4+0.15*Math.cos(omega1*LEIA.time);
//		mesh1.rotation.y = 2.0*(omega1*LEIA.time);
		//mesh1.rotation.y = 0.4+0.15*omega1*LEIA.time;
//		mesh1.rotation.z = -Math.sin(omega1*LEIA.time)*0.8;
		//mesh1.rotation.z = -(omega1*LEIA.time)*0.8;
		//var xc = Math.cos(omega1*LEIA.time);
		//var xs = Math.sin(omega1*LEIA.time);
		//mesh2.position.set(-14*xc, 1+1.5*xs*xs+5*(0.8+xc*xc)*xs, -0*xc);
		//mesh2.position.set(-14*Math.cos(omega1*LEIA.time), (1+(Math.cos(omega1*LEIA.time))*3*Math.sin(omega1*LEIA.time), -3*Math.cos(omega1*LEIA.time));
		//mesh2.rotation.set(Math.cos(omega1*LEIA.time), Math.sin(omega1*LEIA.time), Math.cos(omega1*LEIA.time));
//		mesh2.rotation.set((omega1*LEIA.time), (omega1*LEIA.time), (omega1*LEIA.time));
		//console.log(mesh2.position);
	//	mesh1.rotation.x = omega1*LEIA.time;
	//	mesh1.rotation.y = Math.sin(omega1/2*LEIA.time)/3;
		var zpos = 2;
		var zpos1 = zpos;
		var zpos2 = zpos;
		var zpos3 = zpos;
		var zpos4 = zpos;
		mesh1.position.set(0, 4.6, zpos1);
		mesh2.position.set(0, -1.6, zpos2);
		mesh3.position.set(0, 0, zpos3);
		mesh4.position.set(0, 0, zpos4);
		mesh1.rotation.y = 2*LEIA.time;
		mesh2.rotation.y = -2*LEIA.time;
		//mesh3.rotation.set(2*LEIA.time, 2*LEIA.time, 2*LEIA.time);
		//mesh4.rotation.set(-2*LEIA.time, -2*LEIA.time, -2*LEIA.time);

	}
     renderer.Leia_render({
         scene: scene,
         camera: camera,
         holoScreenSize: _holoScreenSize,
         holoCamFov: _camFov,
         upclip: _up,
         downclip: _down,
         filterA: _filterA,
         filterB: _filterB,
         filterC: _filterC,
         messageFlag: _messageFlag
     });
 }

 function addObjectsToScene() {
     //Add your objects here
     readSTLs('resource/VW_v.stl', 'resource/VW_w.stl', 'resource/VW_ring1.stl', 'resource/VW_ring2.stl'); 
 }

 function addLights() {
     //Add Lights Here
     var xl = new THREE.DirectionalLight(0x555555);
     xl.position.set(1, 0, 2);
     scene.add(xl);
     var pl = new THREE.PointLight(0x111111);
     pl.position.set(-20, 10, 20);
     scene.add(pl);
     var ambientLight = new THREE.AmbientLight(0x111111);
     scene.add(ambientLight);
 }

function readSTLs(filename1, filename2, filename3, filename4) 
{
	var xhr1 = new XMLHttpRequest();
	xhr1.onreadystatechange = function () {
	if ( xhr1.readyState == 4 ) {
		if ( xhr1.status == 200 || xhr1.status == 0 ) {
			var rep = xhr1.response; // || xhr1.mozResponseArrayBuffer;
			mesh1 = parseStlBinary(rep, 0xff0000);
			mesh1.scale.set(sizeMesh1, sizeMesh1, sizeMesh1);
			scene.add(mesh1);
			newMeshReady = true;
			}
		}
	};
	xhr1.onerror = function(e) {
		console.log(e);
	};
	xhr1.open( "GET", filename1, true );
	xhr1.responseType = "arraybuffer";
	xhr1.send( null );
	
	var xhr2 = new XMLHttpRequest();
	xhr2.onreadystatechange = function () {
	if ( xhr2.readyState == 4 ) {
		if ( xhr2.status == 200 || xhr2.status == 0 ) {
			var rep = xhr2.response; // || xhr2.mozResponseArrayBuffer;
			//mesh2 = parseStlBinary(rep, 0xff0000);
			mesh2 = parseStlBinary(rep, 0xff00ff);
			mesh2.scale.set(sizeMesh2, sizeMesh2, sizeMesh2);
			scene.add(mesh2);
			newMeshReady = true;
			}
		}
	};
	xhr2.onerror = function(e) {
		console.log(e);
	};
	xhr2.open( "GET", filename2, true );
	xhr2.responseType = "arraybuffer";
	xhr2.send( null );

	var xhr3 = new XMLHttpRequest();
	xhr3.onreadystatechange = function () {
	if ( xhr3.readyState == 4 ) {
		if ( xhr3.status == 200 || xhr3.status == 0 ) {
			var rep = xhr3.response; // || xhr3.mozResponseArrayBuffer;
			mesh3 = parseStlBinary(rep, 0x00ffff);
			mesh3.scale.set(sizeMesh3, sizeMesh3, sizeMesh3);
			scene.add(mesh3);
			newMeshReady = true;
			}
		}
	};
	xhr3.onerror = function(e) {
		console.log(e);
	};
	xhr3.open( "GET", filename3, true );
	xhr3.responseType = "arraybuffer";
	xhr3.send( null );
	
	var xhr4 = new XMLHttpRequest();
	xhr4.onreadystatechange = function () {
	if ( xhr4.readyState == 4 ) {
		if ( xhr4.status == 200 || xhr4.status == 0 ) {
			var rep = xhr4.response; // || xhr4.mozResponseArrayBuffer;
			mesh4 = parseStlBinary(rep, 0xffff00);
			mesh4.scale.set(sizeMesh4, sizeMesh4, sizeMesh4);
			scene.add(mesh4);
			newMeshReady = true;
			}
		}
	};
	xhr4.onerror = function(e) {
		console.log(e);
	};
	xhr4.open( "GET", filename4, true );
	xhr4.responseType = "arraybuffer";
	xhr4.send( null );
}