import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center text-5xl text-[#E8E8E3] px-8"
    >
      I am a{" "}
      <RotatingText
        texts={[
          "Developer",
          "Designer",
          "Creative Coder",
          "React Enthusiast",
          "UG Student",
        ]}
      />
    </section>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts,
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-120%", opacity: 0 },
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const containerRef = useRef(null);

  const splitIntoCharacters = (text) => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    if (splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    if (splitBy === "words") {
      return currentText.split(" ").map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }
    if (splitBy === "lines") {
      return currentText.split("\n").map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }));
    }

    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [texts, currentTextIndex, splitBy]);

  const getStaggerDelay = useCallback(
    (index, total) => {
      if (staggerFrom === "first" || staggerFrom === "start")
        return index * staggerDuration;
      if (staggerFrom === "last" || staggerFrom === "end")
        return (total - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor((total - 1) / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  const getGSAPVars = (vars) => ({
    yPercent: parseFloat(vars.y) || vars.y,
    opacity: vars.opacity,
  });

  const getEase = () => {
    if (transition.type === "spring") {
      return "elastic.out(1, 0.75)"; // Approximate spring effect
    }
    return "power1.inOut";
  };

  const animationDuration = 0.8; // Hardcoded duration; adjust as needed to match spring feel

  const handleIndexChange = useCallback(
    (newIndex) => {
      if (newIndex === currentTextIndex) return;

      const chars = containerRef.current.querySelectorAll(".rotating-element");
      if (chars.length === 0) {
        setCurrentTextIndex(newIndex);
        if (onNext) onNext(newIndex);
        return;
      }

      const totalChars = chars.length;
      gsap.to(chars, {
        ...getGSAPVars(exit),
        duration: animationDuration,
        ease: getEase(),
        stagger: (i) => getStaggerDelay(i, totalChars),
        onComplete: () => {
          setCurrentTextIndex(newIndex);
          if (onNext) onNext(newIndex);
        },
      });
    },
    [
      currentTextIndex,
      exit,
      animationDuration,
      getEase,
      getStaggerDelay,
      onNext,
    ]
  );

  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop
          ? 0
          : currentTextIndex
        : currentTextIndex + 1;
    handleIndexChange(nextIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex =
      currentTextIndex === 0
        ? loop
          ? texts.length - 1
          : currentTextIndex
        : currentTextIndex - 1;
    handleIndexChange(prevIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(
    (index) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      handleIndexChange(validIndex);
    },
    [texts.length, handleIndexChange]
  );

  const reset = useCallback(() => {
    handleIndexChange(0);
  }, [handleIndexChange]);

  useImperativeHandle(
    ref,
    () => ({
      next,
      previous,
      jumpTo,
      reset,
    }),
    [next, previous, jumpTo, reset]
  );

  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  useLayoutEffect(() => {
    const chars = containerRef.current.querySelectorAll(".rotating-element");
    if (chars.length === 0) return;

    const totalChars = chars.length;
    gsap.fromTo(chars, getGSAPVars(initial), {
      ...getGSAPVars(animate),
      duration: animationDuration,
      ease: getEase(),
      stagger: (i) => getStaggerDelay(i, totalChars),
    });
  }, [
    currentTextIndex,
    initial,
    animate,
    animationDuration,
    getEase,
    getStaggerDelay,
  ]);

  return (
    <span
      ref={containerRef}
      className={cn(
        " flex flex-wrap whitespace-pre-wrap relative overflow-hidden",
        mainClassName
      )}
      {...rest}
    >
      <span className="sr-only">{texts[currentTextIndex]}</span>
      <span
        className={cn(
          splitBy === "lines"
            ? "flex flex-col w-full"
            : "flex flex-wrap whitespace-pre-wrap relative"
        )}
        aria-hidden="true"
      >
        {elements.map((wordObj, wordIndex, array) => {
          return (
            <span
              key={wordIndex}
              className={cn("inline-flex", splitLevelClassName)}
            >
              {wordObj.characters.map((char, charIndex) => (
                <span
                  key={charIndex}
                  className={cn(
                    "inline-block rotating-element",
                    elementLevelClassName
                  )}
                >
                  {char}
                </span>
              ))}
              {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
            </span>
          );
        })}
      </span>
    </span>
  );
});
