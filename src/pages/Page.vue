<template>
  <div class="q-ma-lg">
    <h1>{{ currentPage.title }}</h1>
    <div class="row">
      <div id="code" class="col-6 q-pa-md">
        <h3>Code:</h3>
        <editor ref="codeEditor" v-model="editorCode" @init="editorInit" lang="c_cpp" theme="tomorrow" height="300px" width="100%" />
      </div>
      <div id="instructions" class="col-6 q-pa-md">
        <h3>Instructions:</h3>
        <p class="text-body1">{{ currentPage.instructions }}</p>
      </div>
    </div>
    <div class="row justify-between full-width">
      <q-btn
        class="q-ma-lg q-pa-md text-h6"
        outline
        :disable="!hasPrevPage()"
        @click="prevPage()"
        label="Previous Step" />
      <q-btn
        class="q-ma-lg q-pa-md text-h6"
        outline
        :disable="!hasNextPage()"
        color="primary"
        @click="nextPage()"
        label="Next Step" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'PageView',
  components: {
    editor: require('vue2-ace-editor')
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
      let chapterIndex = this.currentStep[0]
      let pageIndex = this.currentStep[1]
      let furthestChapterIndex = this.furthestStep[0]
      let furthestPageIndex = this.furthestStep[1]

      if (chapterIndex === furthestChapterIndex && pageIndex === furthestPageIndex) {
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
    }
  },
  mounted () {
    this.editorCode = this.currentPage.code.slice(0)
    let editor = this.$refs.codeEditor.editor

    editor.setReadOnly(true)
    editor.setFontSize(25)
  },
  beforeUpdate () {
    this.editorCode = this.currentPage.code.slice(0)
  }
}
</script>
