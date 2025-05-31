export const callNativeJsBridge = (
  params: { qid: number; answer: (string | number)[] }[],
) => {
  window.location.href = `jsbridge://submitAnswers?p=${encodeURIComponent(JSON.stringify(params))}`;
};
