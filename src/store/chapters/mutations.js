function isStepNewer (oldStep, newStep) {
  var oldChapter = oldStep[0]
  var oldPage = oldStep[1]
  var newChapter = newStep[0]
  var newPage = newStep[1]

  return oldChapter < newChapter ||
        (oldChapter <= newChapter &&
          oldPage < newPage)
}

export function updateFurthestStep (state, step) {
  let cleanStep = [Number(step[0]), Number(step[1])]
  if (isStepNewer(state.furthestStep, cleanStep)) {
    localStorage.setItem('furthestStep', cleanStep)
    state.furthestStep = cleanStep
  }
}

export function updateCurrentStep (state, step) {
  let cleanStep = [Number(step[0]), Number(step[1])]
  localStorage.setItem('currentStep', cleanStep)
  state.currentStep = cleanStep
}
