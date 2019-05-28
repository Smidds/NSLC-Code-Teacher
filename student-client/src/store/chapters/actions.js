/**
 * Check whether the provided step is within the bounds of [0,0]
 * to the furthestStep.
 * @param {Object} context Chapter context, only using state
 * @param {Array<number>} step The step array to test
 */
export function isValidStep ({ state }, step) {
  var furthestChapter = state.furthestStep[0]
  var furthestPage = state.furthestStep[1]
  var testChapter = step[0]
  var testPage = step[1]

  return furthestChapter > testChapter ||
       (furthestChapter >= testChapter &&
        furthestPage >= testPage)
}

/**
 * Get the next page after a given step. Will return null if
 * the last page, or the new page array
 * @param {Object} context The chapter state and commit function
 * @param {Array<number>} step The step to get the next page of
 */
export async function loadNextPage ({ state, commit }, step) {
  if (!hasNextPage({ state }, step)) {
    return null
  }

  let chapterIndex = Number(step[0])
  let pageIndex = Number(step[1])
  let pagesInChapter = state.chapters[chapterIndex].pages.length

  if (pageIndex + 1 === pagesInChapter) {
    pageIndex = 0
    chapterIndex++
  } else {
    pageIndex++
  }

  let newPage = [chapterIndex, pageIndex]

  await commit('updateFurthestStep', newPage)
  return newPage
}

/**
 * Get the previous page before a given step
 * @param {Object} context Chapters state object
 * @param {Array<number>} step The step to get the previous page of
 */
export function loadPrevPage ({ state }, step) {
  if (!hasPrevPage(undefined, step)) {
    return null
  }

  let chapterIndex = Number(step[0])
  let pageIndex = Number(step[1])

  if (pageIndex === 0) {
    chapterIndex--
    pageIndex = state.chapters[chapterIndex].pages.length - 1
  } else {
    pageIndex--
  }

  return [chapterIndex, pageIndex]
}

/**
 * Attempt to load stepping state. If no step is found in localStorage,
 * default is set to [0, 0]
 * @param {Object} context Chapter state
 */
export function loadStepState ({ state, commit }) {
  let savedFurthest = [
    Number(localStorage.getItem('furthestChapter')),
    Number(localStorage.getItem('furthestPage'))
  ]
  let savedCurrent = [
    Number(localStorage.getItem('currentChapter')),
    Number(localStorage.getItem('currentPage'))
  ]

  if (!savedFurthest) {
    savedFurthest = [0, 0]
  }

  if (!savedCurrent) {
    state.currentStep = [0, 0]
  }

  commit('setSteps', { furthestStep: savedFurthest, currentStep: savedCurrent })
}

/**
 * Start over, resetting furthest and current step
 * @param {Object} context Chapter context, only using commit
 */
export function resetSteps ({ commit }) {
  commit('setSteps', { furthestStep: [0, 0], currentStep: [0, 0] })
}

/**
 * Reset the number of questions answered for all the quizzes
 * @param {Object} param0 Chapter context, only using state and commit
 */
export function resetQuizzes ({ state, commit }) {
  for (var cIndex = 0; cIndex < state.chapters.length; cIndex++) {
    for (var pIndex = 0; pIndex < state.chapters[cIndex].pages.length; pIndex++) {
      let page = state.chapters[cIndex].pages[pIndex]
      if (page.quiz && page.quiz.questionsAnswered !== 0) {
        commit('setQuestionsAnswered', { step: [cIndex, pIndex], questionsAnswered: 0 })
      }
    }
  }
}

/**
 * Increase the number of questions answered by one
 * @param {Object} context Chapter context, using state and commit
 */
export function nextQuestion ({ state, commit }) {
  commit('incrementQuestionsAnswered', state.currentStep)
}

/**
 * Check if the specified step has a next page, or is at the end
 * @param {Vuex Context} context State context
 * @param {Array<number>} step The step to check if it has a next page
 */
function hasNextPage ({ state }, step) {
  let chapters = state.chapters
  let chapterIndex = step[0]
  let pageIndex = step[1]
  let maxChapterIndex = chapters.length - 1
  let maxPageIndex = chapters[maxChapterIndex].pages.length - 1

  if (chapterIndex === maxChapterIndex && pageIndex === maxPageIndex) {
    return false
  } else {
    return true
  }
}

/**
 * Check if the specified step has a previous page or is at the start
 * @param {Object} context Chapter store context
 * @param {Array<number>} step The step to check if it has a previous page
 */
function hasPrevPage (context, step) {
  let chapterIndex = step[0]
  let pageIndex = step[1]

  if (chapterIndex === 0 && pageIndex === 0) {
    return false
  } else {
    return true
  }
}
