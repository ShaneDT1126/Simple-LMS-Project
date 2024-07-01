<template>
  <div class="bg-gray-900 text-white p-6">
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div>
        <div class="mb-2"><span class="font-bold">AR:</span> {{ registers.AR }}</div>
        <div class="mb-2"><span class="font-bold">PC:</span> {{ registers.PC }}</div>
        <div class="mb-2"><span class="font-bold">DR:</span> {{ registers.DR }}</div>
        <div class="mb-2"><span class="font-bold">TR:</span> {{ registers.TR }}</div>
      </div>
      <div>
        <div class="mb-2"><span class="font-bold">IR:</span> {{ registers.IR }}</div>
        <div class="mb-2"><span class="font-bold">R:</span> {{ registers.R }}</div>
        <div class="mb-2"><span class="font-bold">AC:</span> {{ registers.AC }}</div>
        <div class="mb-2"><span class="font-bold">Z:</span> {{ registers.Z }}</div>
      </div>
    </div>

    <div class="relative h-64 mb-6 bg-gray-800 rounded-lg p-4">
  <div class="absolute top-2 left-2 bg-teal-800 p-2 rounded-lg text-sm">
    <div>CU</div>
    <div>ALU</div>
  </div>
  <div class="absolute top-2 left-20 bg-teal-800 p-2 rounded-lg text-sm">
    <div>AR</div>
    <div>PC</div>
    <div>DR</div>
    <div>TR</div>
    <div>IR</div>
    <div>R</div>
    <div>AC</div>
    <div>Z</div>
  </div>
  <div class="absolute top-2 right-2 bg-teal-800 p-2 rounded-lg text-sm">M</div>
  <div class="absolute bottom-2 right-2 bg-teal-800 p-2 rounded-lg text-sm">
    <div>00000000</div>
    <div>I/O</div>
  </div>
  <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-teal-800 p-2 rounded-lg text-sm">
    <div>EN</div>
    <div>EN</div>
    <div>DECODER</div>
  </div>
  <div class="absolute top-4 left-48 bg-teal-800 px-2 py-1 rounded-lg text-xs">A[15..0]</div>
  <div class="absolute top-12 left-48 bg-teal-800 px-2 py-1 rounded-lg text-xs">D[7..0]</div>
  <div class="absolute bottom-20 left-6 text-xs">
    <div>clock</div>
    <div>read</div>
    <div>write</div>
  </div>
  <div class="absolute bottom-8 left-2 text-xs">clk</div>
  
  <!-- Lines -->
  <div class="absolute top-8 left-36 w-[calc(100%-9rem)] h-px bg-white"></div>
  <div class="absolute top-16 left-36 w-[calc(100%-9rem)] h-px bg-white"></div>
  <div class="absolute bottom-16 left-24 w-[calc(100%-6rem)] h-px bg-white"></div>
  <div class="absolute bottom-20 left-24 w-[calc(100%-6rem)] h-px bg-white"></div>
  <div class="absolute left-8 bottom-0 w-px h-16 bg-white"></div>
</div>

    <div class="flex items-center space-x-4 mb-4">
      <label class="font-bold">Start Location:</label>
      <input v-model="startLocation" type="text" class="bg-gray-700 px-2 py-1 rounded">
    </div>

    <div class="flex space-x-4">
      <button @click="start" class="bg-blue-600 px-4 py-2 rounded">START</button>
      <button @click="stop" class="bg-red-600 px-4 py-2 rounded">STOP</button>
      <div class="flex flex-col space-y-2">
        <button @click="resetRegisters" class="bg-green-600 px-4 py-2 rounded text-sm">RESET REGISTERS</button>
        <button @click="stepThroughCycle" class="bg-green-600 px-4 py-2 rounded text-sm">STEP THROUGH CYCLE</button>
        <button @click="stepThroughInstruction" class="bg-green-600 px-4 py-2 rounded text-sm">STEP THROUGH INSTRUCTION</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CARPSystem',
  data() {
    return {
      registers: {
        AR: '0000 0000 0000 0000',
        PC: '0000 0000 0000 0000',
        DR: '0000 0000',
        TR: '0000 0000',
        IR: '0000 0000',
        R: '0000 0000',
        AC: '0000 0000',
        Z: '0'
      },
      startLocation: '0'
    }
  },
  methods: {
    start() {
      console.log('Starting from location:', this.startLocation)
      // Implement start logic
    },
    stop() {
      console.log('Stopping execution')
      // Implement stop logic
    },
    resetRegisters() {
      Object.keys(this.registers).forEach(key => {
        this.registers[key] = key === 'Z' ? '0' : '0000 0000'
      })
      console.log('Registers reset')
    },
    stepThroughCycle() {
      console.log('Stepping through cycle')
      // Implement cycle step logic
    },
    stepThroughInstruction() {
      console.log('Stepping through instruction')
      // Implement instruction step logic
    }
  }
}
</script>