function isStepNewer (oldStep, newStep) {
  var oldChapter = oldStep[0]
  var oldPage = oldStep[1]
  var newChapter = newStep[0]
  var newPage = newStep[1]

  return oldChapter < newChapter ||
        (oldChapter <= newChapter &&
          oldPage < newPage)
}

export function setSteps (state, { furthestStep, currentStep }) {
  state.furthestStep = furthestStep
  state.currentStep = currentStep
}

export function updateFurthestStep (state, step) {
  let cleanStep = [Number(step[0]), Number(step[1])]
  if (isStepNewer(state.furthestStep, cleanStep)) {
    localStorage.setItem('furthestChapter', cleanStep[0])
    localStorage.setItem('furthestPage', cleanStep[1])
    state.furthestStep = cleanStep
  }
}

export function updateCurrentStep (state, step) {
  let cleanStep = [Number(step[0]), Number(step[1])]
  localStorage.setItem('currentChapter', cleanStep[0])
  localStorage.setItem('currentPage', cleanStep[1])
  state.currentStep = cleanStep
}
