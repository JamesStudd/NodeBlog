import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FadeContent = ({
  children,
  container,
  blur = true,
  duration = 1000,
  ease = 'power2.out',
  delay = 2000,
  threshold = 0.1,
  initialOpacity = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power2.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  style,
  ignoreScrollTrigger = true, // new prop to always animate
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const getSeconds = val => (typeof val === 'number' && val > 10 ? val / 1000 : val);

    gsap.set(el, {
      autoAlpha: initialOpacity,
      filter: blur ? 'blur(10px)' : 'blur(0px)',
      willChange: 'opacity, filter, transform'
    });

    const tl = gsap.timeline({
      paused: true,
      delay: getSeconds(delay),
      onComplete: () => {
        if (onComplete) onComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            autoAlpha: initialOpacity,
            filter: blur ? 'blur(10px)' : 'blur(0px)',
            delay: getSeconds(disappearAfter),
            duration: getSeconds(disappearDuration),
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.()
          });
        }
      }
    });

    tl.to(el, {
      autoAlpha: 1,
      filter: 'blur(0px)',
      duration: getSeconds(duration),
      ease: ease
    });

    if (ignoreScrollTrigger) {
      tl.play(); // play immediately, ignoring scroll
    } else {
      let scrollerTarget = container || document.getElementById('snap-main-container') || null;
      if (typeof scrollerTarget === 'string') {
        scrollerTarget = document.querySelector(scrollerTarget);
      }

      const startPct = (1 - threshold) * 100;

      const st = ScrollTrigger.create({
        trigger: el,
        scroller: scrollerTarget || window,
        start: `top ${startPct}%`,
        once: true,
        onEnter: () => tl.play()
      });

      return () => {
        st.kill();
        tl.kill();
        gsap.killTweensOf(el);
      };
    }

    return () => {
      tl.kill();
      gsap.killTweensOf(el);
    };
  }, [
    blur,
    duration,
    ease,
    delay,
    threshold,
    initialOpacity,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete,
    container,
    ignoreScrollTrigger
  ]);

  return (
    <div ref={ref} className={className} style={style} {...props}>
      {children}
    </div>
  );
};

export default FadeContent;