declare module 'aos' {
  interface AosOptions {
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    offset?: number;
    delay?: number;
    anchor?: string;
    anchorPlacement?: string;
    disable?: string | boolean | (() => boolean);
    startEvent?: string;
    initClassName?: string;
    animatedClassName?: string;
    useClassNames?: boolean;
    disableMutationObserver?: boolean;
    debounceDelay?: number;
    throttleDelay?: number;
  }

  function init(options?: AosOptions): void;
  function refresh(hard?: boolean): void;
  function refreshHard(): void;

  export default {
    init,
    refresh,
    refreshHard
  };
}