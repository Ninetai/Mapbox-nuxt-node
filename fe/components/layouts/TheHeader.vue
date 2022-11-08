<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-container fluid>
        <b-navbar-brand to="/">
          Map Template
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-navbar-nav v-if="!isLoggedIn" class="ml-auto">
              <b-nav-item to="/login">
                Login
              </b-nav-item>
              <b-nav-item to="/register">
                Register
              </b-nav-item>
            </b-navbar-nav>
            <template v-else>
              <b-nav-item to="/dashboard">
                Dashboard
              </b-nav-item>
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  <b-icon-person></b-icon-person>
                </template>
                <b-dropdown-text>
                  <div class="d-flex align-items-center">
                    <b-avatar variant="primary" text="BV"></b-avatar>
                    <div class="ml-4">
                      <div class="font-weight-bold">{{ user.username }}</div>
                      <div>{{ user.email }}</div>
                    </div>
                  </div>
                </b-dropdown-text>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </template>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { BIcon, BIconPerson } from 'bootstrap-vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    BIcon,
    BIconPerson
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>
