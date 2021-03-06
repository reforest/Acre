const THREE = require('three');

function Scene() {
  this.shapeX = 0.5;
  this.shapeY = 100;
  this.shapeZ = 100;
  this.shapeColor = 0xffffff;
}

Scene.prototype.init = function init(group) {
  this.scene = new THREE.Scene();
  this.camera();
  this.renderer();
  this.light();
  this.floor();
  this.scene.add(group);
  this.render();
};

Scene.prototype.camera = function camera() {
  this.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 5000 );
  this.camera.position.y = 1000;
  this.camera.position.z = 1000;
  this.camera.position.x = 1000;
  this.camera.updateProjectionMatrix();
  this.camera.lookAt(this.scene.position);
};

Scene.prototype.renderer = function renderer() {
  this.renderer = new THREE.WebGLRenderer({antialias: true});
  this.renderer.setSize( screen.width, window.innerHeight);
  this.renderer.setClearColor( 0x202020 , 1 );
  this.renderer.shadowMap.enabled = true;
  this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  let forest = document.getElementById('forest');
  while (forest.firstChild) {
    forest.removeChild(forest.firstChild);
  }
  forest.appendChild(this.renderer.domElement);
};

Scene.prototype.light = function light() {
  var shadowlight = new THREE.DirectionalLight( 0xffffff, 0.5 );
  shadowlight.position.set( 0, 50, 0 );
  shadowlight.castShadow = true;
  this.scene.add(shadowlight);

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 60, 100, 20 );
  this.scene.add(light);
  
  var backLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
  backLight.position.set( -40, 100, 20 );
  this.scene.add(backLight);
};

Scene.prototype.floor = function floor() {
  var geometry = new THREE.PlaneGeometry( 5000, 5000, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0xE1A95F } );
  this.floor = new THREE.Mesh( geometry, material );
  this.floor.material.side = THREE.DoubleSide;
  this.floor.position.y =-150;
  this.floor.rotation.x = 90*Math.PI/180;
  this.floor.rotation.y = 0;
  this.floor.rotation.z = 0;
  this.floor.doubleSided = true;
  this.floor.receiveShadow = true;
  this.scene.add(this.floor);
};

Scene.prototype.render = function render() {
  requestAnimationFrame(this.render.bind(this));
  this.renderer.render(this.scene, this.camera);
};

module.exports = {Scene : Scene};