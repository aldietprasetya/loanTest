<template>
	<div class="app">
		<!-- Sidebar -->
		<Sidebar />

		<router-view/>
	</div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
export default {
	name: 'app',
	components: {
    Sidebar
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/style';
</style>
