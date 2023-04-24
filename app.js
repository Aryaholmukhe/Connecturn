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

// USE gsap.timeline() 

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
gsap.fromTo(
  ".and",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      scrub: 1,
      start: "5%",
      end: "15%",
    },
    onComplete: () => {
      gsap.fromTo(".and", { opacity: 0 });
    },
  }
);

// gsap.fromTo(
//   ".Make",
//   {
//     opacity: 0,
//   },
//   {
//     opacity: 1,
//     scrollTrigger: {
//       scrub: 1,

//       start: "15%",
//       end: "25%",
//     },
//     onComplete: () => {
//       gsap.to(".and", { opacity: 0 });
//     },
//   }
// );
// gsap.fromTo(
//   ".the",
//   {
//     opacity: 0,
//   },
//   {
//     opacity: 1,
//     scrollTrigger: {
//       scrub: 1,

//       start: "15%",
//       end: "30%",
//     },
//     onComplete: () => {
//       gsap.to(".and", { opacity: 0 });
//     },
//   }
// );
// gsap.fromTo(
//   ".Correct",
//   {
//     opacity: 0,
//   },
//   {
//     opacity: 1,
//     scrollTrigger: {
//       scrub: 1,

//       start: "25%",
//       end: "35%",
//     },
//     onComplete: () => {
//       gsap.to(".and", { opacity: 0 });
//     },
//   }
// );

images[0].onload = render;

function render() {
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[ball.frame], 0, 0);
}