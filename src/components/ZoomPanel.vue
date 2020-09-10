<template>
    <div class="zoomTool">
      <div class="title">ZOOM 拡大縮小</div>
      <div class="control">
        <span @click="zoomIn"><font-awesome-icon icon="minus" /></span>
        <span @click="zoomOut"><font-awesome-icon icon="plus" /></span>
      </div>
    </div>
</template>

<script>
export default {
    name: 'ZoomPanel',
    props: [ 'scaleVal' ],
    methods: {
      zoomIn(){
        var newVal = this.scaleVal - 0.1
        this.$emit('new-scale-value', newVal)
      },
      zoomOut(){
        var newVal = this.scaleVal + 0.1
        this.$emit('new-scale-value', newVal)
      }
    }
}
</script>

<style scoped>
/* CSS for zoom tool */

.zoomTool {
  box-sizing: border-box;
  position: absolute;
  top: 0%;
  right: 0%;
  background-color: white;
  border: 2px solid black;
  width: 160px;
  height: 100px;
  text-align: center;
  transition: 0.5s;
  padding: 10px 0;
}

.zoomTool:hover {
  box-shadow: 0px 0px 7px 3px rgba(0,0,0,0.48);
}

.zoomTool .title, .control {
  height: 50%;
  font-weight: bold;
}

.zoomTool .control span {
  display: inline-block;
  width: 30px;
  border-radius: 5px;
  font-size: 25px;
  cursor: pointer;
  margin: 0 15px;
  transition: 0.5s;
}

.zoomTool .control span:hover{
  background-color: rgba(238, 217, 54, 0.5);
}

</style>