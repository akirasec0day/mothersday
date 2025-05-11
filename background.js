document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('love-canvas');
    const ctx = canvas.getContext('2d');
    

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    

    const symbols = [];
    const symbolTypes = ['❤️', '🌸', '💖', '🌷', '💕', '🌹'];
    const colors = ['#ff69b4', '#ff85a2', '#ffb6c1', '#ffc0cb', '#ffd1dc', '#ffebee'];
    

    class LoveSymbol {
        constructor() {
            this.type = symbolTypes[Math.floor(Math.random() * symbolTypes.length)];
            this.size = Math.random() * 20 + 10;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.speedY = Math.random() * 1 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.angle = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 2;
            this.opacity = Math.random() * 0.7 + 0.3;
        }
        
        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.angle += this.rotationSpeed;
            

            if (this.y < -this.size) {
                this.y = canvas.height + this.size;
                this.x = Math.random() * canvas.width;
            }
            

            if (this.x < -this.size) {
                this.x = canvas.width + this.size;
            } else if (this.x > canvas.width + this.size) {
                this.x = -this.size;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle * Math.PI / 180);
            ctx.globalAlpha = this.opacity;
            ctx.font = `${this.size}px Arial`;
            ctx.fillStyle = this.color;
            ctx.fillText(this.type, 0, 0);
            ctx.restore();
        }
    }
    

    function init() {
        for (let i = 0; i < 50; i++) {
            symbols.push(new LoveSymbol());
        }
    }
    

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < symbols.length; i++) {
            symbols[i].update();
            symbols[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    init();
    animate();
});