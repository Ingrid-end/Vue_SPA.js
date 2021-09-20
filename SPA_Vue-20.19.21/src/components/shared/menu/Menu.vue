<template>
    <nav>
      <ul>       
          <li v-for="rota in rotas">
            <!-- Condição, como if, se vc definiu path, o valor vai ser o valor de path, se não o valor vai ser um "/" -->
            <router-link :to="rota.path ? rota.path : '/'">
              {{ rota.titulo }}
            </router-link>
          </li>
      </ul>
    </nav>
</template>

<script>

export default {

    props: {

        rotas: {
            type: Array,
            required: true
        }
    }
}

</script>

<style>
</style>