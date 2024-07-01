<template>
  <div class="bg-gray-900 text-white p-6">
    <h1 class="text-3xl font-bold mb-6">TRACE RESULT</h1>
    
    <div class="h-96 bg-gray-800 mb-6 rounded-lg overflow-y-auto p-4">
      <!-- Trace result will go here -->
      <pre class="text-sm">{{ traceResult }}</pre>
    </div>
    
    <div class="flex items-center space-x-4">
      <label for="traceInput" class="font-semibold">TRACE INPUT:</label>
      <input 
        id="traceInput"
        type="text" 
        v-model="traceInput"
        placeholder="Input trace command here..." 
        class="bg-gray-700 text-white px-4 py-2 rounded-lg flex-grow"
      >
      <button 
        @click="executeTrace" 
        class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
      >
        EXECUTE
      </button>
      <button 
        @click="clearResult" 
        class="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
      >
        CLEAR
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TraceResult',
  data() {
    return {
      traceInput: '',
      traceResult: ''
    }
  },
  methods: {
    executeTrace() {
      if (this.traceInput) {
        // Simulating trace execution
        this.traceResult += `Executing trace: ${this.traceInput}\n`;
        this.traceInput = '';
      }
    },
    clearResult() {
      this.traceResult = '';
      this.traceInput = '';
    }
  }
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>