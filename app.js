const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
    end: "+=300%",
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
      start: "top bottom",
      end: "bottom center",
      scrub: true,
      trigger: ".banner-demo",
      // markers: true
    },
    xPercent:-100,
    duration: 2
  }
)

images[0].onload = render;

function render() {
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[ball.frame], 0, 0);
}