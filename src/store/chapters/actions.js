/**
 * Check whether the provided step is within the bounds of [0,0]
 * to the furthestStep.
 * @param {Vuex State} state From Vuex
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
 * @param {Object} state The chapter state
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
 * @param {Object} state` Chapter state
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
