<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" dense>
      <v-col cols="12" sm="8" md="4" lg="4">
        <v-card elevation="0.5" class="pa-2">
          <a
            href="https://edu-fedorae.netlify.app"
            name="Fedorae Education"
            title="Fedorae Education"
            target="_blank"
          >
            <v-img
              src="@/assets/logo.png"
              alt="Fedorae Education Log"
              contain
              height="200"
            ></v-img>
          </a>
          <v-card-text>
            <v-form>
              <v-text-field
                outlined
                label="Email"
                prepend-inner-icon="mdi-at"
                :disabled="isLoading"
                v-model.trim="email"
                :error-messages="emailErrors"
              ></v-text-field>
              <v-btn
                :disabled="$v.$invalid || isLoading"
                color="primary"
                @click="forgotPassword(email)"
                x-large
                block
              >
                Далее
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        <success-messages v-if="success" class="mt-3">{{
          success
        }}</success-messages>
        <error-messages v-if="err" class="mt-3">{{ err }}</error-messages>
      </v-col>
    </v-row>

    <my-loader v-if="isLoading" />
  </v-container>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import MyLoader from "@/components/MyLoader";
import SuccessMessages from "@/components/messages/SuccessMessages";
import ErrorMessages from "@/components/messages/ErrorMessages";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  components: {
    SuccessMessages,
    ErrorMessages,
    MyLoader,
  },
  mixins: [validationMixin],
  data() {
    return {
      email: "",
    };
  },
  computed: {
    ...mapState("auth", {
      isLoading: (state) => state.isLoading,
      err: (state) => state.err,
      success: (state) => state.success,
    }),
    emailErrors() {
      const errors = [];
      if (!this.$v.email.required) errors.push("Обязательно для заполнения");
      if (!this.$v.email.email) errors.push("Невалидный email");
      return errors;
    },
  },
  methods: {
    ...mapActions("auth", ["forgotPassword"]),
    ...mapMutations("auth", ["clearMessage"]),
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  beforeDestroy() {
    this.clearMessage();
  },
};
</script>

<style>
.progress {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.success {
  width: 150px;
}
.err {
  width: 150px;
}
</style>
