<template>
  <div>
    <canvas 
      ref="game" 
      width="640" 
      height="480"
      style="border: 2px solid black; margin-left: 10px;margin-top: 50px">
    </canvas>
    <p>
      <button 
        style="border: 2px solid black;background:white;color:red;height: 40px; border-radius:10px;padding:10px;font-size:20px;margin-right:10px" 
        v-on:click="move('left')">Left
      </button>
      <button 
        style="border: 2px solid black;background:white;height: 40px;border-radius:10px;padding:10px;font-size:20px;margin-right:10px"
        v-on:click="move('top')">Top
      </button>
      <button 
        style="border: 2px solid black;background:white;height: 40px;color:red;border-radius:10px;padding:10px;font-size:20px;margin-right:10px" 
        v-on:click="move('right')">Right
      </button>
      <button 
        style="border: 2px solid black;background:white;height: 40px; border-radius:10px;padding:10px;font-size:20px" 
        v-on:click="move('down')">Down
      </button>
    </p>
 
  </div>
</template>

<script>
  import io from "socket.io-client"
  export default {
    name: 'BlockGame',
    data() {
      return {
        socket: {},
        context: {},
        position: {
          x: 0,
          y: 0,
        }
      }
     
    },
    created() {
      this.socket = io("http://localhost:5000");
        
    },
    mounted() {
      this.context = this.$refs.game.getContext("2d");
      this.socket.on("position", data => {
        this.position = data;
        this.context.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height);
        this.context.fillRect(this.position.x, this.position.y, 25,25);
      });      
    },
    methods: {
      move(direction) {
        this.socket.emit("move", direction);
      }
    }
  }
</script>

<style scoped>

</style>
