<template>
  <div class="bg-gray-900 text-white min-h-screen p-6 flex">
    <!-- Left Section -->
    <div class="w-1/3 pr-6">
      <div class="mb-6">
        <div class="mb-4">
          <span class="mr-2">Current CPU Status:</span>
          <span class="text-red-500 font-bold">{{ cpuStatus }}</span>
        </div>
        <div class="mb-4">
          <div>Current RTL Statement:</div>
          <div class="text-gray-400">{{ rtlStatement }}</div>
        </div>
        <div class="mb-4">
          <div>Current Memory Location:</div>
          <div class="text-4xl mb-2">{{ currentMemoryLocation }}</div>
        </div>
      </div>
      
      <textarea 
        v-model="inputCode" 
        class="w-full h-64 bg-gray-800 text-white p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-gray-600 mb-4"
        placeholder="Input code here..."
      ></textarea>
      
      <button @click="assembleCode" class="w-full bg-gray-700 px-6 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
        ASSEMBLE
      </button>
    </div>
    <div class="w-2/3 pl-6">
    <div class="flex justify-between items-center mb-3">
        <button @click="chooseOption('Memory')" class="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">Memory and IO</button>
        <button @click="chooseOption('BreakPoint')" class="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">Breakpoints</button>
        <button @click="chooseOption('TraceResult')" class="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">Trace Results</button>
        <button @click="chooseOption('System')" class="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">View System</button>
      </div>
    <component :is="currentView" />
    </div>
  </div>
</template>

<script>
import MemoryView from '../views/carp/MemoryView.vue';
import BreakPointView from '../views/carp/BreakPointView.vue';
import TraceResultView from '../views/carp/TraceResultView.vue';
import SystemView from '../views/carp/SystemView.vue';

export default {
  name: 'CARPNavBar',
  components: {
    MemoryView,
    BreakPointView,
    TraceResultView,
    SystemView
  },
  data() {
    return {
      cpuStatus: 'Idle',
      rtlStatement: '',
      currentMemoryLocation: 0,
      inputCode: '',
      currentView: MemoryView // Set initial view
    }
  },
  methods: {
    assembleCode() {
      // Placeholder logic to assemble the code
      Assembler.assembleCode(this.inputCode,this.currentMemoryLocation);
      console.log('Assembling code:', this.inputCode);
    },
    chooseOption(name) {
      switch (name) {
        case 'Memory':
          this.currentView = MemoryView;
          break;
        case 'BreakPoint':
          this.currentView = BreakPointView;
          break;
        case 'TraceResult':
          this.currentView = TraceResultView;
          break;
        case 'System':
          this.currentView = SystemView;
          break;
      }
    }
  }
}
</script>
