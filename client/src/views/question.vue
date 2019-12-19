<template>
  <q-page class="flex">
    <q-card class="my-card">
      <q-card-section class="bg-orange-5 text-white">
        <div class="text-h6">{{question.title}}</div>
        <div class="text-subtitle2">by {{question.user.username}}</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row">
          <q-item-section top class="col-1 gt-sm lem">
            <q-btn
              size="20px"
              flat
              round
              color="grey"
              icon="keyboard_arrow_up"
              @click="upvote"
              style="margin:0px;"
            />

            <p
              rounded
              size="12px"
              style="margin: 0 0 0 25px; font-weight:bolder;"
            >{{question.score}}</p>

            <q-btn
              size="20px"
              flat
              color="grey"
              round
              icon="keyboard_arrow_down"
              @click="downvote"
              style="margin-bottom:20px;"
            />
          </q-item-section>
          <div class="column">
            <div v-html="question.question"></div>
          </div>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="text-h6">List Answers:</div>
        <Answer
          v-for="answer in question.answer"
          :key="answer._id"
          :answer="answer"
          @fetchRequest="toFetch"
        ></Answer>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="text-h6">Your Answer :</div>
        <q-editor
          v-model="qeditor"
          :dense="$q.screen.lt.md"
          :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
        ['undo', 'redo'],
        ['viewsource']
      ]"
          :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
        />
      </q-card-section>
      <q-card-section>
        <q-btn
          @click.prevent="addanswer(question._id)"
          color="orange"
          icon-right="send"
          label="Submit Your Answer"
        />
      </q-card-section>
      {{question}}
    </q-card>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import Answer from "../components/Answer";
import Swal from "sweetalert2";
import jwt from "jsonwebtoken";
export default {
  data() {
    return {
      qeditor: "",
      name: "readQuestion",
      question: {},
      answer: "",
      flagColor: null,
      colorUpvote: "grey-10",
      colorDownvote: "grey-10"
    };
  },
  computed: {
    ...mapState(["questions", "isLogin"])
  },
  components: {
    Answer
  },
  watch: {
    question() {
      return this.$store.dispatch("question", this.question._id);
    }
  },
  methods: {
    answerAsycn() {
      this.$store
        .dispatch("answer", {
          questionId: this.question._id,
          answer: this.answer
        })
        .then(data => {
          this.answer = "";
          this.fetch();
        });
    },
    addanswer(id) {
      let payload = {
        id: id,
        description: this.qeditor
      };
      this.$store
        .dispatch("answer", payload)
        .then(data => {
          Swal.fire({
            title: "success",
            icon: "success",
            text: "success add answers"
          });
          this.$store.dispatch("question", this.question._id);
        })
        .catch(err => {
          this.next(err);
        });
    },
    upvote(id) {
      this.$store
        .dispatch("upvote", id)
        .then(data => {
          console.log("masuuuukkkkk");
          this.$store.dispatch("upvoteQuestion", this.question._id);
        })
        .catch(err => {
          this.next(err);
        });
    },
    downvote(id) {
      this.$store
        .dispatch("downvote", id)
        .then(data => {
          this.$store.dispatch("downvoteQuestion", this.question._id);
        })
        .catch(err => {
          this.next(err);
        });
    },
    fetch() {
      let user = jwt.verify(localStorage.getItem("token"), "rahasia");
      let id = user._id;
      this.$store.dispatch("fetchQuestion").then(data => {
        let question = this.questions.filter(question => {
          return question._id === this.$route.params.id;
        });
        this.question = question[0];
      });
    },
    toFetch() {
      this.fetch();
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 1000px;
  margin: 40px;
}
</style>