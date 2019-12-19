<template>
  <div class="container" style="margin: 1vh; width:100%;  overflow: scroll; left: 45vh;">
    <q-list
      bordered
      class="rounded-borders"
      style="padding: 15px; margin: 1vh; width:800px; over"
      v-for="(answer , i) in userAnswer"
      :key="i"
    >
      <q-item class="container">
        <q-item-section style="width:100%">
          <q-item-section lines="1" style="width:100%">
            <span
              class="text-weight-medium text-h6 cursor-pointer"
              @click="toReadArticle(answer.question._id)"
            >{{answer.question.title}}</span>
          </q-item-section>

          <q-item-section lines="1" class="q-mt-xs text-body2 text-primary">
            <div class="tags">
              <div>
                <span>
                  <q-badge
                    v-for="(tag, i) in answer.question.tags"
                    :key="i"
                    class="tag"
                    @click.prevent="getQuestions(tag)"
                    style="margin-right: 10px;"
                  >{{ tag }}</q-badge>
                </span>
              </div>
            </div>
          </q-item-section>
          <q-separator spaced />
          <p style="margin-bottom: 5px;" class="text-bold">your answer :</p>
          <q-item-label class="q-mt-xs text-body2 text-primary">
            <span v-html="answer.answer"></span>
          </q-item-label>
        </q-item-section>
        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn size="12px" flat dense round icon="edit" @click="toEdit(answer)" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="edit" persistent>
      <q-card style="min-width: 65vw">
        <q-card-section>
          <div class="text-h6 text-center navvv">UPDATE YOUR ANSWER</div>
        </q-card-section>

        <q-card-section>
          <q-editor
            v-model="answer"
            label="Body"
            hint="include all the information someone would need to answer your question"
            min-height="20vh"
            toolbar-bg="amber-4"
            toolbar-text-color="black"
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

        <q-card-actions align="right" class="text-primary">
          <q-btn class="navvv" flat label="Cancel" v-close-popup />
          <q-btn class="navvv" flat label="Update Answer" @click="patchAnswer" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      position="top"
      v-model="notification"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-orange-6 text-white">
        <q-card-section>
          <div class="text-h6 text-center">{{ message.status }}</div>
        </q-card-section>

        <q-card-section>{{ message.content }}</q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "answerUser",
  data() {
    return {
      edit: false,
      answer: "",
      toEditId: "",
      message: {
        status: "",
        content: ""
      },
      notification: false
    };
  },
  created() {},
  methods: {
    toReadArticle(payload) {
      this.$router.push(`question/${payload}`);
    },
    toEdit(payload) {
      this.edit = true;
      this.toEditId = payload._id;
      this.userAnswer.forEach(answer => {
        if (answer._id === payload._id) this.answer = payload.answer;
      });
    },
    patchAnswer() {
      this.$store
        .dispatch("patchAnswer", { id: this.toEditId, answer: this.answer })
        .then(data => {
          this.notification = true;
          this.message.status = "Success";
          this.message.content = "Update answer success";
          setTimeout(() => {
            this.notification = false;
            this.edit = false;
          }, 2000);
        })
        .catch(err => {
          this.notification = true;
          this.message.status = "Ooops!";
          this.message.content = err.data.message;
          setTimeout(() => {
            this.notification = false;
            this.edit = false;
          }, 2000);
        });
    }
  },
  computed: {
    ...mapState(["userAnswer"])
  }
};
</script>

<style scoped>
.tags {
  display: flex;
}
.tag {
  color: #4c97d8;
  font-size: 10px;
  background-color: #e1ecf4;
  padding: 2px;
  padding-bottom: 0px;
  border-radius: 5px;
  margin-right: 5px;
  /* cursor: pointer; */
  margin-top: 2px;
  margin-bottom: 5px;
}
.navvv {
  font-size: 12px;
  font-weight: bolder;
  letter-spacing: 0.12em;
}
</style>