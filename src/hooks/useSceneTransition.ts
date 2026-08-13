import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  JaamScene,
  SceneTransitionPhase,
} from "../types/scene";
import { useReducedMotion } from "./useReducedMotion";

const EXIT_DURATION = 430;
const ENTER_DURATION = 420;

interface SceneTransitionResult {
  currentScene: JaamScene;
  previousScene: JaamScene | null;
  phase: SceneTransitionPhase;
  isTransitioning: boolean;
  transitionTo: (scene: JaamScene) => void;
}

export function useSceneTransition(
  initialScene: JaamScene,
): SceneTransitionResult {
  const [currentScene, setCurrentScene] = useState(initialScene);
  const [previousScene, setPreviousScene] =
    useState<JaamScene | null>(null);
  const [phase, setPhase] =
    useState<SceneTransitionPhase>("idle");

  const currentSceneRef = useRef(initialScene);
  const transitionId = useRef(0);
  const timers = useRef<number[]>([]);
  const reducedMotion = useReducedMotion();

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const transitionTo = useCallback(
    (nextScene: JaamScene) => {
      const current = currentSceneRef.current;

      if (nextScene.track.id === current.track.id) return;

      transitionId.current += 1;
      const id = transitionId.current;
      clearTimers();

      if (reducedMotion) {
        currentSceneRef.current = nextScene;
        setPreviousScene(null);
        setCurrentScene(nextScene);
        setPhase("idle");
        return;
      }

      setPreviousScene(current);
      setPhase("exiting");

      const swapTimer = window.setTimeout(() => {
        if (id !== transitionId.current) return;

        currentSceneRef.current = nextScene;
        setCurrentScene(nextScene);
        setPhase("entering");

        const finishTimer = window.setTimeout(() => {
          if (id !== transitionId.current) return;
          setPreviousScene(null);
          setPhase("idle");
        }, ENTER_DURATION);

        timers.current.push(finishTimer);
      }, EXIT_DURATION);

      timers.current.push(swapTimer);
    },
    [clearTimers, reducedMotion],
  );

  useEffect(() => {
    currentSceneRef.current = currentScene;
  }, [currentScene]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  return {
    currentScene,
    previousScene,
    phase,
    isTransitioning: phase !== "idle",
    transitionTo,
  };
}
