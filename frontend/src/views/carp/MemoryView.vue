<template>
    <!-- Right Section -->
      <div class="bg-gray-800 p-6 rounded">
        <h2 class="text-xl font-bold mb-4">MEMORY AND IO</h2>
        <div class="h-96 overflow-y-auto mb-4 bg-gray-900 p-4 rounded" ref="memoryContentDisplay">
          <!-- Memory content will be dynamically updated here -->
          {{ memoryContent }}
        </div>
        <div class="flex justify-between">
          <button @click="viewMemory" class="bg-gray-700 px-6 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">VIEW</button>
          <button @click="clearMemory" class="bg-gray-700 px-6 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">CLEAR</button>
          <div>
            <span class="mr-2">Convert To</span>
            <button @click="convertTo('HEX')" class="bg-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">HEX</button>
            <button @click="convertTo('BINARY')" class="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">BINARY</button>
          </div>
        </div>
      </div>
</template>

<script>
// Import the Memory class
import Memory from '@/carp/Memory.js'; // Adjust the path as necessary

export default {
  name: 'MemoryView',
  data() {
    return {
      memoryContent: '',
      isHex: false
    }
  },
  methods: {
    clearMemory() {
      // Clear memory content and reset memory location
      Memory.Clear();
      this.memoryContent = '';
      this.currentMemoryLocation = 0;
    },
    convertTo(format) {
      console.log(`Converting to ${format}`);
      this.isHex = format === 'HEX';
      // Implement conversion logic here if needed
      Memory.UpdateMemoryTextBox(this.$refs.memoryContentDisplay, this.isHex);
    },
    viewMemory() {
      Memory.UpdateMemoryTextBox(this.$refs.memoryContentDisplay, this.isHex);
    }
  }
}
</script>
