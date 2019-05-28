export function currentChapterIndex (state) {
  return state.currentStep[0]
}

export function currentPageIndex (state) {
  return state.currentStep[1]
}

export function furthestChapterIndex (state) {
  return state.furthestStep[0]
}

export function furthestPageIndex (state) {
  return state.furthestStep[1]
}

export function getChapters (state) {
  return state.chapters
}

export function currentQuiz (state) {
  let page = currentPage(state)
  return page.quiz
}

export function currentPage (state) {
  let chapterIndex = state.currentStep[0]
  let pageIndex = state.currentStep[1]

  let chapter = state.chapters[chapterIndex]
  return chapter.pages[pageIndex]
}
