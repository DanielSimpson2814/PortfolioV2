$(document).ready(function() {

  function burgerZ (){
    var wWidth = $(window).width();

    if (wWidth <= 827){

      $("nav.top-nav").removeClass("init-top-nav");
      $("nav.top-nav").removeClass("full-top-nav");

      $("div.hamburger").on("click", function(){
        $("nav.top-nav").toggleClass("full-top-nav");
      });

    } else if (wWidth > 827) {

      $("nav.top-nav").removeClass("full-top-nav");
      $("nav.top-nav").addClass("init-top-nav");

    }

    $("nav.top-nav").removeClass("init-top-nav");

  }
  burgerZ();

// HOME PAGE
  // HAMBURGER
  if (window.location.pathname === "/home.html") {

    $(window).scroll(function(){
      var wScroll = $(this).scrollTop();
      if(wScroll >= 746){
        $(".hamburger .line").css("background", "#000");
      }
      if(wScroll <= 745){
        $(".hamburger .line").css("background", "#fff");

      }
    });
  }

  function smallDevPageLoader (){
    var wWidth = $(window).width();
    if (wWidth <= 1024){
      $("a.dev").attr("href", "development.html");
    } else {
      $("a.dev").attr("href", "dev.html");
    }
  }
  smallDevPageLoader();
  // $(window).resize(smallDevPageLoader);


  function imageLoader (){
    var wWidth = $(window).width();
    if (wWidth < 601){
      $("#home-header img").attr("src", "/images/wood-coffee-iphone-notebook-600-400.png");
    }
    if (wWidth >= 601){
      $("#home-header img").attr("src", "/images/wood-coffee-iphone-notebook.png");
    }
  }
  imageLoader();
  $(window).resize(imageLoader);

//DESIGN PAGE
  // DYNAMIC MODAL
  $('figure').on('click', function () {
    var image = $(this).children().attr('src');
    $('#myModal').on('show.bs.modal', function () {
        $(".img-responsive").attr("src", image);
    });
  });


// DEVELOPMENT PAGE
  //Nav
  $("#fade-nav").hide();
  $(".top-nav").css("background", "rgba(0, 0, 0, 0)");
  $(".hamburger").click(function(){
    $(this).toggleClass("is-active");
    if ($(this).hasClass("is-active")){
      $("#fade-nav").fadeIn("slow");
      $(".top-nav").css("background", "rgba(0, 0, 0, 0.5)");    // was white

    } else {
      $("#fade-nav").hide();
      $(".top-nav").css("background", "rgba(0, 0, 0, 0)");
    }
// Home Page
  // Nav colors invert
    var wScroll = $(window).scrollTop();
    if ($(this).hasClass("is-active") && wScroll >= 746){
      $("nav.top-nav").css("background", "rgba(0, 0, 0, 0.5)");
      // $("nav.top-nav .links ul li a").css("color", "#fff");
    }

    if ($(this).hasClass("is-active") && wScroll <= 745){
      $("nav.top-nav").css("background", "rgba(0, 0, 0, 0.5)");     //was white
      // $("nav.top-nav .links ul li a").css("color", "#fff");     //was black
    }
  });



// CONTACT PAGE
  // CONTACT PARALLAX CLICK scrolling
  var form = $("#fixedContainer").position();
  $("#slide .scroll-cta .jsScroll").click(function(){
    $("html, body").animate({
      scrollTop: 3000
    }, 2000);
    return false;
  });



  //DEV PAGE ITSELF
  var pages = $(".page").length,
      scrolling = false,
      curPage = 1;

  function pagination(page, movingUp) {
    scrolling = true;
    var diff = curPage - page,
        oldPage = curPage;
    curPage = page;
    $(".page").removeClass("active small previous");
    $(".page-" + page).addClass("active");
    $(".nav-btn").removeClass("active");
    $(".nav-page" + page).addClass("active");
    if (page > 1) {
      $(".page-" + (page - 1)).addClass("previous");
      if (movingUp) {
        $(".page-" + (page - 1)).hide();
        var hackPage = page;
        setTimeout(function() {
          $(".page-" + (hackPage - 1)).show();
        }, 600);
      }
      while (--page) {
        $(".page-" + page).addClass("small");
      }
    }
    console.log(diff)
    if (diff > 1) {
      for (var j = page + 1; j < oldPage; j++) {
        $(".page-" + j + " .half").css("transition", "transform .7s ease-out");
      }
    }
    setTimeout(function() {
      scrolling = false;
      $(".page .half").attr("style", "");
      $(".page")
    }, 700);

    // HAMBURGER COLOR INVERTER for DEV
    if (curPage == 2 || curPage == 4){
      $("#hamburger-6 .line").css("background", "black");
      $(".logo a").css("color", "white");
    } else if (curPage == 1 || curPage == 3){
      $("#hamburger-6 .line").css("background", "white");
      $(".logo a").css("color", "black");
    }


  }




  function navigateUp() {
    if (curPage > 1) {
      curPage--;
      pagination(curPage, true);
    }
  }

  function navigateDown() {
    if (curPage < pages) {
      curPage++;
      pagination(curPage);
    }
  }

  $(document).on("mousewheel DOMMouseScroll", function(e) {
    if (!scrolling) {
      if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
        navigateUp();
      } else {
        navigateDown();
      }
    }
  });

  $(document).on("click", ".scroll-btn", function() {
    if (scrolling) return;
    if ($(this).hasClass("up")) {
      navigateUp();
    } else {
      navigateDown();
    }
  });

  $(document).on("keydown", function(e) {
    if (scrolling) return;
    if (e.which === 38) {
      navigateUp();
    } else if (e.which === 40) {
      navigateDown();
    }
  });

  $(document).on("click", ".nav-btn:not(.active)", function() {
    if (scrolling) return;
    pagination(+$(this).attr("data-target"));
  });

});






var canvas = document.querySelector("canvas"),
    c      = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 1.5;

var mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 40;
// var minRadius = 2;

var colorArray = [
  "#2c3e50",
  "#e74c3c",
  "#ecf0f1",
  "#3498db",
  "#2980b9"
];

window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight / 1.5;

  init();
});

function Circle(x, y, dx, dy, radius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function(){
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy
    }

    this.x += this.dx;
    this.y += this.dy;

    // Interactivity
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50
      && mouse.y - this.y < 50 && mouse.y - this.y > -50){
      if(this.radius < maxRadius){
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius){
      this.radius -= 1
    }

    this.draw();
  }

}

var circleArray = [];

function init(){

  circleArray = [];

  for (var i = 0; i < 800; i++) {
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    var radius = Math.random() * 3 + 1;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

init();

function animate(){

  requestAnimationFrame(animate);

  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
