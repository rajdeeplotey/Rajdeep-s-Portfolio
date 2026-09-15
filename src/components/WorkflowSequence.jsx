import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 78;

function getFramePath(index) {
  const frameNumber = String(index + 1).padStart(4, "0");
  return `/sequences/workflow-dark-webp/frame-${frameNumber}.webp`;
}

export default function WorkflowSequence() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");

    const images = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const image = new Image();
      image.decoding = "async";
      image.fetchPriority = index === 0 ? "high" : "auto";
      return image;
    });

    const loadedFrames = new Set();
    let fallbackFrame = -1;
    const playhead = { frame: 0 };

    const drawFrame = (index) => {
      const requestedIndex = Math.max(0, Math.min(FRAME_COUNT - 1, index));
      const availableIndex = loadedFrames.has(requestedIndex)
        ? requestedIndex
        : fallbackFrame;
      const image = images[availableIndex];

      if (!image?.naturalWidth || !image.naturalHeight) return;

      const containerWidth = canvas.clientWidth;
      const containerHeight = canvas.clientHeight;
      const sourceWidth = image.naturalWidth;
      const sourceHeight = image.naturalHeight;
      const isMobile = window.matchMedia("(max-width: 800px), (max-height: 500px) and (pointer: coarse)").matches;
      const scale = isMobile
        ? Math.min(
          containerWidth / sourceWidth,
          containerHeight / sourceHeight,
        )
        : Math.max(
          containerWidth / sourceWidth,
          containerHeight / sourceHeight,
        );
      const drawWidth = sourceWidth * scale;
      const drawHeight = sourceHeight * scale;
      const offsetX = (containerWidth - drawWidth) / 2;
      const offsetY = (containerHeight - drawHeight) / 2;

      ctx.clearRect(0, 0, containerWidth, containerHeight);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, containerWidth, containerHeight);
      ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    };

    const updateTypography = (progress) => {
      gsap.set(overlayRef.current, {
        autoAlpha: 1 - (0.84 * progress),
        y: -64 * progress,
        scale: 1 - (0.04 * progress),
      });
    };

    const updateTypographyFromScroll = () => {
      const pinSpacer = section.parentElement;
      const start = pinSpacer?.offsetTop || section.offsetTop;
      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / 5000));
      updateTypography(progress);
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      drawFrame(Math.round(playhead.frame));
      updateTypographyFromScroll();
    };

    images.forEach((image, index) => {
      image.addEventListener("load", () => {
        loadedFrames.add(index);
        if (fallbackFrame === -1) fallbackFrame = index;
        drawFrame(Math.round(playhead.frame));
      }, { once: true });
      image.src = getFramePath(index);
    });

    resizeCanvas();

    const animation = gsap.to(playhead, {
      frame: FRAME_COUNT - 1,
      ease: "none",

      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=5000",
        scrub: true,
        pin: true,
      },

      onUpdate: () => {
        drawFrame(Math.round(playhead.frame));
      },
    });

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", updateTypographyFromScroll, { passive: true });
    updateTypographyFromScroll();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", updateTypographyFromScroll);
      animation.kill();

      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      images.forEach((image) => {
        image.src = "";
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="workflow-sequence"
    >
      <div ref={overlayRef} className="workflow-overlay">
        <p className="workflow-label">
          FULL-STACK DEVELOPER
        </p>

        <h2>
          I build digital experiences
          <br />
          that move with your ideas.
        </h2>

        <p className="workflow-description">
          Modern web applications, intelligent workflows,
          and scalable digital products — from concept to deployment.
        </p>

      </div>

      <canvas
        ref={canvasRef}
        className="workflow-canvas"
      />
    </section>
  );
}