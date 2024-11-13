"use client";
import { animate, useInView, useIsomorphicLayoutEffect } from "framer-motion";
import React, { useRef } from "react";

type OdometerText = {
  value: string;
  valueDenominator?: string;
  suffixSymbol?: string;
  description: string;
};

const OdometerText = ({
  value,
  valueDenominator,
  suffixSymbol,
  description,
}: OdometerText) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const denominatorRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const denominatorInView = useInView(denominatorRef, { once: true });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    const denominatorElement = denominatorRef.current;
    const animationDuration = 1.5;

    if (!element) return;
    if (!inView) return;

    element.textContent = "0";
    if (valueDenominator) {
      denominatorElement!.textContent = "/0";
    }

    const controls = animate(0, parseInt(value), {
      duration: animationDuration,
      ease: "easeOut",
      onUpdate(animatedValue) {
        element.textContent = String(animatedValue.toFixed(0)) + suffixSymbol;
      },
    });

    if (valueDenominator) {
      const controls = animate(0, parseInt(valueDenominator), {
        duration: animationDuration,
        ease: "easeOut",
        onUpdate(value) {
          if (valueDenominator) {
            denominatorElement!.textContent =
              "/ " + String(value.toFixed(0)) + suffixSymbol;
          }
        },
      });
    }

    return () => {
      controls.stop();
    };
  }, [ref, inView, denominatorInView, value]);

  return (
    <div>
      <div>
        <div className="flex-center text-[55px] font-extrabold flex-center gap-0">
          <h2
            ref={ref}
            className="w-full text-[55px] font-extrabold flex-center"
          >
            {value}
            {suffixSymbol}
          </h2>
          {valueDenominator && (
            <span
              className="w-full text-[55px] font-extrabold flex-center"
              ref={denominatorRef}
            >
              / {valueDenominator}
              {suffixSymbol}
            </span>
          )}
        </div>

        <p className="font-medium">{description}</p>
      </div>
    </div>
  );
};

export default OdometerText;
