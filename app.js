
const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let scrollArrow = document.querySelector("#scroll-info")

const context = canvas.getContext("2d");
const frameCount = 179;

const currentFrame = (index) => `./blenderImg/${(index + 1).toString()}.jpg`;

const images = [];
let ball = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  // console.log(currentFrame(i));
  images.push(img);
}

gsap.to(ball, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.01,
    pin: "canvas",
    end: "500%",
  },
  onUpdate: render,
});


let tl = gsap.timeline({
  scrollTrigger: {
    start: "top",
    end: "+=500%",
    scrub: 1
  }
});
const texts = gsap.utils.toArray(".title");
texts.forEach((text, index) => {
  tl.from(text, {  autoAlpha: 0, duration: 2 }).to(
    text,
    { autoAlpha: 0, duration: 2 },
    ">+=1"
  );
});

canvas.onloadedmetadata = function () {
  tl.to(
    canvas,
    { currentTime: canvas.duration, duration: () => tl.duration() },
    0
  );
};

// var arrow = TweenMax.fromTo("#scroll-info", 3, {y:-50}, {y:40,autoAlpha: 0, repeat:-1});

gsap.to(scrollArrow, {
  scrollTrigger: {
    trigger: scrollArrow,
    scrub: true,
    start: "bottom 80%",
    end:"bottom 70%",
  },
  opacity: 0,
});


gsap.fromTo(
  ".Connect",
  {opacity: 1,},
  {
    opacity: 0,
    scrollTrigger: {
      scrub: 1,
      start: "0%",
      end: "10%",
    }
  }
)

gsap.from(
  ".banner-demo", {
    scrollTrigger:{
      start: "top 70%",
      end: "bottom 30%",
      scrub: true,
      trigger: ".banner-demo",
    },
    xPercent:-100,
    duration: 2
  }
)
let charSplit = new SplitType("#statistics p", {
  type: "chars",
  linesClass: "split-child"
});


gsap.from(charSplit.chars, {
  scrollTrigger: {
    trigger: "p",
    start: "top 50%",
    end: "bottom 30%",
      scrub: true
  },
  yPercent: -500,
  opacity: 0,
  stagger: 0.009,
  scrub: true
})
gsap.from("hr", {
  scrollTrigger:{
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,
    trigger: "hr",
    // markers: true
  },
  xPercent:-100
})

gsap.to(".pin", {
  scrollTrigger: {
    trigger: ".pin",
    start: "top top",
    end: "bottom bottom",
    pin: "#particles-js",
    scrub: true,
  },
  opacity: 1,
  y: 200,
});


gsap.from(".f", {
  scrollTrigger: {
    trigger:".f",
start: "top center"
  },
  opacity: 0,
  stagger: 0.5,
  duration: 1
})

gsap.from(".info", {
  scrollTrigger: {
    trigger: ".info",
    start: "top center"
  },
  xPercent: 20,
  opacity: 0,
  stagger: 1,
  duration: 1
});

images[0].onload = render;

function render() {
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[ball.frame], 0, 0);
}