// modules.define('wave',

// ['i-bem-dom', 'BEMHTML', 'jquery', 'loader_type_js'],

// function(provide, bemDom, BEMHTML, $, loader,) {

// provide(Wave.declMod({ modName: 'canvas', modVal: true }, {
//     onSetMod: {
//         js: {
//             inited: function() {



//                 loader('https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenMax.min.js', function(){

//                     var canvas = document.getElementById("canvas");
//                     var context = canvas.getContext("2d");
//                     var resolution = window.devicePixelRatio || 1;

//                     var waves = [];
//                     var resized = false;

//                     var vw, vh;
//                     resizeCanvas();


//                     var gradient1 = context.createLinearGradient(-200, 250, 100, -100);
//                     gradient1.addColorStop(0, '#FF00F1');
//                     gradient1.addColorStop(1, '#FF005D');

//                     var gradient2 = context.createLinearGradient(200, -200, -200, 200);
//                     gradient2.addColorStop(0, '#FF4CCF');
//                     gradient2.addColorStop(1, '#FF0000');

//                     var wave1 = createWave(context, {
//                       amplitude: 50,
//                       duration: 4,
//                       fillStyle: gradient1,
//                       frequency: 2.5,
//                       width: vw,
//                       height: vh * 2,
//                       segments: 100,
//                       waveHeight: vh * 0.10,
//                       opacity: 0.5
//                     });

//                     var wave2 = createWave(context, {
//                       amplitude: 100,
//                       duration: 2,
//                       fillStyle: gradient2,
//                       frequency: 1.5,
//                       width: vw,
//                       height: vh,
//                       segments: 100,
//                       waveHeight: vh * 0.10,
//                       opacity: 1
//                     });

//                     waves.push(wave1, wave2);

//                     TweenMax.to(waves, 10, {
//                       waveHeight: vh * 0.25,
//                       ease: Sine.easeInOut,
//                       repeat: -1,
//                       repeatDelay: 1,
//                       yoyo: true
//                     });

//                     TweenMax.to(wave1, 6, {
//                       amplitude: 10,
//                       ease: Sine.easeInOut,
//                       repeat: -1,
//                       yoyo: true
//                     });

//                     TweenMax.to(wave2, 7, {
//                       amplitude: 25,
//                       ease: Sine.easeInOut,
//                       repeat: -1,
//                       yoyo: true
//                     });

//                     window.addEventListener("resize", function() {
//                       resized = true;
//                     });

//                     TweenLite.ticker.addEventListener("tick", update);

//                     function update() {

//                       var len = waves.length;

//                       if (resized) {

//                         resizeCanvas();

//                         for (var i = 0; i < len; i++) {
//                           waves[i].resize(vw, vh);
//                         }

//                         resized = false;
//                       }

//                       context.clearRect(0, 0, vw, vh);
//                       context.globalCompositeOperation = "soft-light";

//                       for (var i = 0; i < len; i++) {
//                         waves[i].draw();
//                       }
//                     }

//                     function createWave(context, options) {

//                       options = options || {};

//                       // API
//                       var wave = {

//                         // Properties
//                         amplitude: options.amplitude || 200,
//                         context: context,
//                         curviness: options.curviness || 0.75,
//                         duration: options.duration || 2,
//                         fillStyle: options.fillStyle || "rgba(33,150,243,1)",
//                         frequency: options.frequency || 4,
//                         height: options.height || 600,
//                         points: [],
//                         opacity: options.opacity || 1,
//                         segments: options.segments || 100,
//                         tweens: [],
//                         waveHeight: options.waveHeight || 300,
//                         width: options.width || 800,
//                         x: options.x || 0,
//                         y: options.y || 0,

//                         // Methods
//                         init: init,
//                         resize: resize,
//                         draw: draw,
//                         kill: kill
//                       };

//                       init();

//                       function kill() {

//                         var tweens = wave.tweens;
//                         var len = tweens.length;

//                         for (var i = 0; i < len; i++) {
//                           tweens[i].kill();
//                         }

//                         tweens.length = 0;
//                         wave.points.length = 0;
//                       }

//                       function init() {

//                         kill();

//                         var segments = wave.segments;
//                         var interval = wave.width / segments;

//                         for (var i = 0; i <= segments; i++) {

//                           var norm = i / segments;
//                           var point = {
//                             x: wave.x + i * interval,
//                             y: 1
//                           };

//                           var tween = TweenMax.to(point, wave.duration, {
//                             y: -1,
//                             repeat: -1,
//                             yoyo: true,
//                             ease: Sine.easeInOut
//                           }).progress(norm * wave.frequency)

//                           wave.tweens.push(tween);
//                           wave.points.push(point);
//                         }
//                       }

//                       function draw() {

//                         var points = wave.points;
//                         var len = points.length;

//                         var startY = wave.waveHeight;
//                         var height = wave.amplitude / 2;

//                         context.beginPath();
//                         context.moveTo(points[0].x, startY + points[0].y * height);

//                         for (var i = 1; i < len; i++) {

//                           var point = points[i];
//                           context.lineTo(point.x, startY + point.y * height);
//                         }

//                         context.lineTo(wave.x + wave.width, wave.y + wave.height);
//                         context.lineTo(wave.x, wave.y + wave.height);
//                         context.closePath();
//                         context.fillStyle = wave.fillStyle;
//                         context.opacity = wave.opacity;
//                         context.fill();
//                       }

//                       function resize(width, height) {

//                         wave.width = width;
//                         wave.height = height;

//                         var points = wave.points;
//                         var len = points.length;
//                         var interval = wave.width / wave.segments;

//                         for (var i = 0; i < len; i++) {

//                           var point = points[i];
//                           point.x = wave.x + i * interval;
//                         }
//                       }

//                       return wave;
//                     }

//                     function resizeCanvas() {

//                       vw = window.innerWidth;
//                       vh = window.innerHeight;

//                       canvas.width  = vw * resolution;
//                       canvas.height = vh * resolution;

//                       canvas.style.width  = vw + "px";
//                       canvas.style.height = vh + "px";

//                       context.scale(resolution, resolution);
//                     }

//                   })

//               }
//           }
//       }
//     }));

// });
