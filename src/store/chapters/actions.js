export function chapterSelect (context, chapterIndex, pageIndex) {
  context.commit('setChapterIndex', chapterIndex)
  context.commit('setPageIndex', pageIndex)
}
