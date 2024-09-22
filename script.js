const canvas = document.querySelector("#main-canvas");
const context = canvas.getContext("2d");
const loader = document.querySelector("#loader");
const mainContent = document.querySelector("#content");

// If website opened on mobile phone
if(window.innerWidth < 1024) {
    loader.innerHTML = '<h2 class="text-xl font-light uppercase overflow-hidden p-2 border border-zinc-600">Open this website on laptop, pc, or any bigger screen for better experience.</h2>';
} else {
    // Wait until all images are fully loaded
    window.addEventListener('load', () => {
        // Hide the loader
        gsap.to(loader, {
            y: '-100%',
            duration: 1.5,
            ease: "power2.inOut"
        });
    });
}


// Prevent scrolling behind the fixed div
function preventScroll(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}

// Disable scroll for both wheel and touchmove events
loader.addEventListener('wheel', preventScroll, { passive: false });
loader.addEventListener('touchmove', preventScroll, { passive: false });


const frames = {
    currentFrame: 1,
    totalFrames: 538
}

let imagesLoaded = 0;

const images = [];

const imagePreLoader = () => {
    for(let i = 1; i <= frames.totalFrames; i++) {
        const imageUrl = `./Frames/frame_${i.toString().padStart(3, '0')}.webp`;
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            imagesLoaded++;
            if(imagesLoaded === frames.totalFrames) {
                loadImage(frames.currentFrame)
                startAnimation();
            }
        }
        
        images.push(img);
    }
}

const loadImage = (frameNumber) => {
    if(frameNumber >= 1 && frameNumber <= frames.totalFrames) {
        const img = images[frameNumber];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.currentFrame = frameNumber;
    }
}

const startAnimation = () => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.parent',
            start: 'top top',
            scrub: 2
        }
    });

    const updateFrame = (frameNo) => {
        return {
            currentFrame: frameNo,
            ease: 'linear',
            onUpdate: () => {
                loadImage(Math.floor(frames.currentFrame));
            }
        }
    }

    tl
        .to(frames, updateFrame(50), 'first')
        .to('.animate1', { opacity: 1, ease: 'linear' }, 'first')

        .to(frames, updateFrame(80), 'first')
        .to('.animate1', { opacity: 0, ease: 'linear' }, 'first')

        .to(frames, updateFrame(110), 'second')
        .to('.animate2', { opacity: 1, ease: 'linear' }, 'second')

        .to(frames, updateFrame(140), 'third')
        .to('.animate2', { opacity: 1, ease: 'linear' }, 'third')

        .to(frames, updateFrame(170), 'fourth')
        .to('.animate2', { opacity: 0, ease: 'linear' }, 'fourth')

        .to(frames, updateFrame(200), 'fifth')
        .to('.animate3', { opacity: 1, ease: 'linear' }, 'fifth')

        .to(frames, updateFrame(230), 'sixth')
        .to('.animate3', { opacity: 1, ease: 'linear' }, 'sixth')

        .to(frames, updateFrame(260), 'seventh')
        .to('.animate3', { opacity: 0, ease: 'linear' }, 'seventh')

        .to(frames, updateFrame(290), 'eighth')
        .to('.panel', { x: '0%', ease: 'linear' }, 'eighth')

        .to(frames, updateFrame(320), 'ninth')
        .to('.panel', { x: '0%', ease: 'linear' }, 'ninth')

        .to(frames, updateFrame(350), 'tenth')
        .to('.panel', { x: '100%', ease: 'linear' }, 'tenth')

        .to(frames, updateFrame(380), 'eleventh')
        .to(canvas, { scale: .5, borderRadius: '5rem', ease: 'linear' }, 'eleventh')

        .to(frames, updateFrame(410), 'twelveth')
        .to('.panelism', { opacity: 1, ease: 'linear' }, 'twelveth')

        .to(frames, updateFrame(440), 'thirteenth')
        .to('.panelism span', { width: 230, ease: 'linear' }, 'thirteenth')

        .to(frames, updateFrame(470), 'fourteenth')
        .to(canvas, { scale: 1, borderRadius: 0, ease: 'linear' }, 'fourteenth')

        .to(frames, updateFrame(500), 'fifteenth')
        .to('.panelism', { scale: 1.7, ease: 'circ' }, 'fifteenth')

        .to(frames, updateFrame(685), 'sixteenth')
        .to('.panelism', { scale: 1.7, ease: 'circ' }, 'sixteenth')

}

if(window.innerWidth >= 1024) {
    // GSAP Loader Text Animation
    const elem = document.querySelector('#loader-text');
    const splittedText = elem.textContent.split('');

    let spanElem = "";
    splittedText.forEach((alphabet) => {
        spanElem += `<span class="inline-block">${alphabet}</span>`;
    });
    elem.innerHTML = spanElem;

    // GSAP Loader Paragraph Animation
    const para = document.querySelector('#loader-para');
    const splittedParaText = para.textContent.split(' ');


    let spanParaElem = "";
    splittedParaText.forEach((word) => {
        spanParaElem += `<span class="inline-block">${word}</span> `;
    });
    para.innerHTML = spanParaElem;
}

const tl = gsap.timeline();

if(window.innerWidth >= 1024) {
    tl.from(`#loader-text span`, {
        y: 120,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    })
}

if(window.innerWidth >= 1024) {
    tl.from('#loader-para span', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });
}


const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

window.addEventListener("resize", () => {
    loadImage(Math.floor(frames.currentFrame));
});

if(window.innerWidth >= 1024) {
    imagePreLoader();
}