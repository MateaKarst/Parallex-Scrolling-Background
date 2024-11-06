const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width = 800;
const canvasHeight = canvas.height = 700;
let gameSpeed = 10;

const Layer1 = new Image();
Layer1.src = "images/layer-1.png";
const Layer2 = new Image();
Layer2.src = "images/layer-2.png";
const Layer3 = new Image();
Layer3.src = "images/layer-3.png";
const Layer4 = new Image();
Layer4.src = "images/layer-4.png";
const Layer5 = new Image();
Layer5.src = "images/layer-5.png";

window.addEventListener("load", function(){
    const slider = document.getElementById("slider");
    slider.value = gameSpeed;
    const showGameSpeed = document.getElementById("showGameSpeed");
    console.log(showGameSpeed)
    showGameSpeed.innerHTML = gameSpeed;
    slider.addEventListener("change", function (e) {
        gameSpeed = e.target.value;
        showGameSpeed.innerHTML = e.target.value;
    });
    
    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update() {
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= -this.width) {
                this.x = this.width + this.x - this.speed;
            };
    
            this.x = Math.floor(this.x - this.speed);
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }
    
    const layer1 = new Layer(Layer1, 0.2);
    const layer2 = new Layer(Layer2, 0.4);
    const layer3 = new Layer(Layer3, 0.6);
    const layer4 = new Layer(Layer4, 0.8);
    const layer5 = new Layer(Layer5, 1);
    
    const gameLayers = [layer1, layer2, layer3, layer4, layer5];
    
    
    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
        gameLayers.forEach(layer => {
            layer.update();
            layer.draw();
        })
        requestAnimationFrame(animate);
    };
    animate();
});