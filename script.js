const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    var tl = WebGLSampler.timeline();

    tl.from("#nav", {
        y: '-10',
        duration: 1.5,
        opacity: 0,
        ease: Expo.easeInOut
    })
}

function circleMouseFollower() {
    window.addEventListener("mousemove", function (det) {
        document.querySelector("#minicircle").style.transform = `translate(${det.clientX}px, ${det.clientY}px)`;
        console.log(det.clientX);
    });
}

circleMouseFollower();
firstPageAnim();