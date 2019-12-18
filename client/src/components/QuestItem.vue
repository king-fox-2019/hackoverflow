<template>
  <div>
    <div class="row">
      <div class="col-sm-1 status">
        <div class="number">8</div>
        Vote
      </div>
      <div class="col-sm-1 status">
        <div class="number">8</div>
        Answer
      </div>
      <div class="col-sm-9 p-2">
        Pertanyaannya
      </div>
    </div>
    <div class="answer">
      <div class="row">
        <div class="col-sm-1 status">
          <div class="number">8</div>
          Vote
        </div>
        <div class="col-sm-10 p-2">
          Jawabannya
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestItem'
}
</script>

<style scoped>
.status {
  border: 1px solid orange;
  font-size: 0.6em;
  height: 3.5rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
}
.number {
  color: aqua;
  font-size: 1.6rem
}
.answer {
  margin-left: 4vw;
  margin-top: 10px
}
.answer .status {
  border: 1px solid orange;
  font-size: 0.6em;
  height: 3rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
}
.answer .number {
  color: aqua;
  font-size: 1.4rem
}
</style>
