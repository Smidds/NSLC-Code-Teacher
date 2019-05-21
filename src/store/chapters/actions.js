/**
 * Check whether the provided step is within the bounds of [0,0]
 * to the furthestStep.
 * @param {Vuex State} state From Vuex
 * @param {Array<number>} step The step array to test
 */
export function isValidStep ({ state }, step) {
  console.log('===   isValidStep   ===')
  console.log('  I think the following:')
  console.log(`    currentStep: ${state.currentStep}, furthestStep: ${state.furthestStep}`)
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
export async function getNextPage ({ state, commit }, step) {
  if (!hasNextPage({ state }, step)) {
    return null
  }

  let chapterIndex = step[0]
  let pageIndex = step[1]
  let pagesInChapter = state.chapters[chapterIndex].length

  if (pageIndex + 1 === pagesInChapter) {
    pageIndex = 0
    chapterIndex++
  } else {
    pageIndex++
  }

  let newPage = [chapterIndex, pageIndex]

  await commit('setStep', newPage)
  return newPage
}

/**
 * Get the previous page before a given step
 * @param {Vuex Context} context Provided by Vuex
 * @param {Array<number>} step The step to get the previous page of
 */
export async function getPrevPage ({ state, commit }, step) {
  if (!hasPrevPage(undefined, step)) {
    return null
  }

  let chapterIndex = step[0]
  let pageIndex = step[1]

  if (pageIndex === 0) {
    chapterIndex--
  } else {
    pageIndex--
  }

  let prevPage = [chapterIndex, pageIndex]

  await commit('setStep', prevPage)
  return prevPage
}

/**
 * Check if the specified step has a next page, or is at the end
 * @param {Vuex Context} context State context
 * @param {Array<number>} step The step to check if it has a next page
 */
function hasNextPage ({ state }, step) {
  let chapterIndex = step[0]
  let pageIndex = step[1]
  let furthestChapterIndex = state.furthestStep[0]
  let furthestPageIndex = state.furthestStep[1]

  if (chapterIndex === furthestChapterIndex && pageIndex === furthestPageIndex) {
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
