<template>
  <div class="col-12 col-grow q-pa-md">
    <h3 class="understanding-title">Check Your Understanding</h3>
    <q-carousel
      animated
      transition-next="slide-left"
      v-model="slide"
      ref="carousel"
      height="auto"
    >
      <q-carousel-slide v-for="(question, qIndex) in currentQuiz.questions" :key="qIndex" :name="qIndex" >
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ question.instructions }}</div>
            <div class="code-editor-wrapper q-pa-sm shadow-2 q-my-lg">
              <editor ref="quizEditor" v-model="quizAnswer" @init="editorInit" lang="c_cpp" theme="tomorrow" height="100%" width="100%" />
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide :name="currentQuiz.questions.length">
        <q-card >
          <q-card-section>
            <div class="text-h3 text-green">
              All questions answered correctly!
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
    </q-carousel>
    <div class="q-pa-sm q-mb-lg">
      <q-btn
        v-if="questionsRemain"
        push :color="incorrectAnswer ? 'red' : 'green'" text-color="white" :icon="incorrectAnswer ? 'error_outlines' : 'done'" :label="incorrectAnswer ? 'Incorrect!' : 'Check Answer'"
        :class="'float-right animated slow-anim' + (incorrectAnswer ? ' shake': '')"
        @click="checkAnswer()"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { setTimeout } from 'timers'

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
    },
    questionsRemain () {
      return this.currentQuiz.questions.length > this.currentQuiz.questionsAnswered
    }
  },
  data () {
    return {
      quizAnswer: '',
      quizAnswerPlaceholder: '',
      incorrectAnswer: false
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
        maxLines: Infinity,
        minLines: 1,
        wrap: true,
        autoScrollEditorIntoView: true
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
        this.incorrectAnswer = false
      } else {
        this.incorrectAnswer = true

        setTimeout(() => {
          this.incorrectAnswer = false
        }, 1500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slow-anim {
  animation-duration: 0.5s;
}
</style>
