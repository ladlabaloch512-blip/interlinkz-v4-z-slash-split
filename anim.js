/* Interlinkz Variant 4 animation layer.
   Desktop only. Everything uses gsap.from so the resting state is the
   finished page: with GSAP missing, or on mobile, the page simply
   shows its final state. Animation never gates content.
   Every ScrollTrigger tween sets immediateRender: false, so nothing
   is pre-hidden: each element sits fully visible in its final state
   until its animation moment arrives, then plays and settles back to
   that same visible state. A fresh load with no scrolling, and a jump
   straight to the bottom, both show the complete page. */
(function () {
  var desktop = window.matchMedia("(min-width: 1024px)").matches;
  if (!desktop || !window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  /* D4 frame sequence: the yellow slash band sweeps in from the left,
     then the chain words travel in along it one by one. */
  var band = document.querySelector(".slash-band");
  if (band) {
    gsap.fromTo(band,
      { clipPath: "inset(-20% 100% -20% 0)" },
      { clipPath: "inset(-20% 0% -20% 0)", duration: 1.05, ease: "power3.out", delay: 0.15 });
    gsap.from(".slash-band .in > *", {
      y: 18, opacity: 0, duration: 0.5, stagger: 0.13, delay: 0.55, ease: "power2.out", clearProps: "all"
    });
  }

  /* Thin slash bars sweep across on scroll. */
  gsap.utils.toArray(".slash-thin .bar, .zslash").forEach(function (el) {
    gsap.from(el, {
      x: -70, opacity: 0, duration: 0.8, ease: "power2.out", immediateRender: false,
      scrollTrigger: { trigger: el, start: "top 92%" }
    });
  });

  /* Split slash (Branding): the two wedges slide together. */
  var split = document.querySelector(".split-slash");
  if (split) {
    gsap.from(".split-slash .y", { x: -60, opacity: 0, duration: 0.7, ease: "power2.out", immediateRender: false, scrollTrigger: { trigger: split, start: "top 92%" } });
    gsap.from(".split-slash .k", { x: 60, opacity: 0, duration: 0.7, ease: "power2.out", immediateRender: false, scrollTrigger: { trigger: split, start: "top 92%" } });
  }

  /* Service cards and boxes rise in a short stagger. */
  gsap.utils.toArray("[data-joins]").forEach(function (row) {
    gsap.from(row.children, {
      y: 22, opacity: 0, duration: 0.55, stagger: 0.09, ease: "power2.out", immediateRender: false,
      scrollTrigger: { trigger: row, start: "top 88%" }, clearProps: "transform,opacity"
    });
  });

  /* The chain Z on Services: links lock together in sequence. */
  gsap.utils.toArray(".zlink").forEach(function (el, i) {
    gsap.from(el, {
      scale: 0.4, opacity: 0, transformOrigin: "50% 50%", duration: 0.45, delay: i * 0.14, immediateRender: false,
      ease: "back.out(2)", scrollTrigger: { trigger: ".zchain", start: "top 85%" }
    });
  });

  /* Node diagrams: dots light in sequence, then a pulse travels. */
  gsap.utils.toArray("[data-nodes]").forEach(function (scope) {
    var nodes = scope.querySelectorAll(".pnode");
    if (!nodes.length) return;
    gsap.from(nodes, {
      scale: 0, transformOrigin: "50% 50%", duration: 0.4, stagger: 0.12, ease: "back.out(2.2)", immediateRender: false,
      scrollTrigger: { trigger: scope, start: "top 88%" }
    });
    gsap.to(nodes, {
      scale: 1.3, duration: 0.5, stagger: { each: 0.35, repeat: -1, yoyo: false },
      repeat: -1, ease: "sine.inOut", delay: 1.2, yoyo: true, repeatDelay: 2.2
    });
  });

  /* Portfolio giant Z slides in from the right edge. */
  var bigz = document.querySelector(".pf4-hero .bigz");
  if (bigz) gsap.from(bigz, { x: 110, duration: 1, ease: "power3.out", delay: 0.1 });

  /* Contact giant Z settles in. */
  var cz = document.querySelector(".contact4 .bigz-bg");
  if (cz) gsap.from(cz, { opacity: 0, duration: 1.1, ease: "power1.out" });
})();
