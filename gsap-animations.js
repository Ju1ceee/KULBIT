/**
 * Kulbit — GSAP / ScrollTrigger (desktop + mobile).
 * Formerly: gsap-animations.js + mobile-animations.js + gsap-hero-vimeo-patch.js (Vimeo hero branch is inline in initHeroAnimation).
 */

function initAnimations() {

    const mm = ScrollTrigger.matchMedia();

    mm.add("(min-width: 992px)", () => {

        initPreloader();
        initHeroAnimation();
        initScrambleText();
        initAmbassadorsAnimation();
        initStageSecondAnimation();
        initStagesAnimation();
        initProcessAnimation();
        initServicesAnimation();
        initBenefitsGraphAnimation();
        initBenefitsAnimationSequence();
        initBenefitsCirclesStyle();
        initBenefitsCardsAnimation();
        initStageBenefitsParallax();
        initTeamAnimation();
        initCasesAnimation();

        initSmoothScroll();

        initScrollDisableLogic();

        initHeroVideoPause();
    });
}

function initStageBenefitsParallax() {
    const stageSection = document.querySelector('#stage-top-benefits');
    const benefitsSection = stageSection ? stageSection.nextElementSibling : null;

    if (!stageSection || !benefitsSection) return;

    ScrollTrigger.create({
        trigger: stageSection,
        start: "top top",
        endTrigger: benefitsSection,
        end: "top 50%",
        pin: true,
        pinSpacing: false,
        markers: false,
        onPin: () => {
            const pinSpacer = stageSection.parentNode;
            if (pinSpacer && pinSpacer.classList.contains('pin-spacer')) {
                gsap.set(pinSpacer, { position: "sticky", top: 0 });
                gsap.set(stageSection, { clearProps: "transform" });
            }
        },
        onRefresh: () => {
            const pinSpacer = stageSection.parentNode;
            if (pinSpacer && pinSpacer.classList.contains('pin-spacer')) {
                gsap.set(pinSpacer, { position: "sticky", top: 0 });
                gsap.set(stageSection, { clearProps: "transform" });
            }
        },
        onUpdate: () => {
            gsap.set(stageSection, { clearProps: "transform" });
        }
    });
}

function initBenefitsGraphAnimation() {

    const graphs = document.querySelectorAll('.benefits-graph-svg.desktop-only');

    graphs.forEach((graph) => {

        const lineSvgContainer = graph.querySelector('.position-absolute-100');

        const mainSvg = graph.querySelector('svg:not(.position-absolute-100)');

        if (!lineSvgContainer || !mainSvg) return;

        const gradientPath = mainSvg.querySelector('path:nth-child(1)');
        const whitePath = mainSvg.querySelector('path:nth-child(2)');

        const darkPath = lineSvgContainer.querySelector('path');

        if (!gradientPath || !whitePath || !darkPath) return;

        gsap.set(graph, { opacity: 0 });

    });
}

function initBenefitsAnimationSequence() {

    const section = document.querySelector('.benefits');

    const dashedLine = document.querySelector('.benefits-dashed-line.desktop-only');
    const traditionalLine = document.querySelector('.traditional-line-svg.desktop-only');
    const circles = document.querySelectorAll('.benefits-circle[data-benefit-circle]');

    const traditionalLineParent = traditionalLine ? traditionalLine.closest('.benefit-tradidional-line') : null;
    const textLegacy = traditionalLineParent ? traditionalLineParent.querySelector('.taditional-text') : null;
    const textNew = document.querySelector('.taditional-text.is-second');
    const kulbitText = document.querySelector('.kulbit-text-wrapper');
    const weeksLabel = document.querySelector('.benefits-week.if-four.desktop-only');
    const weekThreeLabel = document.querySelector('.benefits-week.is-three.desktop-only');
    const weekOneLabel = document.querySelector('.benefits-week.desktop-only:not(.is-two):not(.is-three):not(.if-four)');
    const weekTwoLabel = document.querySelector('.benefits-week.is-two.desktop-only');
    const cardsWrapper = document.querySelector('.benefits-cards-wrapper');
    const scrollMore = document.querySelector('.benefits-scroll-to-see-more.desktop-only');

    const colorLines = document.querySelectorAll('.benefits-color-line');

    if (!dashedLine) return;

    const getCircle = (id) => document.querySelector(`.benefits-circle[data-benefit-circle="${id}"]`);

    const hiddenClip = "inset(0% 100% 0% 0%)";
    const visibleClip = "inset(0% 0% 0% 0%)";

    gsap.set(dashedLine, { clipPath: visibleClip, webkitClipPath: visibleClip });
    if (traditionalLine) gsap.set(traditionalLine, { clipPath: visibleClip, webkitClipPath: visibleClip });

    if (kulbitText) gsap.set(kulbitText, { opacity: 0, y: 20 });
    if (textNew) gsap.set(textNew, { opacity: 0, y: 20 });

    if (weeksLabel) gsap.set(weeksLabel, { opacity: 0, y: 20 });
    if (weekThreeLabel) gsap.set(weekThreeLabel, { opacity: 0, y: 20 });
    if (weekOneLabel) gsap.set(weekOneLabel, { opacity: 0, y: 20 });
    if (weekTwoLabel) gsap.set(weekTwoLabel, { opacity: 0, y: 20 });

    if (cardsWrapper) gsap.set(cardsWrapper, { autoAlpha: 0, y: 30 });
    if (scrollMore) gsap.set(scrollMore, { autoAlpha: 0, y: 20 });

    if (colorLines.length) gsap.set(colorLines, { xPercent: -101 });

    if (circles.length) gsap.set(circles, { opacity: 1 });

    if (textLegacy) gsap.set(textLegacy, { opacity: 1, y: 0 });

    const tlAuto = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 50%",
        }
    });

    const F_DUR = 0.4;

    if (textNew) tlAuto.to(textNew, { opacity: 1, y: 0, duration: F_DUR, ease: "power2.out" }, 0);
    if (weeksLabel) tlAuto.to(weeksLabel, { opacity: 1, y: 0, duration: F_DUR, ease: "power2.out" }, 0);

    if (traditionalLine) {
        const path = traditionalLine.querySelector('path');
        if (path) {
            tlAuto.to(path, { fill: "rgba(255, 255, 255, 0.1)", duration: F_DUR, ease: "power2.out" }, 0);
        }
    }

    const redColorLine = document.querySelector('.benefits-color-line.is-red');
    if (redColorLine) tlAuto.to(redColorLine, { xPercent: 0, duration: 0.5, ease: "power2.out" }, 0.2);

    const circle5 = getCircle(5);
    if (circle5) tlAuto.to(circle5, { borderColor: "#ffffff", duration: F_DUR, ease: "power2.out" }, 0.3);

    const blueColorLine = document.querySelector('.benefits-color-line:not(.is-red)');
    if (blueColorLine) tlAuto.to(blueColorLine, { xPercent: 0, duration: 0.5, ease: "power2.out" }, 0.5);

    if (circle5) tlAuto.to(circle5, { borderColor: "#363636", duration: F_DUR, ease: "power2.out" }, 0.6);

    if (kulbitText) tlAuto.to(kulbitText, { opacity: 1, y: 0, duration: F_DUR, ease: "power2.out" }, 0.7);
    if (weekThreeLabel) tlAuto.to(weekThreeLabel, { opacity: 1, y: 0, duration: F_DUR, ease: "power2.out" }, 0.7);

    const graphContainers = document.querySelectorAll('.benefits-graph-svg.desktop-only');
    const graphSvgs = document.querySelectorAll('.benefits-graph-svg.desktop-only .position-absolute-100');

    if (graphContainers.length) {
        graphContainers.forEach(g => {
            const mainSvg = g.querySelector('svg:not(.position-absolute-100)');
            if (mainSvg) gsap.set(mainSvg, { opacity: 0 });
            tlAuto.set(g, { opacity: 1 }, 0.9);
        });
    }

    if (graphSvgs.length) {
        gsap.set(graphSvgs, { clipPath: hiddenClip, webkitClipPath: hiddenClip });
    }

    if (graphSvgs[0]) tlAuto.to(graphSvgs[0], { clipPath: visibleClip, webkitClipPath: visibleClip, duration: 0.6, ease: "power2.inOut" }, 0.9);
    if (weekOneLabel) tlAuto.to(weekOneLabel, { opacity: 1, y: 0, duration: F_DUR, ease: "power2.out" }, 1.1);
    if (graphSvgs[1]) tlAuto.to(graphSvgs[1], { clipPath: visibleClip, webkitClipPath: visibleClip, duration: 0.6, ease: "power2.inOut" }, 1.3);
    if (weekTwoLabel) tlAuto.to(weekTwoLabel, { opacity: 1, y: 0, duration: F_DUR, ease: "power2.out" }, 1.5);
    if (graphSvgs[2]) tlAuto.to(graphSvgs[2], { clipPath: visibleClip, webkitClipPath: visibleClip, duration: 0.6, ease: "power2.inOut" }, 1.7);

    if (cardsWrapper) tlAuto.to(cardsWrapper, { autoAlpha: 1, y: 0, duration: F_DUR, ease: "power2.out" }, 1.8);
    if (scrollMore) tlAuto.to(scrollMore, { autoAlpha: 1, y: 0, duration: F_DUR, ease: "power2.out" }, 1.8);

    const graph1Container = graphContainers[0];
    if (graph1Container) {
        const mainSvg1 = graph1Container.querySelector('svg:not(.position-absolute-100)');
        if (mainSvg1) {
            const whitePath1 = mainSvg1.querySelector('path:nth-child(2)');
            const gradientPath1 = mainSvg1.querySelector('path:nth-child(1)');

            tlAuto.set(mainSvg1, { opacity: 1 }, 1.8);
            if (gradientPath1) gsap.set(gradientPath1, { opacity: 0 });
            if (whitePath1) gsap.set(whitePath1, { clipPath: hiddenClip, webkitClipPath: hiddenClip });

            if (whitePath1) {
                tlAuto.to(whitePath1, { clipPath: visibleClip, webkitClipPath: visibleClip, duration: 0.7, ease: "power2.inOut" }, 1.8);
            }
            if (gradientPath1) {
                tlAuto.to(gradientPath1, { opacity: 1, duration: F_DUR, ease: "power2.out" }, 2.1);
            }
        }
    }

    const circle2 = getCircle(2);
    if (circle2) tlAuto.to(circle2, { borderColor: "#ffffff", duration: F_DUR, ease: "power2.out" }, 2.3);

    // --- Scrubbing timeline for cards progression ---
    const tlScrub = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            markers: false
        }
    });

    // Provide a small initial empty space in the scrub timeline (1 second relative to scrub total length)
    // so that the user scrolls a bit before the cards actually start animating away.
    const cardsStart = 1.0;
    const cards = document.querySelectorAll('.benefits-card[data-benefit-card]');

    if (cards.length >= 3) {
        const step1Duration = 3;

        tlScrub.to(cards[0], {
            xPercent: -50,
            yPercent: 50,
            rotation: -10,
            opacity: 0,
            duration: step1Duration,
            ease: "power1.inOut"
        }, `start+=${cardsStart}`);

        const graph2 = document.querySelector('.benefits-graph-svg.is-two.desktop-only');
        if (graph2) {
            const mainSvg2 = graph2.querySelector('svg:not(.position-absolute-100)');
            if (mainSvg2) {
                const whitePath2 = mainSvg2.querySelector('path:nth-child(2)');
                const gradientPath2 = mainSvg2.querySelector('path:nth-child(1)');

                tlScrub.set(mainSvg2, { opacity: 1 }, `start+=${cardsStart}`);
                if (gradientPath2) gsap.set(gradientPath2, { opacity: 0 });
                if (whitePath2) gsap.set(whitePath2, { clipPath: hiddenClip, webkitClipPath: hiddenClip });

                if (whitePath2) {
                    tlScrub.to(whitePath2, {
                        clipPath: visibleClip,
                        webkitClipPath: visibleClip,
                        duration: step1Duration,
                        ease: "power1.inOut"
                    }, `start+=${cardsStart}`);
                }

                const endOfStep1 = cardsStart + step1Duration;
                if (gradientPath2) {
                    tlScrub.to(gradientPath2, {
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out"
                    }, `start+=${endOfStep1}`);
                }

                const circle3 = getCircle(3);
                if (circle3) {
                    tlScrub.to(circle3, {
                        borderColor: "#ffffff",
                        duration: 0.5,
                        ease: "power2.out"
                    }, `start+=${endOfStep1}`);
                }
            }
        }

        tlScrub.to(cards[1], {
            xPercent: 0,
            top: "0%",
            yPercent: 0,
            scale: 1,
            zIndex: 3,
            duration: step1Duration,
            ease: "power1.inOut"
        }, `start+=${cardsStart}`)
            .to(cards[1].children, {
                opacity: 1,
                duration: step1Duration * 0.5
            }, `start+=${cardsStart}`);

        tlScrub.to(cards[2], {
            xPercent: 50,
            scale: 0.85,
            zIndex: 2,
            duration: step1Duration,
            ease: "power1.inOut"
        }, `start+=${cardsStart}`);

        const pauseBetweenSteps = 2;
        const step2Start = cardsStart + step1Duration + pauseBetweenSteps;
        const step2Duration = 3;

        tlScrub.to(cards[1], {
            xPercent: -50,
            yPercent: 50,
            rotation: -10,
            opacity: 0,
            duration: step2Duration,
            ease: "power1.inOut"
        }, `start+=${step2Start}`);

        const graph3 = document.querySelector('.benefits-graph-svg.is-three.desktop-only');
        if (graph3) {
            const mainSvg3 = graph3.querySelector('svg:not(.position-absolute-100)');
            if (mainSvg3) {
                const whitePath3 = mainSvg3.querySelector('path:nth-child(2)');
                const gradientPath3 = mainSvg3.querySelector('path:nth-child(1)');

                tlScrub.set(mainSvg3, { opacity: 1 }, `start+=${step2Start}`);
                if (gradientPath3) gsap.set(gradientPath3, { opacity: 0 });
                if (whitePath3) gsap.set(whitePath3, { clipPath: hiddenClip, webkitClipPath: hiddenClip });

                if (whitePath3) {
                    tlScrub.to(whitePath3, {
                        clipPath: visibleClip,
                        webkitClipPath: visibleClip,
                        duration: step2Duration,
                        ease: "power1.inOut"
                    }, `start+=${step2Start}`);
                }

                const endOfStep2 = step2Start + step2Duration;
                if (gradientPath3) {
                    tlScrub.to(gradientPath3, {
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out"
                    }, `start+=${endOfStep2}`);
                }

                const circle4 = getCircle(4);
                if (circle4) {
                    tlScrub.to(circle4, {
                        borderColor: "#ffffff",
                        duration: 0.5,
                        ease: "power2.out"
                    }, `start+=${endOfStep2}`);
                }
            }
        }

        tlScrub.to(cards[2], {
            xPercent: 0,
            top: "0%",
            yPercent: 0,
            scale: 1,
            zIndex: 3,
            duration: step2Duration,
            ease: "power1.inOut"
        }, `start+=${step2Start}`)
            .to(cards[2].children, {
                opacity: 1,
                duration: step2Duration * 0.5
            }, `start+=${step2Start}`);
    }

}

function initBenefitsCirclesStyle() {

    const darkBorderCircles = document.querySelectorAll('.benefits-circle[data-benefit-circle]:not([data-benefit-circle="1"])');

    gsap.set(darkBorderCircles, {
        borderColor: "#363636"
    });
}

function initBenefitsCardsAnimation() {
    const cardsWrapper = document.querySelector('.benefits-cards-wrapper');
    const scrollIndicator = document.querySelector('.benefits-scroll-to-see-more.desktop-only');
    const cards = document.querySelectorAll('.benefits-card[data-benefit-card]');

    if (!cardsWrapper && !scrollIndicator) return;

    if (cardsWrapper && cards.length > 0) {
        gsap.set(cardsWrapper, {
            position: "relative",
            overflow: "visible"
        });

        const cardConfigs = [
            { zIndex: 3, xPercent: 0, scale: 1, centered: false },
            { zIndex: 2, xPercent: 50, scale: 0.85, centered: true },
            { zIndex: 1, xPercent: 90, scale: 0.72, centered: true }
        ];

        cards.forEach((card, index) => {
            const config = cardConfigs[index] || cardConfigs[cardConfigs.length - 1];
            gsap.set(card, {
                position: "absolute",
                top: config.centered ? "50%" : 0,
                left: 0,
                width: "100%",
                zIndex: config.zIndex,
                xPercent: config.xPercent,
                yPercent: config.centered ? -50 : 0,
                scale: config.scale,
                transformOrigin: config.centered ? "left center" : "left top"
            });

            if (index > 0) {
                gsap.set(card.children, { opacity: 0.1 });
            }
        });
    }

}

function initPreloader() {

    const $ = (v) => document.querySelector(`[data-anim-preloader="${v}"]`);
    const $$ = (v) => document.querySelectorAll(`[data-anim-preloader="${v}"]`);

    const wrapper = $("wrapper");
    const zero = $("zero-precent");
    const precentContainer = $("precent-container");
    const centerSquare = $("center-square");
    const logo = $("logo");
    const masks = $$("mask-square");
    const sq1 = $("small-square-one");
    const sq2 = $("small-square-two");

    if (!wrapper || !zero || !precentContainer || !centerSquare) return;
    const root = document.documentElement;
    const cssVar = (name, fallback) => {
        const v = getComputedStyle(root).getPropertyValue(name).trim();
        return v || fallback;
    };

    const C_WHITE = cssVar("--white", "#ffffff");
    const C_BLUE = cssVar("--blue", "#0066ff");
    const C_PINK = cssVar("--pink", "#ff3ea5");

    // --- Set initial hidden states for hero elements ---
    const header = document.querySelector('header');
    const heroBgVideo = document.querySelector('.hero-bg-video');
    const heroTextSquares = document.querySelectorAll('.hero-text-square');
    const buttonHero = document.querySelector('[data-anim-preloder="button-hero"]');

    if (header) gsap.set(header, { opacity: 0, y: "-7rem" });
    if (heroBgVideo) gsap.set(heroBgVideo, { opacity: 0 });
    if (heroTextSquares.length) gsap.set(heroTextSquares, { opacity: 0, y: "3rem" });
    if (buttonHero) gsap.set(buttonHero, { x: "-6.25em", y: "6.25em" });

    // --- Preloader timeline ---
    gsap.set(wrapper, { autoAlpha: 1, pointerEvents: "all" });
    gsap.set(precentContainer, { width: "8.3125rem" });
    gsap.set(centerSquare, {
        width: "8.0625rem",
        height: "8.0625rem",
        backgroundColor: C_WHITE,
        scale: 1,
        willChange: "transform,width,height,background-color"
    });

    if (logo) gsap.set(logo, { autoAlpha: 0, zIndex: 3, willChange: "transform,opacity,width,height" });
    if (masks.length) {
        gsap.set(masks, { backgroundColor: C_WHITE, autoAlpha: 1, zIndex: 5 });
    }
    if (sq1) gsap.set(sq1, { autoAlpha: 0, backgroundColor: C_PINK, zIndex: 1, willChange: "transform,opacity,background-color" });
    if (sq2) gsap.set(sq2, { autoAlpha: 0, zIndex: 1, willChange: "transform,opacity" });


    const counter = { p: 0 };
    const updateCounter = () => {
        zero.textContent = String(Math.round(counter.p));
    };

    const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" }
    });

    tl.to(counter, {
        p: 100,
        duration: 2.3,
        ease: "none",
        onUpdate: updateCounter
    }, 0);

    if (logo) tl.to(logo, { autoAlpha: 1, duration: 0.3 }, 0.0);
    if (sq1 && sq2) {
        tl.to(sq1, { autoAlpha: 1, x: "-5.8125rem", y: "-4.0625rem", duration: 0.3 }, 0.0);
        tl.to(sq2, { autoAlpha: 1, x: "5.8125rem", y: "4.0625rem", duration: 0.3 }, 0.0);
    }

    if (sq1 && sq2) {
        tl.to(sq1, { x: "11.5rem", duration: 0.3 }, 0.3);
        tl.to(sq2, { x: "-11.5rem", duration: 0.3 }, 0.3);
    }

    if (sq1 && sq2) {
        tl.to(sq1, { x: "6.775rem", y: "0rem", duration: 0.3 }, 0.6);
        tl.to(sq2, { x: "-6.775rem", y: "0rem", duration: 0.3 }, 0.6);
    }

    tl.to(centerSquare, { width: "16.5625rem", height: "16.5625rem", duration: 0.4, ease: "power3.inOut" }, 0.9);
    if (logo) tl.to(logo, { width: "9.5625rem", height: "11.0625rem", duration: 0.4, ease: "power3.inOut" }, 0.9);
    if (sq1) tl.to(sq1, { width: "2.69rem", height: "2.69rem", x: "13.87rem", y: "0rem", duration: 0.4, ease: "power3.inOut" }, 0.9);
    if (sq2) tl.set(sq2, { autoAlpha: 0 }, 1.0);

    if (sq1) {
        tl.set(sq1, { zIndex: 6 }, 1.3);
        tl.to(sq1, { x: "0rem", y: "0rem", width: "16.5625rem", height: "16.5625rem", backgroundColor: C_BLUE, duration: 0.3, ease: "power2.inOut" }, 1.3);
    }
    if (logo) tl.set(logo, { zIndex: 7 }, 1.3);
    if (masks.length) tl.set(masks, { autoAlpha: 0 }, 1.3);

    tl.set(centerSquare, { backgroundColor: C_BLUE }, 1.6);
    if (logo) tl.to(logo, { autoAlpha: 0, duration: 0.3 }, 1.6);
    if (sq1) tl.to(sq1, { autoAlpha: 0, duration: 0.3 }, 1.6);

    tl.to(centerSquare, {
        height: "0rem",
        autoAlpha: 0,
        duration: 0.15,
        ease: "power2.inOut"
    }, 1.9);

    tl.to(precentContainer, {
        width: "108.75rem",
        duration: 0.25,
        ease: "power3.inOut"
    }, 2.05);

    tl.to(wrapper, {
        autoAlpha: 0,
        duration: 0.5,
        onComplete: () => {
            gsap.set(wrapper, { display: "none", pointerEvents: "none" });
            // Play video and show the mute button immediately
            const videoElement = document.getElementById('my-custom-video');
            if (videoElement) {
                videoElement.muted = true;
                videoElement.play().catch(console.error);
            }
            const playBtn = document.getElementById('sound-second-btn');
            if (playBtn) gsap.to(playBtn, { opacity: 1, duration: 0.4, ease: "power2.out" });
            initHeroIntroAnimation();
        }
    }, 2.3);

    updateCounter();
}

function initHeroIntroAnimation() {

    const header = document.querySelector('header');
    const heroBgVideo = document.querySelector('.hero-bg-video');
    const heroTextSquares = document.querySelectorAll('.hero-text-square');
    const buttonHero = document.querySelector('[data-anim-preloder="button-hero"]');
    const headingH1 = document.querySelector('.heading-size-h1');
    const heroButton = document.querySelector('.hero-button');
    const heroTexts = document.querySelectorAll('.hero-text');
    const videoElement = document.getElementById('my-custom-video');

    // ---- Helper: split text nodes inside an element into per-character spans,
    //      preserving element children (spans, etc.) and their styles.
    const splitIntoCharSpans = (el) => {
        const processNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                if (!text.length) return;
                const frag = document.createDocumentFragment();
                for (const ch of text) {
                    const span = document.createElement('span');
                    span.textContent = ch;
                    span.style.opacity = '0';
                    span.style.display = 'inline';
                    span.dataset.heroChar = 'true';
                    frag.appendChild(span);
                }
                node.parentNode.replaceChild(frag, node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Recurse into child elements (preserves span class/style)
                [...node.childNodes].forEach(processNode);
            }
        };
        if (!el.querySelector('[data-hero-char]')) {
            [...el.childNodes].forEach(processNode);
        }
        return el.querySelectorAll('[data-hero-char]');
    };

    // ---- Helper: split text nodes for scramble (same structure as existing scramble)
    const splitTextNodeForScramble = (node) => {
        const t = node.textContent || "";
        if (!t.length) return [];
        const m = t.match(/^(\s*)([\s\S]*?)(\s*)$/);
        const lead = m ? m[1] : "";
        const core = m ? m[2] : t;
        const trail = m ? m[3] : "";
        if (!core.trim().length) return [];
        const parent = node.parentNode;
        if (!parent) return [];
        const coreNode = document.createTextNode(core);
        const leadNode = lead ? document.createTextNode(lead) : null;
        const trailNode = trail ? document.createTextNode(trail) : null;
        if (leadNode) {
            node.textContent = lead;
            parent.insertBefore(coreNode, node.nextSibling);
            if (trailNode) parent.insertBefore(trailNode, coreNode.nextSibling);
        } else {
            parent.insertBefore(coreNode, node);
            if (trailNode) parent.insertBefore(trailNode, coreNode.nextSibling);
            parent.removeChild(node);
        }
        return [coreNode];
    };

    const getAllTextNodes = (root) => {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
        const nodes = [];
        let n;
        while ((n = walker.nextNode())) nodes.push(n);
        return nodes;
    };

    const getScrambleItems = (el) => {
        const textNodes = getAllTextNodes(el);
        const animNodes = [];
        textNodes.forEach((n) => {
            const t = n.textContent || "";
            if (!t.trim().length) return;
            if (/^\s|\s$/.test(t)) {
                const created = splitTextNodeForScramble(n);
                created.forEach((cn) => animNodes.push(cn));
            } else {
                animNodes.push(n);
            }
        });
        return animNodes
            .map((node) => ({ node, text: node.textContent || "" }))
            .filter((it) => it.text.trim().length);
    };

    // ---- Prepare H1 char spans ----
    let h1Chars = [];
    if (headingH1) {
        h1Chars = [...splitIntoCharSpans(headingH1)];
    }

    // ---- Prepare hero-button text char spans ----
    // The text inside .hero-button (the "Start Pilot" div, which is .text-align-stretch.desktop-only)
    const heroButtonTextEl = heroButton ? heroButton.querySelector('.text-align-stretch') : null;
    let buttonChars = [];
    if (heroButtonTextEl) {
        buttonChars = [...splitIntoCharSpans(heroButtonTextEl)];
    }

    // ---- Prepare hero-text scramble items ----
    const heroTextItems = [];
    if (heroTexts.length) {
        heroTexts.forEach((el) => {
            // lock dimensions so scramble doesn't reflow
            const h = el.getBoundingClientRect().height;
            const w = el.getBoundingClientRect().width;
            if (h > 0) { el.style.height = `${h}px`; el.style.width = `${w}px`; el.style.overflow = 'hidden'; }
            const items = getScrambleItems(el);
            items.forEach((it) => {
                it.node.textContent = "";
                heroTextItems.push(it);
            });
        });
    }

    // ---- Master intro timeline ----
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Block ALL scroll during intro — most reliable method
    const SCROLL_KEYS = { 32: 1, 33: 1, 34: 1, 35: 1, 36: 1, 37: 1, 38: 1, 39: 1, 40: 1 };
    const preventDefault = (e) => e.preventDefault();
    const preventKeys = (e) => { if (SCROLL_KEYS[e.keyCode]) e.preventDefault(); };
    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
    window.addEventListener('keydown', preventKeys, { passive: false });

    const unlockScroll = () => {
        window.removeEventListener('wheel', preventDefault);
        window.removeEventListener('touchmove', preventDefault);
        window.removeEventListener('keydown', preventKeys);
        document.body.style.overflow = '';
        if (window.lenis) window.lenis.start();
    };

    // 1. hero-bg-video фейдиться
    if (heroBgVideo) {
        tl.to(heroBgVideo, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, 0);
    }

    // 2. header виїжджає вниз (до свого місця)
    if (header) {
        tl.to(header, { opacity: 1, y: "0rem", duration: 0.4, ease: "power2.out" }, 0.3);
    }

    // 3. H1 набирається по літері — побудова через gsap.to з opacity 0→1 та stagger
    const h1Duration = 0.04;
    const h1Stagger = 0.025;
    const h1TotalDuration = h1Chars.length > 0 ? h1Chars.length * h1Stagger + h1Duration : 0;
    const h1Start = 0.6;

    if (h1Chars.length) {
        // Restore parent opacity to 1 first (CSS hid it), chars are still opacity:0
        gsap.set(headingH1, { opacity: 1 });
        tl.to(h1Chars, {
            opacity: 1,
            duration: h1Duration,
            stagger: h1Stagger,
            ease: "none"
        }, h1Start);
    }

    // 4. button-hero виїжджає: спочатку вгору (y→0), потім вправо (x→0)
    //    Починається коли H1 приблизно на 80%
    if (buttonHero) {
        const btnStart = h1Start + h1TotalDuration * 0.8;
        tl.to(buttonHero, { y: "0em", duration: 0.35, ease: "power3.out" }, btnStart);
        tl.to(buttonHero, { x: "0em", duration: 0.4, ease: "power3.inOut" }, `>-0.05`);
    }

    // 5. Текст кнопки набирається по літері після появи стрілки
    if (buttonChars.length) {
        // Restore parent opacity to 1 (CSS hid it), chars are still opacity:0
        if (heroButtonTextEl) gsap.set(heroButtonTextEl, { opacity: 1 });
        tl.to(buttonChars, {
            opacity: 1,
            duration: 0.03,
            stagger: 0.04,
            ease: "none"
        }, ">0.05");
    }

    // 6. hero-text scramble-анімацією — всі одночасно через фіксований лейбл
    if (heroTextItems.length) {
        // Add a label at the current end of the timeline so all scramble tweens
        // anchor to the exact same point (using ">" string in forEach chains them)
        tl.addLabel("heroScramble", ">0.05");
        heroTextItems.forEach((it) => {
            tl.to(it.node, {
                duration: 0.5,
                scrambleText: {
                    text: it.text,
                    chars: "01!<>-_\\/[]{}—=+*^?#",
                    revealDelay: 0,
                    speed: 1.2,
                },
            }, "heroScramble");
        });
    }

    // 7. hero-text-square з'являється
    if (heroTextSquares.length) {
        tl.to(heroTextSquares, {
            opacity: 1,
            y: "0rem",
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out"
        }, ">0.1");
    }

    // 8. Розблоковуємо скрол після завершення анімації
    tl.call(() => {
        unlockScroll();
    }, null, ">0.1");
}

function initScrambleText() {

    const targets = document.querySelectorAll('[data-scramble="true"]');
    if (!targets.length) return;

    const lockHeight = (el) => {
        const h = el.getBoundingClientRect().height;
        const w = el.getBoundingClientRect().width;
        if (h > 0) {
            el.style.height = `${h}px`;
            el.style.width = `${w}px`;
            el.style.overflow = "hidden";
        }
    };

    const splitTextNode = (node) => {
        const t = node.textContent || "";
        if (!t.length) return [];
        const m = t.match(/^(\s*)([\s\S]*?)(\s*)$/);
        const lead = m ? m[1] : "";
        const core = m ? m[2] : t;
        const trail = m ? m[3] : "";
        if (!core.trim().length) return [];
        const parent = node.parentNode;
        if (!parent) return [];
        const coreNode = document.createTextNode(core);
        const leadNode = lead ? document.createTextNode(lead) : null;
        const trailNode = trail ? document.createTextNode(trail) : null;
        if (leadNode) {
            node.textContent = lead;
            parent.insertBefore(coreNode, node.nextSibling);
            if (trailNode) parent.insertBefore(trailNode, coreNode.nextSibling);
        } else {
            parent.insertBefore(coreNode, node);
            if (trailNode) parent.insertBefore(trailNode, coreNode.nextSibling);
            parent.removeChild(node);
        }
        return [coreNode];
    };

    const getAllTextNodes = (root) => {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
        const nodes = [];
        let n;
        while ((n = walker.nextNode())) nodes.push(n);
        return nodes;
    };

    targets.forEach((el) => {
        lockHeight(el);

        const originalTextNodes = getAllTextNodes(el);
        const animNodes = [];
        originalTextNodes.forEach((n) => {
            const t = n.textContent || "";
            if (!t.trim().length) return;
            if (/^\s|\s$/.test(t)) {
                const created = splitTextNode(n);
                created.forEach((cn) => animNodes.push(cn));
            } else {
                animNodes.push(n);
            }
        });

        const items = animNodes
            .map((node) => ({ node, text: node.textContent || "" }))
            .filter((it) => it.text.trim().length);

        if (!items.length) return;

        items.forEach((it) => (it.node.textContent = ""));

        const startViewport = el.getAttribute("data-scramble-start") || "85%";
        const duration = parseFloat(el.getAttribute("data-scramble-duration") || "0.9");
        const stagger = parseFloat(el.getAttribute("data-scramble-stagger") || "0.06");

        const tl = gsap.timeline({
            paused: true,
            defaults: { ease: "none" },
            scrollTrigger: {
                trigger: el,
                start: `bottom ${startViewport}`,
                once: true,
                onEnter: () => tl.play(0),
            },
        });

        items.forEach((it, i) => {
            tl.to(
                it.node,
                {
                    duration,
                    scrambleText: {
                        text: it.text,
                        chars: "01!<>-_\\/[]{}—=+*^?#",
                        revealDelay: 0,
                        speed: 0.6,
                    },
                },
                i * stagger
            );
        });
    });
}

/**
 * Hero scroll: default path uses y: -12rem on video (margin compensation).
 * .is-hero-vimeo: center via gsap.set before scrub; tween only size + bg y (-22vh) — avoids horizontal drift (see former gsap-hero-vimeo-patch.js).
 */
function initHeroAnimation() {

    const section = document.querySelector('.hero');
    if (!section) return;

    const contentWrapper = section.querySelector('[data-anim-hero="text-block"]');
    const videoWrapper = section.querySelector('[data-anim-hero="video-wrapper"]');
    const bgVideo = section.querySelector('[data-anim-hero="video-block"]');
    const leftGradient = section.querySelector('[data-anim-hero="text-gradient"]');
    const videoMask = section.querySelector('[data-anim-hero="video-mask"]');

    const isVimeoHero = bgVideo && bgVideo.classList.contains('is-hero-vimeo');

    ScrollTrigger.matchMedia({

        "(min-width: 992px)": function () {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=200%",
                    scrub: true,
                    markers: false,
                }
            });

            tl.to(contentWrapper, { y: "150vh", ease: "none" }, 0);
            tl.to(leftGradient, { y: "150vh", ease: "none" }, 0);

            gsap.set(videoWrapper, {
                willChange: "width, height, transform",
                force3D: true,
                backfaceVisibility: "hidden"
            });

            if (isVimeoHero) {
                gsap.set(videoWrapper, {
                    position: "absolute",
                    left: "50%",
                    xPercent: -50,
                    bottom: "0",
                    top: "auto",
                });
                tl.fromTo(
                    videoWrapper,
                    { height: "122vh" },
                    {
                        height: "100vh",
                        width: "100vw",
                        minWidth: "100vw",
                        ease: "none",
                        force3D: true,
                    },
                    0
                );
                tl.fromTo(
                    bgVideo,
                    { y: 0 },
                    { y: "-22vh", ease: "none" },
                    0
                );
            } else {
                tl.to(videoWrapper, {
                    height: "100vh",
                    width: "100vw",
                    minWidth: "100vw",
                    position: "absolute",
                    left: "50%",
                    x: "-50%",
                    top: "0rem",
                    ease: "none",
                    force3D: true
                }, 0);

                tl.to(bgVideo, { y: "-12rem", ease: "none" }, 0);
            }

            tl.to(videoMask, { opacity: 0, ease: "none" }, 0);
        },

        "(max-width: 991px)": function () {

        }
    });
}

function initStageSecondAnimation() {

    const heading = document.querySelector('.stage-pre-heading');

    if (!heading) return;

    const splitTextNodesRecursively = (element) => {

        [...element.childNodes].forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent;

                if (text.trim() === '') return;

                const newContent = document.createDocumentFragment();
                text.split('').forEach(char => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.style.opacity = '0';
                    span.style.transition = 'none';
                    span.dataset.animChar = "true";
                    newContent.appendChild(span);
                });
                element.replaceChild(newContent, child);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                splitTextNodesRecursively(child);
            }
        });
    };

    if (heading.querySelectorAll('[data-anim-char="true"]').length === 0) {
        splitTextNodesRecursively(heading);
    }

    const chars = heading.querySelectorAll('[data-anim-char="true"]');

    gsap.to(chars, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.02,
        ease: "none",
        scrollTrigger: {
            trigger: heading,
            start: "top 80%",
            markers: false
        }
    });
}

function initStagesAnimation() {
    const section = document.querySelector('.stages');
    if (!section) return;

    const progressBar = document.querySelector('[data-anim-stage-progress="progress-stages"]');
    const mainCard = document.querySelector('[data-anim-stage="main-card"]');
    const secondCard = document.querySelector('[data-anim-stage="second-wrapper"]');

    if (!progressBar || !mainCard || !secondCard) return;

    const mm = ScrollTrigger.matchMedia();

    mm.add("(min-width: 992px)", () => {

        gsap.set(progressBar, { x: "-100%" });
        gsap.set([mainCard, secondCard], { y: "10rem", opacity: 0 });

        const tlEntry = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 50%",
                end: "top top",
                scrub: true,
                markers: false
            }
        });

        const stage1Num = section.querySelector('[data-anim-stage-text="num-1"]');
        const stage1Title = section.querySelector('[data-anim-stage-text="title-1"]');
        const stage2Num = section.querySelector('[data-anim-stage-text="num-2"]');
        const stage2Title = section.querySelector('[data-anim-stage-text="title-2"]');
        const stage3Num = section.querySelector('[data-anim-stage-text="num-3"]');
        const stage3Title = section.querySelector('[data-anim-stage-text="title-3"]');

        gsap.set([stage1Num, stage1Title, stage2Num, stage2Title, stage3Num, stage3Title], { color: "#404040" });

        tlEntry.to(mainCard, { y: "0rem", opacity: 1, duration: 1 }, "step1");
        tlEntry.to(progressBar, { x: "0%", duration: 1 }, "step1");
        tlEntry.to([stage1Num, stage1Title], { color: "#FDFCFC", duration: 1 }, "step1");

        tlEntry.to(secondCard, { y: "0rem", opacity: 0.3, duration: 1 }, "step2-=0.5");

        const tlSticky = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                markers: false
            }
        });

        const card1 = section.querySelector('[data-anim-card="1"]');
        const card2 = section.querySelector('[data-anim-card="2"]');
        const card3 = section.querySelector('[data-anim-card="3"]');
        const cardSquare = section.querySelector('[data-anim-stage="square"]');

        if (card3) gsap.set(card3, { opacity: 0 });

        tlSticky.to({}, { duration: 2.0 });

        tlSticky.to(progressBar, { x: "100%", duration: 1 }, "phase2");
        tlSticky.to([stage1Num, stage1Title], { color: "#404040", duration: 1 }, "phase2");
        tlSticky.to([stage2Num, stage2Title], { color: "#FDFCFC", duration: 1 }, "phase2");
        if (cardSquare) tlSticky.to(cardSquare, { backgroundColor: "#62B0FF", duration: 1 }, "phase2");

        if (card1 && card2 && card3) {

            tlSticky.to(card1, { y: "-3.5rem", opacity: 0, duration: 0.3 }, "phase2");

            tlSticky.to(card2, { y: "-7.5rem", duration: 0.7 }, "phase2+=0.3");
            tlSticky.to(card3, { y: "-7.5rem", duration: 0.7 }, "phase2+=0.3");
            tlSticky.to(card3, { opacity: 1, duration: 0.3 }, "phase2+=0.3");

            tlSticky.to(card1, { y: "15rem", duration: 0.1 }, "phase2+=1");
            tlSticky.set(card1, { zIndex: 10 }, "phase2+=1");
        }

        tlSticky.to({}, { duration: 1.5 });

        tlSticky.to(progressBar, { x: "200%", duration: 1 }, "phase3");
        tlSticky.to([stage2Num, stage2Title], { color: "#404040", duration: 1 }, "phase3");
        tlSticky.to([stage3Num, stage3Title], { color: "#FDFCFC", duration: 1 }, "phase3");
        if (cardSquare) tlSticky.to(cardSquare, { backgroundColor: "#FDFCFC", duration: 1 }, "phase3");

        if (card1 && card2 && card3) {

            tlSticky.to(card2, { y: "-11rem", opacity: 0, duration: 0.3 }, "phase3");

            tlSticky.to(card3, { y: "-15rem", duration: 0.7 }, "phase3+=0.3");
            tlSticky.to(card1, { y: "7.5rem", opacity: 1, duration: 0.7 }, "phase3+=0.3");
        }

        tlSticky.to({}, { duration: 1 });

        const targetNumber = mainCard.querySelector('[data-stage-target="number"]');
        const targetHeading = mainCard.querySelector('[data-stage-target="heading"]');
        const targetParagraph = mainCard.querySelector('[data-stage-target="paragraph"]');
        const targetImage = mainCard.querySelector('[data-stage-target="image"]');

        const sourceNumber2 = document.querySelector('[data-stage-source="number-2"]');
        const sourceHeading2 = document.querySelector('[data-stage-source="heading-2"]');
        const sourceParagraph2 = document.querySelector('[data-stage-source="paragraph-2"]');
        const sourceImage2 = document.querySelector('[data-stage-source="image-2"]');

        const stage1NumberText = targetNumber ? targetNumber.textContent : "";
        const stage1HeadingSpan = targetHeading && targetHeading.querySelector('span') ? targetHeading.querySelector('span').textContent : "";
        const stage1ParagraphText = targetParagraph ? targetParagraph.textContent : "";

        const sensitiveTypewriter = (timeline, target, fromText, toText, label) => {

            const eraseProxy = { len: fromText.length };

            timeline.to(eraseProxy, {
                len: 0,
                duration: 0.5,
                ease: "none",
                onUpdate: () => {
                    target.textContent = fromText.substring(0, Math.round(eraseProxy.len));
                }
            }, label);

            const typeProxy = { len: 0 };

            timeline.to(typeProxy, {
                len: toText.length,
                duration: 0.8,
                ease: "none",
                onUpdate: () => {
                    target.textContent = toText.substring(0, Math.round(typeProxy.len));
                }
            }, label + "+=0.5");
        };

        if (targetHeading) gsap.set(targetHeading, { minHeight: "2.6em" });
        if (targetParagraph) gsap.set(targetParagraph, { minHeight: "5.2em" });

        const tlPhase2 = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top-=800",
                end: "bottom bottom",
                toggleActions: "play none none reverse",
                scrub: false,
                markers: false
            }
        });

        if (targetNumber && sourceNumber2) {
            sensitiveTypewriter(tlPhase2, targetNumber, stage1NumberText, sourceNumber2.textContent, "phase2");
        }

        if (targetHeading && sourceHeading2) {
            const targetSpan = targetHeading.querySelector('span');
            const sourceSpan = sourceHeading2.querySelector('span');
            if (targetSpan && sourceSpan) {
                sensitiveTypewriter(tlPhase2, targetSpan, stage1HeadingSpan, sourceSpan.textContent, "phase2");
            }
        }

        if (targetParagraph && sourceParagraph2) {
            const parent = targetParagraph.parentElement;
            if (parent) tlPhase2.set(parent, { height: parent.offsetHeight, overflow: "hidden" }, "phase2");

            sensitiveTypewriter(tlPhase2, targetParagraph, stage1ParagraphText, sourceParagraph2.textContent, "phase2");

            if (parent) tlPhase2.set(parent, { height: "auto", overflow: "visible" }, "phase2+=1.4");
        }

        if (targetImage && sourceImage2) {
            tlPhase2.to(targetImage, { opacity: 0, duration: 0.2 }, "phase2");
            tlPhase2.add(() => {
                targetImage.src = sourceImage2.src;
                targetImage.srcset = sourceImage2.srcset;
            }, "phase2+=0.2");
            tlPhase2.to(targetImage, { opacity: 1, duration: 0.2 }, "phase2+=0.25");
        }

        const tlPhase3 = gsap.timeline({ paused: true });

        tlSticky.to({}, {
            duration: 0.1,
            onStart: () => tlPhase3.play(),
            onReverseComplete: () => tlPhase3.reverse()
        }, "phase3");

        const sourceNumber3 = document.querySelector('[data-stage-source="number-3"]');
        const sourceHeading3 = document.querySelector('[data-stage-source="heading-3"]');
        const sourceParagraph3 = document.querySelector('[data-stage-source="paragraph-3"]');
        const sourceImage3 = document.querySelector('[data-stage-source="image-3"]');

        if (targetNumber && sourceNumber3 && sourceNumber2) {
            sensitiveTypewriter(tlPhase3, targetNumber, sourceNumber2.textContent, sourceNumber3.textContent, "phase3");
        }

        if (targetHeading && sourceHeading3 && sourceHeading2) {
            const targetSpan = targetHeading.querySelector('span');
            const sourceSpan3 = sourceHeading3.querySelector('span');
            const sourceSpan2 = sourceHeading2.querySelector('span');

            if (targetSpan && sourceSpan3 && sourceSpan2) {

                tlPhase3.set(targetHeading, { height: targetHeading.offsetHeight, overflow: "hidden" }, "phase3");

                sensitiveTypewriter(tlPhase3, targetSpan, sourceSpan2.textContent, sourceSpan3.textContent, "phase3");

                tlPhase3.set(targetHeading, { height: "auto", overflow: "visible" }, "phase3+=1.35");
            }
        }

        if (targetParagraph && sourceParagraph3 && sourceParagraph2) {
            const parent = targetParagraph.parentElement;
            if (parent) tlPhase3.set(parent, { height: parent.offsetHeight, overflow: "hidden" }, "phase3");

            sensitiveTypewriter(tlPhase3, targetParagraph, sourceParagraph2.textContent, sourceParagraph3.textContent, "phase3");

            if (parent) tlPhase3.set(parent, { height: "auto", overflow: "visible" }, "phase3+=1.4");
        }

        if (targetImage && sourceImage3) {
            tlPhase3.to(targetImage, { opacity: 0, duration: 0.2 }, "phase3");
            tlPhase3.add(() => {
                targetImage.src = sourceImage3.src;
                targetImage.srcset = sourceImage3.srcset;
            }, "phase3+=0.2");
            tlPhase3.to(targetImage, { opacity: 1, duration: 0.2 }, "phase3+=0.25");
        }

        tlSticky.to({}, { duration: 0.5 });

    });
}

function initProcessAnimation() {
    const section = document.querySelector('.proces');
    if (!section) return;

    const descriptions = section.querySelectorAll('[data-anim-process-desc]');
    const dots = section.querySelectorAll('[data-anim-process-dot]');
    const processBarLines = section.querySelectorAll('[data-anim-process-bar-line]');

    if (descriptions.length) {
        gsap.set(descriptions, {
            autoAlpha: 0,
            y: "3.5rem"
        });
    }

    if (dots.length) {
        gsap.set(dots, {
            autoAlpha: 0
        });
    }

    if (processBarLines.length) {
        gsap.set(processBarLines, {
            x: "-100%"
        });
    }

    const blueWrapper = section.querySelector('.process-info-blue-wrapper');
    if (blueWrapper) {
        gsap.set(blueWrapper, { autoAlpha: 0 });
    }

    const phase3Descs = section.querySelectorAll('[data-anim-process-desc="9"], [data-anim-process-desc="10"], [data-anim-process-desc="11"], [data-anim-process-desc="12"]');
    if (phase3Descs.length) {
        gsap.set(phase3Descs, { y: "3.5rem", autoAlpha: 0 });
    }

    const animateMap = (trigger, maskPathId, fillLayerId) => {
        const maskPath = document.getElementById(maskPathId);
        const fillLayer = document.getElementById(fillLayerId);

        if (!maskPath || !fillLayer) return;

        const length = maskPath.getTotalLength();

        gsap.set(maskPath, {
            strokeDasharray: length,
            strokeDashoffset: length,
            autoAlpha: 0
        });
        gsap.set(fillLayer, { opacity: 0 });

    };

    const redMap = section.querySelector('.map-svg');
    if (redMap) animateMap(redMap, 'mask-path', 'fill-layer');

    const blueMap = section.querySelector('.map-svg-blue');
    if (blueMap) animateMap(blueMap, 'blue-mask-path', 'blue-fill-layer');

    const tlProcess = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=300%",
            scrub: 1,
            trackMarkers: false,

            pin: section.querySelector('[data-proces-anim-container="true"]') || true
        }
    });

    const stepsConfig = [
        { id: 1, barX: "-10%", dotIds: ["1-1"] },
        { id: 2, barX: "-20%", dotIds: ["1-5"] },
        { id: 3, barX: "-60%", dotIds: ["1-2", "1-3"] },
        { id: 4, barX: "-80%", dotIds: ["1-4"] }
    ];

    stepsConfig.forEach((step) => {
        const desc = section.querySelector(`[data-anim-process-desc="${step.id}"]`);
        const barLine = section.querySelector(`[data-anim-process-bar-line="${step.id}"]`);

        const dots = [];
        step.dotIds.forEach(did => {
            const d = section.querySelector(`[data-anim-process-dot="${did}"]`);
            if (d) dots.push(d);
        });

        if (desc) {

            tlProcess.to(desc, {
                y: "0rem",
                autoAlpha: 1,
                duration: 1,
                ease: "none"
            });

            const label = `step${step.id}-details`;

            if (barLine) {
                tlProcess.to(barLine, {
                    x: step.barX,
                    duration: 1,
                    ease: "none"
                }, label);
            }

            if (dots.length) {
                tlProcess.to(dots, {
                    autoAlpha: 1,
                    duration: 1,
                    ease: "none"
                }, label);
            }

            tlProcess.to({}, { duration: 0.5 });
        }
    });

    const redMaskPath = document.getElementById('mask-path');
    const redFillLayer = document.getElementById('fill-layer');

    let tlMap = gsap.timeline({ paused: true });

    if (redMaskPath && redFillLayer) {

        tlMap.to(redMaskPath, {
            strokeDashoffset: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "none"
        });

        tlMap.to(redFillLayer, {
            autoAlpha: 1,
            duration: 0.2,
            ease: "power2.out"
        });
    }

    const playRedMap = () => {
        tlMap.play();
    };

    const reverseRedMap = () => {
        tlMap.reverse();
    };

    tlProcess.to({}, {
        duration: 0.1,
        onStart: playRedMap,
        onReverseComplete: reverseRedMap
    });

    tlProcess.to({}, { duration: 12 });

    const phase1Descs = section.querySelectorAll('[data-anim-process-desc="1"], [data-anim-process-desc="2"], [data-anim-process-desc="3"], [data-anim-process-desc="4"]');
    const dotsWrapper1 = section.querySelector('[data-anim-process-dots="1"]');
    const redMapSvg = section.querySelector('.map-svg');

    if (phase1Descs.length) {
        tlProcess.to(phase1Descs, {
            y: "-5rem",
            autoAlpha: 0,
            duration: 1,
            ease: "none"
        }, "+=0.2");
    }

    if (dotsWrapper1) {

        const childDots = dotsWrapper1.querySelectorAll('[data-anim-process-dot]');
        if (childDots.length) {
            tlProcess.to(childDots, {
                autoAlpha: 0.2,
                duration: 1,
                ease: "none"
            }, "<");
        }
    }

    if (redMapSvg) {
        tlProcess.to(redMapSvg, {
            autoAlpha: 0.2,
            duration: 1,
            ease: "none"
        }, "<");
    }

    if (redFillLayer) {
        tlProcess.to(redFillLayer, {
            autoAlpha: 0,
            duration: 1,
            ease: "none"
        }, "<");
    }

    if (blueWrapper) {
        tlProcess.to(blueWrapper, {
            autoAlpha: 1,
            duration: 0.1,
            ease: "none"
        }, "+=0.1");
    }

    const stepsConfigPhase2 = [
        { id: 5, barX: "-70%", dotIds: ["2-1"] },
        { id: 6, barX: "-60%", dotIds: ["2-2"] },
        { id: 7, barX: "-10%", dotIds: ["2-3", "2-4"] },
        { id: 8, barX: "-20%", dotIds: ["2-5"] }
    ];

    stepsConfigPhase2.forEach((step) => {
        const desc = section.querySelector(`[data-anim-process-desc="${step.id}"]`);
        const barLine = section.querySelector(`[data-anim-process-bar-line="${step.id}"]`);

        const dots = [];
        step.dotIds.forEach(did => {
            const d = section.querySelector(`[data-anim-process-dot="${did}"]`);
            if (d) dots.push(d);
        });

        if (desc) {

            let position = "+=0.2";
            if (step.id === 5) {
                tlProcess.add("phase2Start", "+=0.2");
                position = "phase2Start";
            }

            tlProcess.to(desc, {
                y: "0rem",
                autoAlpha: 1,
                duration: 1,
                ease: "none"
            }, position);

            const label = `step${step.id}-details`;
            if (barLine) {
                tlProcess.to(barLine, {
                    x: step.barX,
                    duration: 1,
                    ease: "none"
                }, label);
            }

            if (dots.length) {
                tlProcess.to(dots, {
                    autoAlpha: 1,
                    duration: 1,
                    ease: "none"
                }, label);
            }
        }
    });

    const infoSquare = section.querySelector('.process-info-square');
    const infoTitleWrapper = section.querySelector('.width-180-a-a');
    const infoTitle = section.querySelector('.process-info-title');
    const originalTitleText = "Traditional Production House";

    if (infoTitleWrapper) {
        tlProcess.to(infoTitleWrapper, {
            width: "14rem",
            duration: 0.5,
            ease: "none"
        }, "phase2Start");
    }

    tlProcess.to(infoSquare, {
        backgroundColor: "#ffffff",
        duration: 0.5,
        ease: "none",
        onStart: () => {
            if (infoTitle) {

                infoTitle.innerHTML = '<span id="brand-s1" style="color:#62B0FF"></span><br><span id="brand-s2" style="color:#ffffff"></span>';

                gsap.to("#brand-s1", {
                    duration: 1,
                    scrambleText: { text: "KULBIT", chars: "upperCase", speed: 0.3, revealDelay: 0 }
                });
                gsap.to("#brand-s2", {
                    duration: 1.5,
                    delay: 0.2,
                    scrambleText: { text: "AI-Elevated Production", chars: "upperCase", speed: 0.3, revealDelay: 0 }
                });
            }
        },
        onReverseComplete: () => {

            if (infoTitle) infoTitle.textContent = originalTitleText;
        }
    }, "<");

    const blueMaskPath = document.getElementById('blue-mask-path');
    const blueFillLayer = document.getElementById('blue-fill-layer');

    let tlBlueMap = gsap.timeline({ paused: true });

    if (blueMaskPath && blueFillLayer) {

        tlBlueMap.to(blueMaskPath, {
            strokeDashoffset: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "none"
        });

        tlBlueMap.to(blueFillLayer, {
            autoAlpha: 1,
            duration: 0.05,
            ease: "power2.out"
        });
    }

    const playBlueMap = () => {
        tlBlueMap.play();
    };

    const reverseBlueMap = () => {
        tlBlueMap.reverse();
    };

    tlProcess.to({}, {
        duration: 0.1,
        onStart: playBlueMap,
        onReverseComplete: reverseBlueMap
    });

    tlProcess.to({}, { duration: 12 });

    const descriptionsPhase2 = [];
    [5, 6, 7, 8].forEach(id => {
        const d = section.querySelector(`[data-anim-process-desc="${id}"]`);
        if (d) descriptionsPhase2.push(d);
    });

    if (descriptionsPhase2.length) {
        tlProcess.to(descriptionsPhase2, {
            autoAlpha: 0,
            y: "-5rem",
            duration: 1,
            ease: "none"
        }, "+=0.5");
    }

    const stepsConfigPhase3 = [9, 10, 11, 12];

    stepsConfigPhase3.forEach((id) => {
        const desc = section.querySelector(`[data-anim-process-desc="${id}"]`);
        if (desc) {
            tlProcess.to(desc, {
                y: "0rem",
                autoAlpha: 1,
                duration: 1,
                ease: "none"
            }, "+=0.2");
        }
    });

    tlProcess.to({}, { duration: 25 });

}

function initAmbassadorsAnimation() {
    const section = document.querySelector('.our-ambassadors');

    const wrapper = document.querySelector('[data-anim-ambassador-wrapper="true"]');
    const card1 = document.querySelector('[data-anim-ambassador="card-1"]');
    const card2 = document.querySelector('[data-anim-ambassador="card-2"]');
    const card3 = document.querySelector('[data-anim-ambassador="card-3"]');

    const cardText1 = document.querySelector('[data-anim-ambassador="card-text-1"]');
    const cardText2 = document.querySelector('[data-anim-ambassador="card-text-2"]');

    if (!section || !wrapper || !card1 || !card2 || !card3) return;

    const cardHeight = card1.offsetHeight || 516;
    gsap.set(wrapper, { height: cardHeight });

    gsap.set([card1, card2, card3], {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%"
    });

    gsap.set([card2, card3], { y: "100%", opacity: 0 });

    if (cardText2) {
        gsap.set(cardText2, { y: "100%", opacity: 0 });
    }

    if (section.querySelector('.progress-bar-white-line')) {
        gsap.fromTo(section.querySelector('.progress-bar-white-line'),
            { x: "-100%" },
            {
                x: "0%",
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                    markers: false
                }
            }
        );
    }

    const mm = ScrollTrigger.matchMedia();

    mm.add("(min-width: 992px)", () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",

                scrub: true,
                markers: false
            }
        });

        tl.to(card1, { y: "-100%", duration: 1 });
        tl.to(card1, { opacity: 0, duration: 0.3 }, "<");

        tl.to(card2, { y: "0%", opacity: 1, duration: 1 }, "-=0.5");

        tl.to({}, { duration: 0.5 });

        tl.to(card2, { y: "-100%", opacity: 0, duration: 1 });

        tl.to(card3, { y: "0%", opacity: 1, duration: 1 }, "-=0.5");

        if (cardText1) {
            tl.to(cardText1, { y: "-100%", opacity: 0, duration: 0.5 }, "<");
        }

        if (cardText2) {
            tl.to(cardText2, { y: "0%", opacity: 1, duration: 0.5 }, "<+=0.2");
        }

    });
}

function initServicesAnimation() {
    const section = document.querySelector('.our-services');
    if (!section) return;

    const mainWrapper = section.querySelector('.our-services-cards-main-wrapper');
    if (!mainWrapper) return;

    ScrollTrigger.matchMedia({
        "(min-width: 992px)": function () {

            const allCards = section.querySelectorAll('.our-services-cards-wrapper');
            if (allCards.length < 2) return;

            const cardCount = allCards.length;

            const getScrollAmount = () => {
                const card1 = allCards[0];
                const cardLast = allCards[cardCount - 1];
                return -(cardLast.offsetLeft - card1.offsetLeft);
            };

            gsap.set(mainWrapper, { y: "10rem", autoAlpha: 0 });
            gsap.to(mainWrapper, {
                y: "0rem",
                autoAlpha: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                    markers: false
                }
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    invalidateOnRefresh: true,
                    markers: false,
                    // Швидко "доскролюємо" до найближчої картки після відпускання.
                    // snap працює по прогресу (0..1), тому крок = 1/(cardCount-1).
                    snap: {
                        snapTo: (value) => gsap.utils.snap(1 / (cardCount - 1))(value),
                        duration: 0.15,
                        delay: 0,
                        ease: "power1.out"
                    }
                }
            });

            tl.to(allCards, {
                x: () => getScrollAmount(),
                ease: "none",
                duration: 1
            });
        }
    });
}

function initTeamAnimation() {
    const section = document.querySelector('.team');
    const teamHeading = document.querySelector('.team-head-right-second');

    if (!section || !teamHeading) return;

    const teamHeadRight = document.querySelector('.team-head-right');
    const teamCards = document.querySelector('.team-cards-wrapper');
    const teamBottomSection = document.querySelector('.team-head-right-bottom');
    const footer = document.querySelector('.footer');

    // 1. Initial configuration
    if (section) gsap.set(section, { height: "250vh" }); // Reduced from 1000vh to remove dead space

    const elementsToHide = [teamHeadRight, teamCards].filter(el => el);
    gsap.set(elementsToHide, { opacity: 0, y: 50 });

    if (teamBottomSection) {
        gsap.set(teamBottomSection, { opacity: 0 });
    }

    const splitTextNodesRecursively = (element) => {
        [...element.childNodes].forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent;
                if (text.trim() === '') return;

                const newContent = document.createDocumentFragment();
                text.split('').forEach(char => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.style.opacity = '0';
                    span.style.transition = 'none';
                    span.dataset.animChar = "true";
                    newContent.appendChild(span);
                });
                element.replaceChild(newContent, child);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                splitTextNodesRecursively(child);
            }
        });
    };

    const mm = ScrollTrigger.matchMedia();

    mm.add("(min-width: 992px)", () => {

        if (teamHeading.querySelectorAll('[data-anim-char="true"]').length === 0) {
            splitTextNodesRecursively(teamHeading);
        }

        const chars = teamHeading.querySelectorAll('[data-anim-char="true"]');

        gsap.to(chars, {
            opacity: 1,
            duration: 0.1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom-=30%",
                end: "top top",
                scrub: true,
                markers: false
            }
        });
    });

    gsap.to(teamHeading, {
        y: -50,
        opacity: 0,
        ease: "power2.in",
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "top top-=15%",
            scrub: true,
            markers: false
        }
    });

    if (teamHeadRight) {
        gsap.to(teamHeadRight, {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top top-=15%",
                end: "top top-=40%",
                scrub: true,
                markers: false
            }
        });
    }

    if (teamCards) {
        gsap.to(teamCards, {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top top-=40%",
                end: "top top-=65%",
                scrub: true,
                markers: false
            }
        });
    }

    if (teamBottomSection) {
        gsap.fromTo(teamBottomSection,
            { opacity: 1, y: 0 },
            {
                y: -50,
                opacity: 0,
                ease: "power2.in",
                immediateRender: false,
                scrollTrigger: {
                    trigger: section,
                    start: "top top-=75%",
                    end: "top top-=85%",
                    scrub: true,
                    markers: false
                }
            }
        );
    }

    if (teamCards) {
        gsap.fromTo(teamCards,
            { y: 0 },
            {
                y: "-14.125rem",
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top-=75%",
                    end: "top top-=100%",
                    scrub: true,
                    markers: false
                }
            }
        );
    }

    const teamBlurTop = document.querySelector('.team-blur-top');
    if (teamBlurTop) {
        gsap.set(teamBlurTop, { opacity: 0 });

        gsap.to(teamBlurTop, {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top-=100%",
                end: "top top-=110%",
                scrub: true,
                markers: false
            }
        });

        gsap.to(teamBlurTop, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top-=135%",
                end: "top top-=145%",
                scrub: true,
                markers: false
            }
        });
    }

    const teamGridWrappers = gsap.utils.toArray('.team-grid-wrapper');
    if (teamGridWrappers.length === 2) {
        const firstWrapper = teamGridWrappers[0];
        const secondWrapper = teamGridWrappers[1];

        const mm = ScrollTrigger.matchMedia();
        mm.add("(min-width: 992px)", () => {

            const firstRect = firstWrapper.getBoundingClientRect();
            const secondRect = secondWrapper.getBoundingClientRect();
            const distanceToMove = secondRect.top - firstRect.top;

            gsap.to([firstWrapper, secondWrapper], {
                y: `-=${distanceToMove}px`,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top-=110%",
                    end: "top top-=140%",
                    scrub: true,
                    markers: false
                }
            });

            gsap.to(firstWrapper, {
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top-=110%",
                    end: "top top-=140%",
                    scrub: true,
                    markers: false
                }
            });
        });
    }

    if (teamBottomSection) {
        const teamBottomParagraph = teamBottomSection.querySelector('p');

        if (teamBottomParagraph) {

            const getAllTextNodes = (root) => {
                const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
                const nodes = [];
                let n;
                while ((n = walker.nextNode())) {
                    if (n.textContent.trim().length > 0) {
                        nodes.push(n);
                    }
                }
                return nodes;
            };

            const textNodes = getAllTextNodes(teamBottomParagraph);
            const textItems = textNodes.map(node => ({
                node,
                text: node.textContent
            }));

            const currentHeight = teamBottomSection.getBoundingClientRect().height;
            if (currentHeight > 0) {
                teamBottomSection.style.minHeight = `${currentHeight}px`;
            }

            textItems.forEach(item => item.node.textContent = "");

            const scrambleTl = gsap.timeline({
                paused: true,
                scrollTrigger: {
                    trigger: section,
                    start: "top top-=40%",
                    once: true,
                    onEnter: () => {

                        gsap.set(teamBottomSection, { opacity: 1 });
                        scrambleTl.play(0);
                    }
                }
            });

            textItems.forEach((item, i) => {
                scrambleTl.to(
                    item.node,
                    {
                        duration: 0.8,
                        scrambleText: {
                            text: item.text,
                            chars: "01!<>-_\\/[]{}—=+*^?#",
                            revealDelay: 0,
                            speed: 0.6
                        }
                    },
                    i * 0.1
                );
            });
        }
    }

    const previousSectionContainer = document.querySelector('.benefits .container.is-stiky-benefits');
    if (previousSectionContainer) {
        gsap.to(previousSectionContainer, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top 15%",
                scrub: true,
                markers: false
            }
        });
    }

    if (footer) {
        // Initial state: Pushed down by 100vh
        gsap.set(footer, { y: "100vh", autoAlpha: 1 });

        // Reveal animation: Slide up to y: 0
        gsap.to(footer, {
            y: 0,
            duration: 1, // Slower duration for a smooth slide up
            ease: "none", // Linear or slight ease
            scrollTrigger: {
                trigger: section,
                start: "bottom bottom", // Start exactly when section bottom hits viewport bottom
                end: "+=100%", // Scroll distance for the footer reveal
                scrub: true, // Scrub the reveal to scroll position
                markers: false
            }
        });
    }
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (!href || href === "#") return;

            const targetId = href.substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                e.preventDefault();

                const pinSpacer = target.closest(".pin-spacer");
                const scrollTarget = pinSpacer || target;

                if (window.lenis) {
                    window.lenis.scrollTo(scrollTarget, { offset: 0, immediate: false });
                }

                else if (gsap.plugins.scrollTo) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: scrollTarget, offsetY: 0 },
                        ease: "power2.out"
                    });
                }

                else {
                    scrollTarget.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

function initDynamicAnchors() {
    const anchorMap = {
        "Home": ".hero",
        "Clients": ".our-ambassadors",
        "Cases": ".cases",
        "Team": ".team",
        "what-we-provide": ".our-services",
        "Footer": ".footer"
    };

    function updateAnchors() {

        document.querySelectorAll('.dynamic-anchor').forEach(el => el.remove());

        for (const [id, selector] of Object.entries(anchorMap)) {
            const section = document.querySelector(selector);
            if (section) {

                const existingId = document.getElementById(id);
                if (existingId && !existingId.classList.contains('dynamic-anchor')) {

                    existingId.removeAttribute('id');
                }

                const rect = section.getBoundingClientRect();
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const absoluteTop = rect.top + scrollTop;

                const anchor = document.createElement('div');
                anchor.id = id;
                anchor.classList.add('dynamic-anchor');
                anchor.style.position = 'absolute';
                anchor.style.top = `${absoluteTop}px`;
                anchor.style.left = '0';
                anchor.style.width = '1px';
                anchor.style.height = '1px';
                anchor.style.visibility = 'hidden';
                anchor.style.pointerEvents = 'none';

                document.body.appendChild(anchor);
            }
        }
    }

    window.addEventListener('load', updateAnchors);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateAnchors, 200);
    });

    if (document.readyState === 'complete') {
        updateAnchors();
    }
}

function initScrollDisableLogic() {
    const elements = document.querySelectorAll('[scroll-disable-element]');
    if (!elements.length) return;

    elements.forEach(el => {
        el.dataset.scrollLocked = 'false';
        el.dataset.prevOpacity = '0';
    });

    const checkScroll = () => {
        let isAnyVisible = false;
        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            const opacity = parseFloat(style.opacity || '1');
            const display = style.display;
            const visibility = style.visibility;

            let isLocked = el.dataset.scrollLocked === 'true';

            if (display === 'none' || visibility === 'hidden' || opacity === 0) {
                isLocked = false;
            } else if (opacity > 0.95) {
                isLocked = true;
            } else {
                const prevOpacity = parseFloat(el.dataset.prevOpacity || '0');
                if (opacity < prevOpacity) {
                    // Element is fading out — instantly unlock scroll
                    isLocked = false;
                } else if (opacity > prevOpacity) {
                    // Element is fading in — instantly lock scroll
                    isLocked = true;
                }
            }

            el.dataset.prevOpacity = opacity;
            el.dataset.scrollLocked = isLocked ? 'true' : 'false';

            if (isLocked) {
                isAnyVisible = true;
            }
        });

        if (isAnyVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const observer = new MutationObserver(checkScroll);
    elements.forEach(el => {
        observer.observe(el, { attributes: true, attributeFilter: ['style', 'class'] });
    });

    checkScroll();
}

function initHeroVideoPause() {
    const video = document.getElementById('my-custom-video');
    const nextSection = document.querySelector('.our-ambassadors');

    if (!video || !nextSection) return;

    ScrollTrigger.create({
        trigger: nextSection,
        start: "top top",
        onEnter: () => video.pause(),
        onLeaveBack: () => video.play(),
        markers: false
    });
}

function initCasesAnimation() {
    const section = document.querySelector('.cases');
    if (!section) return;

    const progressLine = section.querySelector('.progress-bar-cases-anim .progress-bar-white-line');
    const textCase = section.querySelector('.text-case');
    const textSubtitle = section.querySelector('.text-size-16.text-style-uppercase.is-case');
    const card1 = section.querySelector('[data-case-video="1"]');
    const card2 = section.querySelector('[data-case-video="2"]');  // vimeo iframe card
    const card3 = section.querySelector('[data-case-video="3"]');

    // ── Prepare text-case: split into spans, hide via gsap.set ───────────
    let textChars = [];
    if (textCase) {
        const raw = textCase.textContent;
        textCase.textContent = '';
        [...raw].forEach(ch => {
            const s = document.createElement('span');
            s.textContent = ch;
            textCase.appendChild(s);
            textChars.push(s);
        });
        gsap.set(textChars, { opacity: 0 });
    }


    // ── Initial card / bar states ─────────────────────────────────────────
    if (progressLine) gsap.set(progressLine, { xPercent: -100 });
    if (card1) gsap.set(card1, { height: '80vh', overflow: 'hidden', opacity: 0, y: 80 });
    if (card2) gsap.set(card2, { height: 0, overflow: 'hidden', opacity: 0 });
    if (card3) gsap.set(card3, { height: 0, overflow: 'hidden', opacity: 0 });

    // ── Progress bar: own trigger — full at top-top ───────────────────────
    if (progressLine) {
        gsap.to(progressLine, {
            xPercent: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: 1,
                markers: false
            }
        });
    }


    // ── TL1: same range as progress bar (top bottom → top top) ───────────
    // 1 unit = 10% of that range. Text @ 20%, card1 @ 35%.
    const D = 10;

    const tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
            markers: false
        }
    });

    // text-case chars: reveal letter-by-letter from 20% to 27%
    if (textChars.length) {
        const charStagger = (D * 0.07) / textChars.length;
        tl1.to(textChars, {
            opacity: 1,
            duration: 0.001,
            stagger: charStagger,
            ease: 'none'
        }, D * 0.20);
    }

    // card1: slide up + opacity from 35% to 43%
    if (card1) {
        tl1.to(card1, { opacity: 1, y: 0, ease: 'power2.out', duration: D * 0.08 }, D * 0.35);
    }

    // ── TL2: card1 collapses → card2 (vimeo) expands + slides up ─────────
    // Starts 10% after section reaches top of viewport.
    const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top -10%',
            end: 'top -28%',
            scrub: 1,
            markers: false,
            onEnter: () => {
                if (!card1) return;
                // Pause native video
                const nativeVideo = card1.querySelector('video.vimeo-iframe');
                if (nativeVideo) { nativeVideo.pause(); nativeVideo.controls = false; }
                // Restore poster/button
                const poster = card1.querySelector('.video-poster');
                if (poster) { poster.style.display = ''; poster.style.opacity = '1'; poster.style.transition = 'none'; }
                const playBtn = card1.querySelector('.vide-case-button');
                if (playBtn) { playBtn.style.display = ''; playBtn.style.opacity = '1'; playBtn.style.transition = 'none'; }
            }
        }
    });

    if (card1 && card2) {
        tl2.to(card1, { height: 0, ease: 'power2.inOut', duration: 1 }, 0);
        tl2.set(card2, { opacity: 1 }, 0);
        tl2.to(card2, { height: '80vh', ease: 'power2.inOut', duration: 1 }, 0);
        // slide up, same as card3 used to do
        tl2.to(card2, { y: '-3.5rem', ease: 'power2.out', duration: 0.6 });
    }

    // ── TL3: card2 collapses → card3 expands + slides up ─────────────────
    const tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top -32%',
            end: 'top -52%',
            scrub: 1,
            markers: false,
            onEnter: () => {
                if (!card2) return;
                // Pause vimeo iframe
                const iframe = card2.querySelector('iframe.vimeo-iframe');
                if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), '*');
                }
                // Restore poster/button
                const poster = card2.querySelector('.video-poster');
                if (poster) { poster.style.display = ''; poster.style.opacity = '1'; poster.style.transition = 'none'; }
                const playBtn = card2.querySelector('.vide-case-button');
                if (playBtn) { playBtn.style.display = ''; playBtn.style.opacity = '1'; playBtn.style.transition = 'none'; }
            }
        }
    });

    if (card2 && card3) {
        // card3 sits 2 × flex-gap lower than card1's original position.
        // Compute gap at init time so the y offset accounts for it.
        const flexGap = card1 ? parseFloat(getComputedStyle(card1.parentElement).rowGap) || 0 : 0;
        const card3SlideY = -(flexGap * 2 + 56); // 56px ≈ 3.5rem — same aesthetic slide as card2

        tl3.to(card2, { height: 0, ease: 'power2.inOut', duration: 1 }, 0);
        tl3.set(card3, { opacity: 1 }, 0);
        tl3.to(card3, { height: '80vh', ease: 'power2.inOut', duration: 1 }, 0);
        tl3.to(card3, { y: card3SlideY, ease: 'power2.out', duration: 0.6 });
    }

}

function initMobileAnimations() {

    const mm = ScrollTrigger.matchMedia();

    mm.add("(max-width: 991px)", () => {

        const mmMobile = ScrollTrigger.matchMedia();
        mmMobile.add("(max-width: 479px)", () => {

            initMobileHero();

            initMobileAmbassadors();

            initMobileProcess();

            initMobileServices();

            initMobileBenefits();
            initMobileBenefitsCards();
            initMobileStageHeading();
            initMobileStagesAnimation();
            initMobileScrambleText();
            initMobileTeamAnimation();
            initMobileCasesAnimation();

        });

        initHeroVideoPause();

        initScrollDisableLogic();
    });
}

function initMobileHero() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) {

        return;
    }

    const heroContent = document.querySelector('.hero-content-wrapper');
    const heroGradient = document.querySelector('.hero-left-gradient');
    const videoWrapper = document.querySelector('.video-wrapper');
    const videoMask = document.querySelector('.video-mask');

    const videoElements = [videoWrapper, videoMask].filter(el => el);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    if (heroContent) {

        tl.to(heroContent, { y: "120%", ease: "none", duration: 0.8 }, 0);
    }

    if (heroGradient) {

        tl.to(heroGradient, { y: "220%", ease: "none", duration: 0.8 }, 0);
    }

    if (videoElements.length > 0) {

        tl.to(videoElements, { height: "100vh", ease: "none", duration: 0.8 }, 0);
    }

    if (videoMask) {

        tl.to(videoMask, { opacity: 0, ease: "none", duration: 0.2 }, 0.8);
    }
}

function initMobileAmbassadors() {
    const section = document.querySelector('.our-ambassadors');
    const desktopLogos = document.querySelector('.flex-h.is-brands-logo');

    if (desktopLogos) gsap.set(desktopLogos, { display: "none" });

    if (!section) return;

    const wrapper = document.querySelector('.is-brands-logo-mobile');

    // У розмітці:
    // - `mobile-1` містить `mobile-2-1..4`
    // - `mobile-2` містить `mobile-1-1..2`
    // Тому міняємо контейнерні змінні місцями, щоб timeline працював як задумано.
    const container1 = document.querySelector('[data-anim-ambassadors="mobile-2"]');
    const container2 = document.querySelector('[data-anim-ambassadors="mobile-1"]');

    const row1_1 = document.querySelector('[data-anim-ambassadors="mobile-1-1"]');
    const row1_2 = document.querySelector('[data-anim-ambassadors="mobile-1-2"]');

    const row2_1 = document.querySelector('[data-anim-ambassadors="mobile-2-1"]');
    const row2_2 = document.querySelector('[data-anim-ambassadors="mobile-2-2"]');
    const row2_3 = document.querySelector('[data-anim-ambassadors="mobile-2-3"]');
    const row2_4 = document.querySelector('[data-anim-ambassadors="mobile-2-4"]');

    if (!container1 || !container2 || !wrapper) return;

    const initialHeight = wrapper.offsetHeight || 300;
    gsap.set(wrapper, { position: "relative", height: initialHeight, display: "block" });

    gsap.set([container1, container2], {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%"
    });

    const allRows = [row1_1, row1_2, row2_1, row2_2, row2_3, row2_4].filter(r => r);
    gsap.set(allRows, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%"
    });

    const startY = 20;
    const exitY = -20;

    gsap.set([container2, row1_2, row2_2, row2_3, row2_4], { opacity: 0, y: startY, visibility: "hidden" });

    gsap.set(container1, { opacity: 1, y: 0, visibility: "visible" });
    gsap.set(row1_1, { opacity: 1, y: 0, visibility: "visible" });
    gsap.set(row2_1, { opacity: 1, y: 0, visibility: "visible" });

    ScrollTrigger.refresh();

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=300%",
            pin: true,
            pinSpacing: false,
            scrub: true
        }
    });

    if (row1_1 && row1_2) {
        tl.to(row1_1, { opacity: 0, y: exitY, duration: 1 })
            .to(row1_2, { opacity: 1, y: 0, visibility: "visible", duration: 1 }, "<0.2");
    }

    tl.to(container1, { opacity: 0, y: exitY, duration: 1 }, "+=0.5");

    tl.set(container1, { visibility: "hidden" })
        .set(container2, { visibility: "visible" })
        .to(container2, { opacity: 1, y: 0, duration: 1 });

    if (row2_1 && row2_2) {
        tl.to(row2_1, { opacity: 0, y: exitY, duration: 1 }, "+=0.5")
            .to(row2_2, { opacity: 1, y: 0, visibility: "visible", duration: 1 }, "<0.2");
    }

    if (row2_3) {
        tl.to(row2_2, { opacity: 0, y: exitY, duration: 1 }, "+=0.5")
            .to(row2_3, { opacity: 1, y: 0, visibility: "visible", duration: 1 }, "<0.2");
    }

    if (row2_4) {
        tl.to(row2_3, { opacity: 0, y: exitY, duration: 1 }, "+=0.5")
            .to(row2_4, { opacity: 1, y: 0, visibility: "visible", duration: 1 }, "<0.2");
    }

    tl.to({}, { duration: 1.5 }, "+=1.5");
}

function initMobileProcess() {
    const section = document.querySelector('.proces');
    if (!section) return;

    const wrapper = section.querySelector('.process-info-red-wrapper');
    if (!wrapper) return;

    const redMaskPath = document.getElementById('mask-path');
    const redFillLayer = document.getElementById('fill-layer');
    const blueMaskPath = document.getElementById('blue-mask-path');
    const blueFillLayer = document.getElementById('blue-fill-layer');
    const redMapSvg = section.querySelector('.map-svg');

    const infoSquare = section.querySelector('.process-info-square');
    const infoTitleWrapper = section.querySelector('.width-180-a-a');
    const infoTitle = section.querySelector('.process-info-title');
    const originalTitleText = infoTitle ? infoTitle.textContent : "Traditional Production House";

    const cards = {};
    for (let i = 1; i <= 12; i++) {
        cards[i] = section.querySelector(`[data-anim-process-desc="${i}"]`);
    }

    const bars = {};
    for (let i = 1; i <= 8; i++) {
        bars[i] = section.querySelector(`[data-anim-process-bar-line="${i}"]`);
    }

    const dots = {
        1: [section.querySelector('[data-anim-process-dot="1-1"]')],
        2: [section.querySelector('[data-anim-process-dot="1-5"]')],
        3: [section.querySelector('[data-anim-process-dot="1-2"]'), section.querySelector('[data-anim-process-dot="1-3"]')],
        4: [section.querySelector('[data-anim-process-dot="1-4"]')],
        5: [section.querySelector('[data-anim-process-dot="2-1"]')],
        6: [section.querySelector('[data-anim-process-dot="2-2"]')],
        7: [section.querySelector('[data-anim-process-dot="2-3"]'), section.querySelector('[data-anim-process-dot="2-4"]')],
        8: [section.querySelector('[data-anim-process-dot="2-5"]')],

    };

    for (let key in dots) {
        dots[key] = dots[key].filter(d => d);
    }

    let tlRedMap = gsap.timeline({ paused: true });

    if (redMapSvg) gsap.set(redMapSvg, { autoAlpha: 0 });

    if (redMaskPath && redFillLayer && redMapSvg) {

        const redLength = redMaskPath.getTotalLength();
        gsap.set(redMaskPath, { strokeDasharray: redLength, strokeDashoffset: redLength });
        gsap.set(redFillLayer, { autoAlpha: 0 });

        tlRedMap.to(redMapSvg, { autoAlpha: 1, duration: 0.1, ease: "none" });
        tlRedMap.to(redMaskPath, { strokeDashoffset: 0, duration: 0.8, ease: "none" }, "<");

        tlRedMap.to(redFillLayer, { autoAlpha: 1, duration: 0.2, ease: "power2.out" });
    }

    const playRedMap = () => { tlRedMap.play(); };
    const reverseRedMap = () => { tlRedMap.reverse(); };

    let tlBlueMap = gsap.timeline({ paused: true });
    if (blueMaskPath && blueFillLayer) {

        const blueLength = blueMaskPath.getTotalLength();
        gsap.set(blueMaskPath, { strokeDasharray: blueLength, strokeDashoffset: blueLength, autoAlpha: 1 });
        gsap.set(blueFillLayer, { autoAlpha: 0 });

        tlBlueMap.to(blueMaskPath, { strokeDashoffset: 0, duration: 0.8, ease: "none" });

        tlBlueMap.to(blueFillLayer, { autoAlpha: 1, duration: 0.05, ease: "power2.out" });
    }

    const playBlueMap = () => { tlBlueMap.play(); };
    const reverseBlueMap = () => {
        tlBlueMap.reverse();
    }

    gsap.set(wrapper, { position: "relative", minHeight: "22rem", display: "block" });

    const cardPositions = {};

    for (let i = 1; i <= 12; i += 2) {
        if (cards[i]) {
            gsap.set(cards[i], { position: "absolute", top: 0, left: 0, width: "100%", visibility: "visible", opacity: 0 });
            const height = cards[i].offsetHeight;
            cardPositions[i] = { top: 0 };
            cardPositions[i + 1] = { top: `${height - 2}px` };
            gsap.set(cards[i], { visibility: "hidden" });
        }
    }

    for (let i = 1; i <= 12; i++) {
        if (cards[i] && cardPositions[i]) {
            gsap.set(cards[i], {
                position: "absolute",
                top: cardPositions[i].top,
                left: 0,
                width: "100%",
                opacity: 0,
                y: "2rem",
                visibility: "hidden"
            });
        }
    }

    const allBars = Object.values(bars).filter(b => b);
    const allDots = Object.values(dots).flat();

    if (allBars.length) gsap.set(allBars, { x: "-100%" });
    if (allDots.length) gsap.set(allDots, { autoAlpha: 0 });

    ScrollTrigger.refresh();

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=800%",
            pin: true,
            pinSpacing: false,
            scrub: 1
        }
    });

    const exitY = "-2rem";
    const enterDuration = 1;
    const exitDuration = 0.8;
    const pauseDuration = 0.5;

    const animateStepIn = (stepId, position = "<") => {
        if (!cards[stepId]) return;

        const card = cards[stepId];
        const bar = bars[stepId];
        const stepDots = dots[stepId];

        let barX = "0%";
        if (stepId <= 4) {
            if (stepId === 1) barX = "-10%";
            if (stepId === 2) barX = "-20%";
            if (stepId === 3) barX = "-60%";
            if (stepId === 4) barX = "-80%";
        } else if (stepId <= 8) {
            if (stepId === 5) barX = "-70%";
            if (stepId === 6) barX = "-60%";
            if (stepId === 7) barX = "-10%";
            if (stepId === 8) barX = "-20%";
        } else {
            barX = "0%";
        }

        tl.to(card, { opacity: 1, y: 0, visibility: "visible", duration: enterDuration }, position);

        if (bar) {
            tl.to(bar, { x: barX, duration: enterDuration }, "<");
        }
        if (stepDots && stepDots.length) {
            tl.to(stepDots, { autoAlpha: 1, duration: enterDuration }, "<");
        }
    };

    const animateStepOut = (stepId, position = "<") => {
        if (!cards[stepId]) return;

        const card = cards[stepId];
        const stepDots = dots[stepId];

        tl.to(card, { opacity: 0, y: exitY, duration: exitDuration }, position);

        tl.set(card, { visibility: "hidden" });
    };

    if (cards[1]) animateStepIn(1);

    tl.to({}, { duration: 0.2 });
    if (cards[2]) animateStepIn(2);

    tl.to({}, { duration: pauseDuration });

    if (cards[1] || cards[2]) {
        tl.addLabel("exit1-2");
        if (cards[1]) animateStepOut(1, "exit1-2");
        if (cards[2]) animateStepOut(2, "exit1-2");
    }

    tl.to({}, { duration: 0.2 });

    if (cards[3]) { animateStepIn(3); }
    tl.to({}, { duration: 0.2 });
    if (cards[4]) { animateStepIn(4); }

    tl.to({}, { duration: pauseDuration });

    tl.to({}, { duration: 0.1, onStart: playRedMap, onReverseComplete: reverseRedMap });

    tl.to({}, { duration: 1 });

    if (cards[3] || cards[4]) {
        tl.addLabel("exit3-4");
        if (cards[3]) animateStepOut(3, "exit3-4");
        if (cards[4]) animateStepOut(4, "exit3-4");
    }

    tl.addLabel("phase2Start", "+=0.1");

    if (redMapSvg) tl.to(redMapSvg, { autoAlpha: 0.2, duration: 1, ease: "none" }, "phase2Start");
    if (redFillLayer) tl.to(redFillLayer, { autoAlpha: 0, duration: 1, ease: "none" }, "phase2Start");

    const phase1Dots = [...dots[1], ...dots[2], ...dots[3], ...dots[4]].filter(d => d);
    if (phase1Dots.length) {
        tl.to(phase1Dots, { autoAlpha: 0.2, duration: 1, ease: "none" }, "phase2Start");
    }

    if (infoSquare) tl.to(infoSquare, {
        backgroundColor: "#ffffff", duration: 0.5, ease: "none",
        onStart: () => {
            if (infoTitle) {
                infoTitle.innerHTML = '<span id="brand-s1-mobile" style="color:#62B0FF">KULBIT</span> <span id="brand-s2-mobile" style="color:#ffffff">AI-Elevated Production</span>';
                gsap.to("#brand-s1-mobile", { duration: 1, scrambleText: { text: "KULBIT", chars: "upperCase", speed: 0.3 } });
                gsap.to("#brand-s2-mobile", { duration: 1.5, delay: 0.2, scrambleText: { text: "AI-Elevated Production", chars: "upperCase", speed: 0.3 } });
            }
        },
        onReverseComplete: () => {
            if (infoTitle) infoTitle.textContent = originalTitleText;
        }
    }, "phase2Start");

    if (infoTitleWrapper) tl.to(infoTitleWrapper, { width: "100%", duration: 0.5, ease: "none" }, "<");

    tl.to({}, { duration: 0.2 });
    if (cards[5]) { animateStepIn(5); }
    tl.to({}, { duration: 0.2 });
    if (cards[6]) { animateStepIn(6); }
    tl.to({}, { duration: pauseDuration });

    if (cards[5] || cards[6]) {
        tl.addLabel("exit5-6");
        if (cards[5]) animateStepOut(5, "exit5-6");
        if (cards[6]) animateStepOut(6, "exit5-6");
    }
    tl.to({}, { duration: 0.2 });
    if (cards[7]) { animateStepIn(7); }
    tl.to({}, { duration: 0.2 });
    if (cards[8]) { animateStepIn(8); }
    tl.to({}, { duration: pauseDuration });

    tl.to({}, { duration: 0.1, onStart: playBlueMap, onReverseComplete: reverseBlueMap });

    tl.to({}, { duration: 1 });

    if (cards[7] || cards[8]) {
        tl.addLabel("exit7-8");
        if (cards[7]) animateStepOut(7, "exit7-8");
        if (cards[8]) animateStepOut(8, "exit7-8");
    }
    tl.to({}, { duration: 0.2 });
    if (cards[9]) { animateStepIn(9); }
    tl.to({}, { duration: 0.2 });
    if (cards[10]) { animateStepIn(10); }
    tl.to({}, { duration: pauseDuration });

    if (cards[9] || cards[10]) {
        tl.addLabel("exit9-10");
        if (cards[9]) animateStepOut(9, "exit9-10");
        if (cards[10]) animateStepOut(10, "exit9-10");
    }
    tl.to({}, { duration: 0.2 });
    if (cards[11]) { animateStepIn(11); }
    tl.to({}, { duration: 0.2 });
    if (cards[12]) { animateStepIn(12); }
    tl.to({}, { duration: pauseDuration });

    tl.to({}, { duration: 65 });
}

function initMobileServices() {

    const section = document.querySelector('.our-services');
    if (!section) return;

    const textWrapper = section.querySelector('.flex-v.gap--48-48-34');
    const cardsWrapper = section.querySelector('.our-services-cards-main-wrapper');
    const container = section.querySelector('.container.is-stiky');
    const cards = section.querySelectorAll('.our-services-cards-wrapper');
    const cardCount = cards.length;

    if (!textWrapper || !cardsWrapper) return;

    // timeline timeline:
    // - textWrapper tween: duration 1 (starts at 0)
    // - cardsWrapper y tween: duration 3 (starts at 0)
    // - cards x tween: starts at ">" => after max(1,3) => 3, duration 10
    // So cards x is animated only inside progress window [3/13 .. 1].
    const TEXT_WRAPPER_DUR = 1;
    const CARDS_Y_DUR = 3;
    const X_DUR = 10;
    const xStartTime = Math.max(TEXT_WRAPPER_DUR, CARDS_Y_DUR);
    const totalTime = xStartTime + X_DUR;
    const xStartRatio = totalTime > 0 ? xStartTime / totalTime : 0;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            // На мобілці плавне "доскролюване" часто виглядає як інерція.
            // Перемикаємося на scrub без числової затримки, щоб snap спрацьовував стабільніше.
            scrub: true,
            // "Липання" на мобілці: швидко підтягуємо до найближчої позиції картки.
            // Важливо: прив'язуємо snap лише до прогресу активного x-вікна.
            snap:
                cardCount > 1
                    ? {
                        // Щоб не було "двоетапного" підхоплення через інерцію:
                        // робимо snap майже миттєвим, тоді навіть якщо спрацьовує кілька разів,
                        // воно не виглядає як друга анімація.
                        duration: 0.08,
                        delay: 0,
                        ease: "none",
                        snapTo: (value) => {
                            const xActiveRange = 1 - xStartRatio;
                            if (xActiveRange <= 0) return value;

                            const xProgress = (value - xStartRatio) / xActiveRange;
                            const clampedX = gsap.utils.clamp(0, 1)(xProgress);
                            const step = 1 / (cardCount - 1);
                            const snappedX = gsap.utils.snap(step)(clampedX);
                            return xStartRatio + snappedX * xActiveRange;
                        }
                    }
                    : false,
        }
    });

    gsap.set(cardsWrapper, { display: "flex", flexWrap: "nowrap" });

    tl.to(textWrapper, {
        y: -50,
        autoAlpha: 0,
        duration: 1,
        ease: "power2.out"
    }, 0);

    tl.to(cardsWrapper, {
        y: () => {
            const containerRect = container.getBoundingClientRect();
            const cardsRect = cardsWrapper.getBoundingClientRect();

            const offset = parseFloat(getComputedStyle(document.documentElement).fontSize) * -3;

            return -(cardsRect.top - containerRect.top) + offset;
        },
        duration: 3,
        ease: "power2.out"
    }, 0);

    tl.to(cards, {
        x: () => {

            return -(cardsWrapper.scrollWidth - window.innerWidth + 20);
        },
        duration: 10,
        ease: "none"
    }, ">");
}

function initMobileBenefits() {
    const section = document.querySelector('.benefits');
    if (!section) return;

    const dashedLine = section.querySelector('.benefits-dashed-line.mobile-only svg');
    const graphSvgs = section.querySelectorAll('.benefits-graph-svg svg');
    const traditionalLineSvg = section.querySelectorAll('.traditional-line-svg svg');

    const drawTargets = [
        ...(dashedLine ? [dashedLine] : []),
        ...graphSvgs,
        ...traditionalLineSvg
    ];

    const circles = [
        section.querySelector('.benefits-circle[data-benefit-circle="1"]'),
        section.querySelector('.benefits-circle[data-benefit-circle="2"]'),
        section.querySelector('.benefits-circle[data-benefit-circle="3"]')
    ].filter(el => el);

    const redLine = section.querySelector('.benefits-color-line.is-red');
    const blueLines = section.querySelectorAll('.benefits-color-line:not(.is-red)');

    const weekLabels = section.querySelectorAll('.benefits-week.is-three, .benefits-week.if-four');
    const traditionalText = section.querySelectorAll('.taditional-text');
    const kulbitText = section.querySelector('.kulbit-text-wrapper');

    const textTargets = [...weekLabels, ...traditionalText, ...(kulbitText ? [kulbitText] : [])];

    if (drawTargets.length === 0) return;

    const hiddenClip = "inset(0% 100% 0% 0%)";
    const visibleClip = "inset(0% 0% 0% 0%)";

    gsap.set(drawTargets, { clipPath: hiddenClip, webkitClipPath: hiddenClip });

    gsap.set(circles, { opacity: 0 });

    if (redLine) gsap.set(redLine, { xPercent: -101 });
    if (blueLines.length) gsap.set(blueLines, { xPercent: -101 });

    gsap.set(textTargets, { autoAlpha: 0, y: 20 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 75%",
            markers: false
        }
    });

    tl.to(drawTargets, {
        clipPath: visibleClip,
        webkitClipPath: visibleClip,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0
    });

    if (circles.length > 0) {

        tl.to(circles[0], { opacity: 1, duration: 0.4 }, 0.2);

        if (circles[1]) tl.to(circles[1], { opacity: 1, duration: 0.4 }, 0.6);

        if (circles[2]) tl.to(circles[2], { opacity: 1, duration: 0.4 }, 1.0);
    }

    if (redLine) {
        tl.to(redLine, {
            xPercent: 0,
            duration: 1.0,
            ease: "power2.out"
        }, "-=0.2");
    }

    if (blueLines.length > 0) {
        tl.to(blueLines, {
            xPercent: 0,
            duration: 1.0,
            ease: "power2.out"
        }, "<+=0.4");
    }

    tl.to(textTargets, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    }, ">");
}

function initMobileBenefitsCards() {
    const section = document.querySelector('.benefits');
    const wrapper = document.querySelector('.benefits-cards-wrapper');

    const card1 = wrapper.querySelector('[data-benefit-card="1"]');
    const card2 = wrapper.querySelector('[data-benefit-card="2"]');
    const card3 = wrapper.querySelector('[data-benefit-card="3"]');

    if (!wrapper || !card1 || !card2 || !card3) return;

    gsap.set(wrapper, {
        position: 'sticky',
        height: '100vh',

        overflow: 'visible'
    });

    const cards = [card1, card2, card3];

    gsap.set(cards, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        transformOrigin: '50% 50%'
    });

    gsap.set(card1, { zIndex: 3, scale: 1 });

    gsap.set(card2, { zIndex: 2, scale: 0.5 });

    gsap.set(card3, { zIndex: 1, scale: 0.5 });

    gsap.set(section, { height: "300vh", position: "sticky" });

    const stickyTarget = section.querySelector('.benefits-main-content-wrapper') || wrapper;

    gsap.set(stickyTarget, {
        position: "sticky",
        top: "0px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 5
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: false,
            scrub: 1,

        }
    });

    tl.to(card1, {
        yPercent: 150,
        rotation: 5,

        duration: 1,
        ease: "power2.in"
    });

    tl.to(card2, {
        scale: 1,
        duration: 1,
        ease: "power1.inOut"
    }, "<");

    tl.to(card2, {
        yPercent: 150,
        rotation: 5,

        duration: 1,
        ease: "power2.in"
    });

    tl.to(card3, {
        scale: 1,
        duration: 1,
        ease: "power1.inOut"
    }, "<");
}

function initMobileStageHeading() {
    const heading = document.querySelector('.stage-pre-heading');
    if (!heading) return;

    const splitTextNodesRecursively = (element) => {
        [...element.childNodes].forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent;
                if (text.trim() === '') return;

                const newContent = document.createDocumentFragment();
                text.split('').forEach(char => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.style.opacity = '0';
                    span.style.transition = 'none';
                    span.dataset.animChar = "true";
                    newContent.appendChild(span);
                });
                element.replaceChild(newContent, child);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                splitTextNodesRecursively(child);
            }
        });
    };

    if (heading.querySelectorAll('[data-anim-char="true"]').length === 0) {
        splitTextNodesRecursively(heading);
    }

    const chars = heading.querySelectorAll('[data-anim-char="true"]');

    gsap.to(chars, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.02,
        ease: "none",
        scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            markers: false
        }
    });
}

function initMobileScrambleText() {
    const targets = document.querySelectorAll('[data-scramble="true"]');
    if (!targets.length) return;

    const lockHeight = (el) => {
        const h = el.getBoundingClientRect().height;
        const w = el.getBoundingClientRect().width;
        if (h > 0) {
            el.style.height = `${h}px`;
            el.style.width = `${w}px`;

        }
    };

    const splitTextNode = (node) => {
        const t = node.textContent || "";
        if (!t.length) return [];
        const m = t.match(/^(\s*)([\s\S]*?)(\s*)$/);
        const lead = m ? m[1] : "";
        const core = m ? m[2] : t;
        const trail = m ? m[3] : "";
        if (!core.trim().length) return [];
        const parent = node.parentNode;
        if (!parent) return [];
        const coreNode = document.createTextNode(core);
        const leadNode = lead ? document.createTextNode(lead) : null;
        const trailNode = trail ? document.createTextNode(trail) : null;
        if (leadNode) {
            node.textContent = lead;
            parent.insertBefore(coreNode, node.nextSibling);
            if (trailNode) parent.insertBefore(trailNode, coreNode.nextSibling);
        } else {
            parent.insertBefore(coreNode, node);
            if (trailNode) parent.insertBefore(trailNode, coreNode.nextSibling);
            parent.removeChild(node);
        }
        return [coreNode];
    };

    const getAllTextNodes = (root) => {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
        const nodes = [];
        let n;
        while ((n = walker.nextNode())) nodes.push(n);
        return nodes;
    };

    targets.forEach((el) => {
        lockHeight(el);

        const originalTextNodes = getAllTextNodes(el);
        const animNodes = [];
        originalTextNodes.forEach((n) => {
            const t = n.textContent || "";
            if (!t.trim().length) return;
            if (/^\s|\s$/.test(t)) {
                try {
                    const created = splitTextNode(n);
                    created.forEach((cn) => animNodes.push(cn));
                } catch (e) { }
            } else {
                animNodes.push(n);
            }
        });

        const items = animNodes
            .map((node) => ({ node, text: node.textContent || "" }))
            .filter((it) => it.text.trim().length);

        if (!items.length) return;

        items.forEach((it) => (it.node.textContent = ""));

        const startViewport = el.getAttribute("data-scramble-start") || "95%";
        const duration = parseFloat(el.getAttribute("data-scramble-duration") || "0.9");
        const stagger = parseFloat(el.getAttribute("data-scramble-stagger") || "0.06");

        const tl = gsap.timeline({
            paused: true,
            defaults: { ease: "none" },
            scrollTrigger: {
                trigger: el,
                start: `top ${startViewport}`,
                once: true,
                onEnter: () => tl.play(0),
            },
        });

        items.forEach((it, i) => {
            tl.to(
                it.node,
                {
                    duration,
                    scrambleText: {
                        text: it.text,
                        chars: "01!<>-_\\/[]{}—=+*^?#",
                        revealDelay: 0,
                        speed: 0.6,
                    },
                },
                i * stagger
            );
        });
    });
}

function initMobileStagesAnimation() {
    const section = document.querySelector('.stages');
    if (!section) return;

    const secondWrapper = section.querySelector('[data-anim-stage="second-wrapper"]');
    if (!secondWrapper) return;

    const card1 = secondWrapper.querySelector('[data-anim-card="1"]');
    const card2 = secondWrapper.querySelector('[data-anim-card="2"]');
    const card3 = secondWrapper.querySelector('[data-anim-card="3"]');

    if (!card1 && !card2 && !card3) return;

    // Individual move distances per card (in rem)
    const card1Rem = 2.5;
    const card2Rem = 5;
    const card3Rem = 3.5;

    // Convert rem to px for GSAP
    const remToPx = (rem) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

    // The total extra scroll distance needed for the animation (3 steps × 60vh each)
    const scrollPerStep = window.innerHeight * 0.6;
    const totalScroll = scrollPerStep * 3;

    // ─── Sticky-scroll wrapper pattern ───────────────────────────────────────
    // Wrap .stages in a spacer div that is tall enough to hold the animation.
    // The section itself stays sticky inside it, so the next section only
    // scrolls in AFTER the animation is complete.
    const sectionHeight = section.offsetHeight;

    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
        position: -webkit-sticky;
        position: sticky;
        top: 1.5rem;
        height: ${sectionHeight + totalScroll}px;
    `;

    // Insert wrapper before section, then move section inside it
    section.parentNode.insertBefore(wrapper, section);
    wrapper.appendChild(section);

    // Ensure the section is sticky inside the wrapper
    section.style.position = 'sticky';
    section.style.top = '0';
    // ─────────────────────────────────────────────────────────────────────────

    // Set initial states — cards start at y:0, fully visible
    const cards = [card1, card2, card3].filter(Boolean);
    gsap.set(cards, { y: 0, opacity: 1 });

    // Master timeline scrubbed to scroll — trigger is the WRAPPER, not the section
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: `bottom bottom`,
            scrub: 1,
            markers: false
        }
    });

    // Step 1 (0 → 1/3 of scroll): each card moves up by its own distance, card 1 fades out
    if (card1) tl.to(card1, { y: `-=${remToPx(card1Rem)}`, duration: 1, ease: "none" }, 0);
    if (card2) tl.to(card2, { y: `-=${remToPx(card2Rem)}`, duration: 1, ease: "none" }, 0);
    if (card3) tl.to(card3, { y: `-=${remToPx(card3Rem)}`, duration: 1, ease: "none" }, 0);

    if (card1) {
        tl.to(card1, { opacity: 0, duration: 0.5, ease: "none" }, 0.5);
    }

    // Step 2 (1/3 → 2/3 of scroll): each card moves up again, card 2 fades out
    if (card1) tl.to(card1, { y: `-=${remToPx(card1Rem)}`, duration: 1, ease: "none" }, 1);
    if (card2) tl.to(card2, { y: `-=${remToPx(card2Rem)}`, duration: 1, ease: "none" }, 1);
    if (card3) tl.to(card3, { y: `-=${remToPx(card3Rem)}`, duration: 1, ease: "none" }, 1);

    if (card2) {
        tl.to(card2, { opacity: 0, duration: 0.5, ease: "none" }, 1.5);
    }

    // Step 3 (2/3 → end of scroll): each card moves up one final time
    if (card1) tl.to(card1, { y: `-=${remToPx(card1Rem)}`, duration: 1, ease: "none" }, 2);
    if (card2) tl.to(card2, { y: `-=${remToPx(card2Rem)}`, duration: 1, ease: "none" }, 2);
    if (card3) tl.to(card3, { y: `-=${remToPx(card3Rem)}`, duration: 1, ease: "none" }, 2);

    // ─── Text / Image swap (same as desktop) ─────────────────────────────────
    const mainCard = section.querySelector('[data-anim-stage="main-card"]');
    if (!mainCard) return;

    // Lock the main card and every child element's dimensions so nothing
    // reflows during text/image swaps
    mainCard.style.height = mainCard.offsetHeight + 'px';
    mainCard.style.overflow = 'hidden';

    mainCard.querySelectorAll('*').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0) el.style.width = rect.width + 'px';
        if (rect.height > 0) el.style.height = rect.height + 'px';
        el.style.overflow = 'hidden';
    });

    const targetNumber = mainCard.querySelector('[data-stage-target="number"]');
    const targetHeading = mainCard.querySelector('[data-stage-target="heading"]');
    const targetParagraph = mainCard.querySelector('[data-stage-target="paragraph"]');
    const targetImage = mainCard.querySelector('[data-stage-target="image"]');

    const sourceNumber2 = section.querySelector('[data-stage-source="number-2"]');
    const sourceHeading2 = section.querySelector('[data-stage-source="heading-2"]');
    const sourceParagraph2 = section.querySelector('[data-stage-source="paragraph-2"]');
    const sourceImage2 = section.querySelector('[data-stage-source="image-2"]');

    const sourceNumber3 = section.querySelector('[data-stage-source="number-3"]');
    const sourceHeading3 = section.querySelector('[data-stage-source="heading-3"]');
    const sourceParagraph3 = section.querySelector('[data-stage-source="paragraph-3"]');
    const sourceImage3 = section.querySelector('[data-stage-source="image-3"]');

    // Stage line text elements (show/hide per step)
    const stage1Num = section.querySelector('[data-anim-stage-text="num-1"]');
    const stage1Title = section.querySelector('[data-anim-stage-text="title-1"]');
    const stage2Num = section.querySelector('[data-anim-stage-text="num-2"]');
    const stage2Title = section.querySelector('[data-anim-stage-text="title-2"]');
    const stage3Num = section.querySelector('[data-anim-stage-text="num-3"]');
    const stage3Title = section.querySelector('[data-anim-stage-text="title-3"]');

    // Lock dimensions of every element that changes text so nothing reflows
    const lockDimensions = (el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.width > 0) el.style.width = rect.width + 'px';
        if (rect.height > 0) el.style.height = rect.height + 'px';
        el.style.overflow = 'hidden';
    };
    [targetNumber, targetHeading, targetParagraph, stage1Num, stage1Title].forEach(lockDimensions);

    // Stage label texts per stage (read directly from the hidden source elements)
    const labelTexts = {
        1: {
            num: stage1Num ? stage1Num.textContent : '',
            title: stage1Title ? stage1Title.textContent : ''
        },
        2: {
            num: stage2Num ? stage2Num.textContent : '',
            title: stage2Title ? stage2Title.textContent : ''
        },
        3: {
            num: stage3Num ? stage3Num.textContent : '',
            title: stage3Title ? stage3Title.textContent : ''
        }
    };

    // Hide the is-second / is-3 duplicates — we only animate stage1Num/Title
    [stage2Num, stage2Title, stage3Num, stage3Title].filter(Boolean)
        .forEach(el => { el.style.display = 'none'; });

    // Helper: rewrite the visible num/title via typewriter to the target stage's text
    const showStageLabel = (stageIndex) => {
        const texts = labelTexts[stageIndex];
        if (!texts) return;
        if (stage1Num) typewriter(stage1Num, stage1Num.textContent, texts.num);
        if (stage1Title) typewriter(stage1Title, stage1Title.textContent, texts.title);
    };

    // Initial state is already stage 1 — no animation needed

    // Snapshot original stage-1 content
    const orig = {
        number: targetNumber ? targetNumber.textContent : "",
        headingSpan: (targetHeading && targetHeading.querySelector('span'))
            ? targetHeading.querySelector('span').textContent : "",
        paragraph: targetParagraph ? targetParagraph.textContent : "",
        imageSrc: targetImage ? targetImage.src : "",
        imageSrcset: targetImage ? targetImage.srcset : ""
    };

    // Helper: typewriter erase → retype on a DOM text node / element
    const typewriter = (target, fromText, toText) => {
        const tl = gsap.timeline();
        const eraseProxy = { len: fromText.length };
        tl.to(eraseProxy, {
            len: 0, duration: 0.4, ease: "none",
            onUpdate: () => { target.textContent = fromText.substring(0, Math.round(eraseProxy.len)); }
        });
        const typeProxy = { len: 0 };
        tl.to(typeProxy, {
            len: toText.length, duration: 0.6, ease: "none",
            onUpdate: () => { target.textContent = toText.substring(0, Math.round(typeProxy.len)); }
        });
        return tl;
    };

    // Helper: crossfade image swap
    const swapImage = (img, newSrc, newSrcset) => {
        if (!img) return;
        gsap.to(img, {
            opacity: 0, duration: 0.2, onComplete: () => {
                img.src = newSrc;
                if (newSrcset) img.srcset = newSrcset;
                gsap.to(img, { opacity: 1, duration: 0.2 });
            }
        });
    };

    // Helper: swap all content for a given stage
    const swapToStage = (num, headingSpan, paragraph, imgSrc, imgSrcset, stageIndex) => {
        if (targetNumber) typewriter(targetNumber, targetNumber.textContent, num);
        if (targetHeading) {
            const sp = targetHeading.querySelector('span');
            if (sp) typewriter(sp, sp.textContent, headingSpan);
        }
        if (targetParagraph) typewriter(targetParagraph, targetParagraph.textContent, paragraph);
        swapImage(targetImage, imgSrc, imgSrcset);

        // Rewrite stage line labels via typewriter
        showStageLabel(stageIndex);
    };

    // The wrapper scroll is divided into 3 equal thirds.
    // Step boundary 1 = at 1/3 of wrapper height from top of wrapper
    // Step boundary 2 = at 2/3 of wrapper height from top of wrapper
    const wrapperH = sectionHeight + totalScroll;
    const step1Offset = wrapperH / 3;
    const step2Offset = (wrapperH / 3) * 2;

    // ── Swap content the instant a card becomes fully invisible ──────────────
    // We hook into the main scrubbed timeline's onUpdate to watch card opacity.
    // The moment card1 opacity reaches 0 → swap to stage 2.
    // The moment card2 opacity reaches 0 → swap to stage 3.
    // Flags prevent repeated swaps on the same crossing.
    let stage2Swapped = false;
    let stage3Swapped = false;

    tl.eventCallback('onUpdate', () => {
        const card1Opacity = card1 ? gsap.getProperty(card1, 'opacity') : 1;
        const card2Opacity = card2 ? gsap.getProperty(card2, 'opacity') : 1;
        const isForward = tl.scrollTrigger ? tl.scrollTrigger.direction === 1 : true;

        // Card 1 fully gone → swap to stage 2
        if (isForward && !stage2Swapped && card1Opacity <= 0) {
            stage2Swapped = true;
            stage3Swapped = false;
            if (sourceNumber2 && sourceHeading2 && sourceParagraph2 && sourceImage2) {
                swapToStage(
                    sourceNumber2.textContent,
                    sourceHeading2.querySelector('span') ? sourceHeading2.querySelector('span').textContent : sourceHeading2.textContent,
                    sourceParagraph2.textContent,
                    sourceImage2.src, sourceImage2.srcset,
                    2
                );
            }
        }

        // Card 2 fully gone → swap to stage 3
        if (isForward && !stage3Swapped && card2Opacity <= 0) {
            stage3Swapped = true;
            if (sourceNumber3 && sourceHeading3 && sourceParagraph3 && sourceImage3) {
                swapToStage(
                    sourceNumber3.textContent,
                    sourceHeading3.querySelector('span') ? sourceHeading3.querySelector('span').textContent : sourceHeading3.textContent,
                    sourceParagraph3.textContent,
                    sourceImage3.src, sourceImage3.srcset,
                    3
                );
            }
        }

        // Scrolling back: card 2 reappears → restore stage 2
        if (!isForward && stage3Swapped && card2Opacity > 0) {
            stage3Swapped = false;
            if (sourceNumber2 && sourceHeading2 && sourceParagraph2 && sourceImage2) {
                swapToStage(
                    sourceNumber2.textContent,
                    sourceHeading2.querySelector('span') ? sourceHeading2.querySelector('span').textContent : sourceHeading2.textContent,
                    sourceParagraph2.textContent,
                    sourceImage2.src, sourceImage2.srcset,
                    2
                );
            }
        }

        // Scrolling back: card 1 reappears → restore stage 1
        if (!isForward && stage2Swapped && card1Opacity > 0) {
            stage2Swapped = false;
            swapToStage(
                orig.number, orig.headingSpan, orig.paragraph,
                orig.imageSrc, orig.imageSrcset,
                1
            );
        }
    });
    // ─────────────────────────────────────────────────────────────────────────
}

function initMobileTeamAnimation() {
    const section = document.querySelector('.team');
    if (!section) return;

    // ── ✏️ CONFIGURABLE: distance grids move upward ───────────────────────
    const GRID_MOVE_REM = '120rem'; // ← змінюй цей рядок
    // ─────────────────────────────────────────────────────────────────────

    const headLeft = section.querySelector('.team-head-left');
    const headRight = section.querySelector('.team-head-right');
    const headRightSecond = section.querySelector('.team-head-right-second');
    const cardsWrapper = section.querySelector('.team-cards-wrapper');
    const blurTop = section.querySelectorAll('.team-blur-top');
    const gridWrappers = section.querySelectorAll('[data-team-move="1"], [data-team-move="2"]');

    // ── Section stays sticky (never fixed) ───────────────────────────────
    // The parent provides the extra scroll height; section sticks at top.
    gsap.set(section, { position: 'sticky', top: 0 });
    const parent = section.parentElement;
    if (parent) gsap.set(parent, { minHeight: '1200vh' });

    // ── Initial states ────────────────────────────────────────────────────
    if (headRight) gsap.set(headRight, { opacity: 0, y: 60 });
    if (cardsWrapper) gsap.set(cardsWrapper, { opacity: 0, y: 60 });
    if (headRightSecond) gsap.set(headRightSecond, { opacity: 0 });
    if (blurTop.length) gsap.set(blurTop, { opacity: 0 });

    // ── Split headRightSecond into char spans for typewriter ─────────────
    const chars = [];
    if (headRightSecond) {
        const wrapChars = (node) => {
            [...node.childNodes].forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    const text = child.textContent;
                    if (!text) return;
                    const frag = document.createDocumentFragment();
                    [...text].forEach(ch => {
                        const s = document.createElement('span');
                        s.textContent = ch;
                        s.style.opacity = '0';
                        frag.appendChild(s);
                        chars.push(s);
                    });
                    child.replaceWith(frag);
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    wrapChars(child);
                }
            });
        };
        wrapChars(headRightSecond);
    }

    // ── Scrub timeline — trigger on parent, NO pin ────────────────────────
    const D = 10;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: parent || section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            markers: false
        }
    });

    // A) team-head-left slides up + fades out
    if (headLeft) {
        tl.to(headLeft, { y: -60, opacity: 0, duration: D * 0.15, ease: 'power2.in' }, 0);
        tl.set(headLeft, { display: 'none' }, D * 0.15);
    }

    // B) headRightSecond becomes visible, chars type in one by one
    if (headRightSecond) {
        tl.set(headRightSecond, { opacity: 1 }, D * 0.15);
        if (chars.length) {
            const charStagger = (D * 0.38) / chars.length;
            tl.to(chars, { opacity: 1, duration: 0.001, stagger: charStagger, ease: 'none' }, D * 0.15);
        }
    }

    // C) headRightSecond: quick fade out
    if (headRightSecond) {
        tl.to(headRightSecond, { opacity: 0, duration: D * 0.07, ease: 'power2.in' }, D * 0.55);
    }

    // D) team-head-right slides from bottom + opacity
    if (headRight) {
        tl.to(headRight, { opacity: 1, y: 0, duration: D * 0.12, ease: 'power2.out' }, D * 0.65);
    }

    // E) team-cards-wrapper with small delay
    if (cardsWrapper) {
        tl.to(cardsWrapper, { opacity: 1, y: 0, duration: D * 0.12, ease: 'power2.out' }, D * 0.72);
    }

    // F) team-blur-top fades in — small gap after cards wrapper
    if (blurTop.length) {
        tl.to(blurTop, { opacity: 1, duration: D * 0.08, ease: 'power2.out' }, D * 0.82);
    }

    // G) data-team-move grids scroll upward — faster movement, earlier start
    if (gridWrappers.length) {
        tl.to(gridWrappers, {
            y: `-${GRID_MOVE_REM}`,
            duration: D * 0.15, // Faster check
            ease: 'none'
        }, D * 0.85);
    }

    // H) Hold logic — big gap at the end where nothing happens (animation finished)
    // The previous total duration was around D (10). Adding D * 1.5 (15) makes total ~25.
    // So animation takes ~40% of scroll, rest is empty scroll.
    tl.to({}, { duration: D * 0.15 });
}

function initSmoothScrollMobile() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (!href || href === "#") return;

            const targetId = href.substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                // Small delay to ensure Webflow doesn't override
                setTimeout(() => {
                    const pinSpacer = target.closest(".pin-spacer");
                    const scrollTarget = pinSpacer || target;

                    // If it's the Home anchor or hero section, scroll to absolute top
                    if (targetId.toLowerCase() === 'home' || target.classList.contains('hero')) {
                        if (window.lenis) {
                            window.lenis.scrollTo(0, { offset: 0, immediate: false });
                        } else if (gsap.plugins.scrollTo) {
                            gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.out" });
                        } else {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                        return;
                    }

                    // Calculate direction based on target's position relative to the viewport.
                    // If top is positive, the target is below us (scrolling down).
                    const targetRectTop = scrollTarget.getBoundingClientRect().top;
                    const isScrollingDown = targetRectTop > 0;

                    // Get header height for offset, apply only if scrolling DOWN
                    const header = document.querySelector('.header');
                    const offsetAmount = (header && isScrollingDown) ? header.offsetHeight : 0;

                    if (window.lenis) {
                        // Lenis offset is negative to scroll less
                        window.lenis.scrollTo(scrollTarget, { offset: -offsetAmount, immediate: false });
                    }

                    else if (gsap.plugins.scrollTo) {
                        gsap.to(window, {
                            duration: 1,
                            scrollTo: { y: scrollTarget, offsetY: offsetAmount },
                            ease: "power2.out"
                        });
                    }

                    else {
                        // Native smooth scroll fallback with conditional offset
                        const targetPosition = targetRectTop + window.scrollY - offsetAmount;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    });
}

function initDynamicAnchorsMobile() {
    const anchorMap = {
        "Home": ".hero",
        "Clients": ".our-ambassadors",
        "Cases": ".cases",
        "Team": ".team",
        "what-we-provide": ".our-services",
        "Footer": ".footer"
    };

    // Note: This must run BEFORE GSAP ScrollTriggers are initialized so that the anchor is
    // placed before any pin-spacers are created. That way it naturally tracks the true top.
    document.querySelectorAll('.dynamic-anchor').forEach(el => el.remove());

    for (const [id, selector] of Object.entries(anchorMap)) {
        const section = document.querySelector(selector);
        if (section) {
            const existingId = document.getElementById(id);
            if (existingId && !existingId.classList.contains('dynamic-anchor')) {
                existingId.removeAttribute('id');
            }

            const anchor = document.createElement('div');
            anchor.id = id;
            anchor.classList.add('dynamic-anchor');
            // Insert in document flow with 0 height so it naturally tracks page resizes
            anchor.style.cssText = 'position: relative; top: 0; left: 0; width: 100%; height: 0; visibility: hidden; pointer-events: none; opacity: 0;';

            section.parentNode.insertBefore(anchor, section);
        }
    }
}

function initMobileMenuClose() {
    const menuWrapper = document.querySelector('.menu-wrapper');
    const burgerBtn = document.querySelector('.burger-button');

    if (!menuWrapper || !burgerBtn) return;

    // 1. Listen for clicks on links or buttons inside the menu
    const interactables = menuWrapper.querySelectorAll('a, button, [role="button"]');
    interactables.forEach(el => {
        el.addEventListener('click', () => {
            burgerBtn.click();
        });
    });

    // 2. Listen for clicks on the background (wrapper itself)
    menuWrapper.addEventListener('click', (e) => {
        // If the user clicked directly on the wrapper (the empty background)
        // and not on a child element, close the menu
        if (e.target === menuWrapper) {
            burgerBtn.click();
        }
    });
}

function initMobileCasesAnimation() {
    const section = document.querySelector('.cases');
    if (!section) return;

    const progressLine = section.querySelector('.progress-bar-cases-anim .progress-bar-white-line');
    const textCase = section.querySelector('.text-case');
    const cards = [
        section.querySelector('[data-case-video="1"]'),
        section.querySelector('[data-case-video="2"]'),
        section.querySelector('[data-case-video="3"]')
    ].filter(Boolean);

    // ── Helper: pause a card and restore its poster/button ───────────────
    function pauseCard(card) {
        if (!card) return;
        const nativeVideo = card.querySelector('video.vimeo-iframe');
        if (nativeVideo) { nativeVideo.pause(); nativeVideo.controls = false; }
        const iframe = card.querySelector('iframe.vimeo-iframe');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), '*');
        }
        const poster = card.querySelector('.video-poster');
        if (poster) { poster.style.display = ''; poster.style.opacity = '1'; poster.style.transition = 'none'; }
        const btn = card.querySelector('.vide-case-button');
        if (btn) { btn.style.display = ''; btn.style.opacity = '1'; btn.style.transition = 'none'; }
    }

    // ── Progress bar: top bottom → top top ───────────────────────────────
    if (progressLine) {
        gsap.set(progressLine, { xPercent: -100 });
        gsap.to(progressLine, {
            xPercent: 0, ease: 'none',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: 1 }
        });
    }

    // ── text-case: chars reveal on scroll ────────────────────────────────
    let textChars = [];
    if (textCase) {
        const raw = textCase.textContent;
        textCase.textContent = '';
        [...raw].forEach(ch => {
            const s = document.createElement('span');
            s.textContent = ch;
            textCase.appendChild(s);
            textChars.push(s);
        });
        gsap.set(textChars, { opacity: 0 });
    }
    if (textChars.length) {
        const D = 10;
        const tl = gsap.timeline({
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: 1 }
        });
        const charStagger = (D * 0.07) / textChars.length;
        tl.to(textChars, { opacity: 1, duration: 0.001, stagger: charStagger, ease: 'none' }, D * 0.20);
    }


    // ── Cards: slide in from bottom one by one ────────────────────────────
    cards.forEach(card => {
        gsap.set(card, { opacity: 0, y: 60 });

        ScrollTrigger.create({
            trigger: card,
            start: 'top 90%',
            onEnter: () => gsap.to(card, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }),
            onLeaveBack: () => {
                pauseCard(card);
                gsap.to(card, { opacity: 0, y: 60, duration: 0.5, ease: 'power2.in' });
            }
        });
    });

    // ── Pause all when .stages section reaches top of screen ─────────────
    const stagesSection = document.querySelector('.stages');
    if (stagesSection) {
        ScrollTrigger.create({
            trigger: stagesSection,
            start: 'top top',
            onEnter: () => cards.forEach(pauseCard)
        });
    }

    // ── Pause all when .our-services section enters ───────────────────────
    const servicesSection = document.querySelector('.our-services');
    if (servicesSection) {
        ScrollTrigger.create({
            trigger: servicesSection,
            start: 'top bottom',
            onEnter: () => cards.forEach(pauseCard)
        });
    }
}


document.addEventListener("DOMContentLoaded", () => {
    ScrollTrigger.matchMedia({
        "(min-width: 992px)": function () {
            initAnimations();
            initDynamicAnchors();
        },
        "(max-width: 991px)": function () {
            if (typeof initPreloader === "function") initPreloader();
            initDynamicAnchorsMobile();
            initMobileAnimations();
            initSmoothScrollMobile();
            initMobileMenuClose();
        }
    });
});
