const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            delay: -1,
            stagger: .2
        })
        .from("#herofooter", {
            y: '-10',
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut
        })
}

var timeout;

//skew mouse tracker when moving
function skewMouseTracker() {
    //define default scale 
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (det) {
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(0.8, 1.2, det.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, det.clientY - yprev);

        xprev = det.clientX;
        yprev = det.clientY;

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${det.clientX}px, ${det.clientY}px) scale(1, 1)`;
        }, 100);
    });
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (det) {
        document.querySelector("#minicircle").style.transform = `translate(${det.clientX}px, ${det.clientY}px) scale(${xscale},${yscale})`;
    });
}

skewMouseTracker();
circleMouseFollower();
firstPageAnim();

document.querySelectorAll(".elem")
    .forEach(function (elem) {
        elem.addEventListener("mouseleave", function (det) {
            gsap.to(elem.querySelector("img"), {
                opacity: 0,
                duration: 0.5
            });
        });
    });

document.querySelectorAll(".elem")
    .forEach(function (elem) {
        var rotate = 0;
        var diffrot = 0;
        elem.addEventListener("mousemove", function (det) {
            var diff = det.clientY - elem.getBoundingClientRect().top;
            diffrot = det.clientX - rotate;
            rotate = det.clientX;
            
            gsap.to(elem.querySelector("img"), {
                opacity: 1,
                ease: Power3,
                top: diff,
                left: det.clientX,
                rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
            });
        });
    });