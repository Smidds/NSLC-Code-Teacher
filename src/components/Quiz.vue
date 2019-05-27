<template>
  <div class="col-12 col-grow q-pa-md">
    <h3 class="understanding-title">Check Your Understanding</h3>
    <q-carousel
      animated
      transition-next="slide-left"
      v-model="slide"
      ref="carousel"
      height="200px"
    >
      <q-carousel-slide v-for="(question, qIndex) in currentQuiz.questions" :key="qIndex" :name="qIndex" >
        <q-card
          class="shadow-2"
        >
          <q-card-section>
            <div class="text-h6">{{ question.instructions }}</div>
            <div class="code-editor-wrapper q-pa-xs">
              <editor ref="quizEditor" v-model="quizAnswer" @init="editorInit" lang="c_cpp" theme="tomorrow" height="100%" width="100%" />
            </div>
            <q-btn
              push color="green" text-color="black" icon="done" label="Check Answer"
              @click="checkAnswer()"
            />
          </q-card-section>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide :name="currentQuiz.questions.length">
        <q-card class="shadow-2">
          <q-card-section>
            <div class="text-h3 text-green">
              All questions answered correctly!
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Quiz',
  components: {
    editor: require('vue2-ace-editor')
  },
  computed: {
    ...mapGetters('chapters', [
      'currentQuiz'
    ]),
    slide: {
      get () {
        return this.currentQuiz.questionsAnswered
      },
      set (val) {
        this.nextQuestion()
      }
    }
  },
  data () {
    return {
      quizAnswer: '/*  Your Answer Here!  */',
      quizAnswerPlaceholder: '/*  Your Answer Here!  */'
    }
  },
  methods: {
    ...mapActions('chapters', [
      'nextQuestion'
    ]),
    editorInit: function (editor) {
      require('brace/ext/language_tools')
      require('brace/mode/c_cpp')
      require('brace/theme/tomorrow')

      editor.setOptions({
        maxLines: Infinity
      })

      editor.setFontSize(20)
    },
    checkAnswer () {
      let question = this.currentQuiz.questions[this.slide]
      if (question.correctAnswers.some(answer => {
        return answer === this.quizAnswer
      })) {
        this.quizAnswer = this.quizAnswerPlaceholder
        this.$refs.carousel.next()
      }
    }
  }
}
</script>

<style>

</style>
