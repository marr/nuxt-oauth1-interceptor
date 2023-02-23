<script setup>
const { public: { consumerRealm } } = useRuntimeConfig();
const username = ref(null);
const password = ref(null);
const realm = ref(consumerRealm);

const [user, setUser] = useUser();
async function login(e) {
  const formData = new FormData(e.target);
  const { data } = await $fetch('/authc/login', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData))
  });
  setUser(data);
}
</script>
<template>
  <div v-if="user">
    {{ user }}
  </div>
  <form v-else @submit.prevent="login">
    <input v-model="realm" name="realm" type="hidden" />
    <input v-model="username" name="username"/>
    <input v-model="password" name="password" type="password"/>
    <button>login</button>
  </form>
</template>
