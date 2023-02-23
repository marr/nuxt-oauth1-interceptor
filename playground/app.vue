<script setup>
const {
  public: { consumerRealm },
} = useRuntimeConfig();
const username = ref(null);
const password = ref(null);
const realm = ref(consumerRealm);
const token = ref(null);

async function login(e) {
  const formData = new FormData(e.target);
  const { data } = await useFetch("/authc/login", {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  token.value = data.value.accessToken;
}
</script>
<template>
  <template v-if="token">
    <textarea :value="token" cols="60" />
    <hr />
    <button @click="token = null">Logout</button>
  </template>
  <form v-else @submit.prevent="login">
    <input v-model="realm" name="realm" type="hidden" />
    <input v-model="username" name="username" />
    <input v-model="password" name="password" type="password" />
    <hr />
    <button>login</button>
  </form>
</template>
