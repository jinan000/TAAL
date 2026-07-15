import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════
// GSAP ANIMATION PRESETS
// ═══════════════════════════════════════════

export const revealFromBottom = (
  element: gsap.TweenTarget,
  trigger: Element,
  options?: { delay?: number; duration?: number; y?: number }
) => {
  return gsap.from(element, {
    opacity: 0,
    y: options?.y ?? 40,
    duration: options?.duration ?? 0.8,
    delay: options?.delay ?? 0,
    ease: 'power2.out',
    scrollTrigger: {
      trigger,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
};

export const staggerReveal = (
  elements: gsap.TweenTarget,
  trigger: Element,
  options?: { stagger?: number; y?: number; duration?: number }
) => {
  return gsap.from(elements, {
    opacity: 0,
    y: options?.y ?? 30,
    duration: options?.duration ?? 0.6,
    stagger: options?.stagger ?? 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
};

export const parallaxScroll = (
  element: gsap.TweenTarget,
  trigger: Element,
  yPercent: number = 15
) => {
  return gsap.to(element, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

export const scaleOnScroll = (
  element: gsap.TweenTarget,
  trigger: Element,
  fromScale: number = 0.9,
  toScale: number = 1
) => {
  return gsap.fromTo(
    element,
    { scale: fromScale, opacity: 0.5 },
    {
      scale: toScale,
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger,
        start: 'top 85%',
        end: 'top 30%',
        scrub: 1,
      },
    }
  );
};

export const textRevealByWord = (
  container: Element,
  options?: { stagger?: number }
) => {
  const words = container.querySelectorAll('.word');
  if (!words.length) return;

  return gsap.from(words, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: options?.stagger ?? 0.04,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
};

export const counterAnimation = (
  element: HTMLElement,
  endValue: number,
  duration: number = 2
) => {
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString();
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
};

// Split text into words wrapped in spans
export const splitTextIntoWords = (text: string): string => {
  return text
    .split(' ')
    .map((word) => `<span class="word inline-block">${word}</span>`)
    .join(' ');
};
