# Frame sequences

Place optimized WebP frames in the matching project folder using a zero-padded naming scheme:

```text
frame-0001.webp
frame-0002.webp
frame-0003.webp
```

`ScrollSequence` reads these files in order and scrubs them against scroll position with GSAP ScrollTrigger. Keep source videos and extraction scripts outside `public/`; only delivery-ready frames belong here.
