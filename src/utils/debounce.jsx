let timerId;

export const debounceFunction = function (func, delay) {
  clearTimeout(timerId);
  timerId = setTimeout(func, delay);
};
