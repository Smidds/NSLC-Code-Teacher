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
  console.log('==  Setting step  ==')
  if (isStepNewer(state.furthestStep, step)) {
    console.log('Step is farther')
    localStorage.setItem('farthestStep', step)
    state.furthestStep = step
  }

  console.log('Setting current Step')
  localStorage.setItem('currentStep', step)
  state.currentStep = step
}
