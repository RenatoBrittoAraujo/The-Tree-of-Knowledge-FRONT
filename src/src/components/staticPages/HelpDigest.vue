<template>
  <div class="text-center px-2">
    <h3 class="mt-3">Welcome to The Tree of Knowledge</h3>
    <hr/>
    <div class="text-left px-1">
      <p>Let me show you around!</p>
      <p>As you can see, there is a random node to your left.</p>
      <p>By clicking it once, you select it, and such you may read a brief description of it, vote and see references for that study topic.</p>
      <p>By double clicking it, new nodes will open connected to it. These are knowledge topics connected to that initial node.</p>
      <p>By clicking and dragging, you may move a node around to fit your eyes better.</p>
      <p>In here, you may browse the knowledge tree and even contribute to it if you want to.</p>
      <p>This is a democratic process, where people vote and a consus in achieved on the connections and contents of nodes, that way, nobody is the owner of truth.</p>
      <p>Read the <a href="#about" @click="$emit('sidePageChange', { page: 'About' })">about</a> of you want to know more.</p>
      <p>Make sure to read the <a href="#rules" @click="$emit('sidePageChange', { page: 'Rules' })">rules</a> if you want to contribute.</p>
      <p>Create your account:</p>
      <button class="w-100 btn btn-primary mb-2"
        @click="$emit('sidePageChange', { page: 'Register' })">Register</button>
      <p>Or log in:</p>
      <button class="w-100 btn btn-primary mb-5"
        @click="$emit('sidePageChange', { page: 'Login' })">Log in</button>
    </div>
  </div>
</template>

<style>
</style>
