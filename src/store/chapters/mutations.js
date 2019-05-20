function isStepNewer (oldStep, newStep) {
  var oldChapter = oldStep[0]
  var oldPage = oldStep[1]
  var newChapter = newStep[0]
  var newPage = newStep[1]

  return oldChapter < newChapter ||
        (oldChapter <= newChapter &&
          oldPage < newPage)
}

export function setStep (state, step) {
  if (isStepNewer(state.currentStep, step)) {
    localStorage.setItem('farthestStep', step)
    state.farthestStep = step
  }

  localStorage.setItem('currentStep', step)
  state.currentStep = step
}
