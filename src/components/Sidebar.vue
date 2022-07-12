<template>
	<aside class="sidebar">

		<img class="sidebar__menu-logo" src="@/assets/img/logo-transparent.png" alt="logo">

		<div class="sidebar__menu">
			<router-link to="/" class="sidebar__menu-button button">
				<span class="sidebar__menu-icon material-icons">alternate_email</span>
				<span class="sidebar__menu-text text">Home</span>
			</router-link>
		</div>

		<div class="sidebar__bound"></div>

		<div class="sidebar__menu sidebar__menu_no-padd">
			<router-link to="/settings" class="sidebar__menu-button buttonx">
				<span class="sidebar__menu-icon material-icons">settings_accessibility</span>
				<span class="sidebar__menu-text text">Setting</span>
			</router-link>
		</div>
	</aside>
</template>
