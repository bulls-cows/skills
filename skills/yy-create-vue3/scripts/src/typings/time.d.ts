interface IdleDeadlineLike {
  didTimeout: boolean;
  timeRemaining: () => number;
}

type IdleCallbackLike = (deadline: IdleDeadlineLike) => void;
