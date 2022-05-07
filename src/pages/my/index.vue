<template>
  <div>
    <div>
      <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline">
                  <a
                    href="#"
                    class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
                    >Dashboard</a
                  >
                  <a
                    href="#"
                    class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >Team</a
                  >
                  <a
                    href="#"
                    class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >Projects</a
                  >
                  <a
                    href="#"
                    class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >Calendar</a
                  >
                  <a
                    href="#"
                    class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >Reports</a
                  >
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <span class="text-white">{{ walletAddress }}</span>

                <!-- Profile dropdown -->
                <div class="ml-3 relative">
                  <div>
                    <button
                      @click="toggle"
                      class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                      id="user-menu"
                      aria-label="User menu"
                      aria-haspopup="true"
                    >
                      <img
                        class="h-8 w-8 rounded-full"
                        :src="require('@/assets/images/bear@2x.png')"
                        alt
                      />
                    </button>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <div
                      v-show="isOpen"
                      class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                    >
                      <div
                        class="py-1 rounded-md bg-white shadow-xs"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          >Your Profile</a
                        >
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          >Settings</a
                        >
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          >Sign out</a
                        >
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <button
                @click="toggle"
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              >
                <svg
                  :class="[isOpen ? 'hidden' : 'block', 'h-6 w-6']"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                <svg
                  :class="[isOpen ? 'block' : 'hidden', 'h-6 w-6']"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div :class="[isOpen ? '' : 'hidden', 'md:hidden']">
          <div class="px-2 pt-2 pb-3 sm:px-3">
            <a
              href="#"
              class="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
              >Dashboard</a
            >
            <a
              href="#"
              class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >Team</a
            >
            <a
              href="#"
              class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >Projects</a
            >
            <a
              href="#"
              class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >Calendar</a
            >
            <a
              href="#"
              class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >Reports</a
            >
          </div>
          <div class="pt-4 pb-3 border-t border-gray-700">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <img
                  class="h-10 w-10 rounded-full"
                  :src="require('@/assets/images/bear@2x.png')"
                  alt
                />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium leading-none text-white">
                  Tom Cook
                </div>
                <div
                  class="mt-1 text-sm font-medium leading-none text-gray-400"
                >
                  tom@example.com
                </div>
              </div>
            </div>
            <div class="mt-3 px-2">
              <a
                href="#"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >Your Profile</a
              >
              <a
                href="#"
                class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >Settings</a
              >
              <a
                href="#"
                class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >Sign out</a
              >
            </div>
          </div>
        </div>
      </nav>

      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- Replace with your content -->
          <div class="px-4 py-6 sm:px-0">
            <div
              class="border-4 border-dashed border-gray-200 rounded-lg h-96"
            ></div>
          </div>
          <!-- /End replace -->
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_, { root: { $accessor } }) {
    const walletAddress = ref($accessor.wallet.walletAddress)
    const isOpen = ref(false)

    const toggle = () => {
      isOpen.value = !isOpen.value
    }

    return {
      toggle,

      walletAddress,
      isOpen,
    }
  },
})
</script>
