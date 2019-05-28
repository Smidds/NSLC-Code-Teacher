<template>
  <q-page padding>
    <div class="code-page q-ma-xl">
      <h2>{{ currentPage.title }}</h2>
      <div class="row">
        <div id="code" class="col-lg-6 col-grow q-pa-md">
          <h3>Code:</h3>
          <div class="code-editor-wrapper q-pa-xs shadow-2">
            <editor ref="codeEditor" v-model="editorCode" @init="editorInit" lang="c_cpp" theme="tomorrow" height="100%" width="100%" />
          </div>
        </div>
        <div id="instructions" class="col-lg-6 q-pa-md">
          <h3>Instructions:</h3>
          <p class="text-body1" v-html="currentPage.instructions"></p>
        </div>
      </div>
      <Quiz v-if="currentPage.quiz" />
      <div class="row justify-between full-width">
        <q-btn
          class="q-ma-lg q-pa-md text-h6"
          outline
          :disable="!hasPrevPage()"
          :color="getProperColor(hasPrevPage(), 'black', 'grey')"
          @click="prevPage()"
          label="Previous Step" />
        <q-btn
          class="q-ma-lg q-pa-md text-h6"
          outline
          :disable="!canGoNextPage()"
          :color="getProperColor(canGoNextPage(), 'primary', 'grey')"
          @click="nextPage()"
          label="Next Step" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import Quiz from '../components/Quiz'

export default {
  name: 'PageView',
  components: {
    editor: require('vue2-ace-editor'),
    Quiz: Quiz
  },
  data () {
    return {
      editorCode: ''
    }
  },
  computed: {
    ...mapGetters('chapters', [
      'currentPage'
    ]),
    ...mapState('chapters', [
      'currentStep',
      'furthestStep'
    ])
  },
  methods: {
    ...mapActions('chapters', [
      'loadNextPage',
      'loadPrevPage'
    ]),
    editorInit: function () {
      require('brace/ext/language_tools')
      require('brace/mode/c_cpp')
      require('brace/theme/tomorrow')
    },
    nextPage () {
      this.loadNextPage(this.currentStep).then(nextPage => {
        if (nextPage) {
          this.$router.push(`/step/${nextPage[0]}/${nextPage[1]}`)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    prevPage () {
      this.loadPrevPage(this.currentStep).then(prevPage => {
        if (prevPage) {
          this.$router.push(`/step/${prevPage[0]}/${prevPage[1]}`)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    hasNextPage () {
      let chapters = this.$store.state.chapters.chapters
      let chapterIndex = this.currentStep[0]
      let pageIndex = this.currentStep[1]
      let maxChapterIndex = chapters.length - 1
      let maxPageIndex = chapters[maxChapterIndex].pages.length - 1

      if (chapterIndex === maxChapterIndex && pageIndex === maxPageIndex) {
        return false
      } else {
        return true
      }
    },
    hasPrevPage () {
      let chapterIndex = this.currentStep[0]
      let pageIndex = this.currentStep[1]

      if (chapterIndex === 0 && pageIndex === 0) {
        return false
      } else {
        return true
      }
    },
    allQuestionsAnswered () {
      let quiz = this.currentPage.quiz
      return quiz === undefined || quiz.questions.length === quiz.questionsAnswered
    },
    getProperColor (isEnabled, enableColor, disableColor) {
      if (isEnabled) {
        return enableColor
      } else {
        return disableColor
      }
    },
    canGoNextPage () {
      return this.hasNextPage() && this.allQuestionsAnswered()
    },
    updateEditor () {
      this.editorCode = this.currentPage.code.slice(0)
    }
  },
  mounted () {
    let editor = this.$refs.codeEditor.editor

    editor.setReadOnly(true)
    editor.setFontSize(20)

    editor.setOptions({
      maxLines: Infinity,
      autoScrollEditorIntoView: true
    })

    this.updateEditor()

    window.onkeydown = event => {
      if ((event.keyCode === 37 || event.keyCode === 38) && this.hasPrevPage()) {
        this.prevPage()
      } else if ((event.keyCode === 39 || event.keyCode === 40) && this.canGoNextPage()) {
        this.nextPage()
      }
    }

    let prettifyScript = document.createElement('script')
    prettifyScript.setAttribute('src', 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js')
    prettifyScript.async = true
    document.head.appendChild(prettifyScript)
    this.slide = this.currentPage.quiz.questionsAnswered + 1
  },
  beforeUpdate () {
    this.updateEditor()
    if (window.PR) {
      window.PR.prettyPrint()
    }
  }
}
</script>

<style lang="scss">
code {
  background-color: #f2f2f2;
  border-radius: 3px;
  padding: 2px 2px;
}

.code-page h3 {
  margin-top: 0;
  font-size: 2.5rem;
}

.code-page .understanding-title {
  font-size: 2.4rem;
}

.code-page p {
  font-size: 18px;
  line-height: 28px;
}

.code-editor-wrapper {
  border: 1px solid black;
  border-radius: 5px;
}
</style>
