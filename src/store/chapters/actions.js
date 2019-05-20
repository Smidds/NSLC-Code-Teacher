export function isValidStep (context, step) {
  var fartherChapter = context.state.furthestStep[0]
  var farthestPage = context.state.furthestStep[1]
  var testChapter = step[0]
  var testPage = step[1]

  return fartherChapter > testChapter ||
       (fartherChapter >= testChapter &&
        farthestPage >= testPage)
}
