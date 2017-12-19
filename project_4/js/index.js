var pointMap = function() {
    var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        color = '#DBDBDB',
        dotColor = '#F5FBFF';
    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.backgroundColor = '#3B3B3B';
    ctx.lineWidth = .5;
    ctx.strokeStyle = color;
    ctx.fillStyle = dotColor;
    
    var mouse = {
        x:30 * canvas.width/100,
        y:30 * canvas.width/100
    };
    
    var points = {
        nb:600,
        distance: 60,
        d_radius: 50,
        array:[]
    };
    
    function Point(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        
        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();
        this.radius = Math.random();
    }

    Point.prototype = {
        create: function(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        },

        animate: function(){
            for(i = 0; i < points.nb; i++){

                var point = points.array[i];

                if(point.y < 0 || point.y > canvas.height){
                    point.vx = point.vx;
                    point.vy = - point.vy;
                }
                else if(point.x < 0 || point.x > canvas.width){
                    point.vx = - point.vx;
                    point.vy = point.vy;
                }
                point.x += point.vx;
                point.y += point.vy;
            }
        },

        line: function(){
            for(i = 0; i < points.nb; i++){
                for(j = 0; j < points.nb; j++){
                    i_point = points.array[i];
                    j_point = points.array[j];

                    if((i_point.x - j_point.x) < points.distance && (i_point.y - j_point.y) < points.distance && (i_point.x - j_point.x) > - points.distance && (i_point.y - j_point.y) > - points.distance){
                        
                        if((i_point.x - mouse.x) < points.d_radius && (i_point.y - mouse.y) < points.d_radius && (i_point.x - mouse.x) > - points.d_radius && (i_point.y - mouse.y) > - points.d_radius){
                            
                            ctx.beginPath();
                            ctx.moveTo(i_point.x, i_point.y);
                            ctx.lineTo(j_point.x, j_point.y);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            }
        }
    };

    function makePoints(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(i = 0; i < points.nb; i++){
            points.array.push(new Point());
            point = points.array[i];

            point.create();
        }

        point.line();
        point.animate();
    }

    window.onmousemove = function(parameter) {
        mouse.x = parameter.pageX;
        mouse.y = parameter.pageY;
    }

    mouse.x = window.innerWidth / 10;
    mouse.y = window.innerHeight / 10;

    setInterval(makePoints, 1000/30);
};

window.onload = function() {
    pointMap();
};