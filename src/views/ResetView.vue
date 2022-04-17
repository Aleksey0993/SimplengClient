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
                label="Password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                prepend-inner-icon="mdi-lock"
                :disabled="isLoading"
                v-model="password"
                :error-messages="passwordErrors"
              ></v-text-field>
              <v-btn
                :disabled="$v.$invalid || isLoading"
                color="primary"
                @click="resetPassword({ password, reset_password_token })"
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
import { required, minLength } from "vuelidate/lib/validators";
import {
  hasUppercase,
  hasLowercase,
  hasSpecialChars,
  hasNumbers,
} from "@/service/validator";
export default {
  components: {
    SuccessMessages,
    ErrorMessages,
    MyLoader,
  },
  mixins: [validationMixin],
  data() {
    return {
      show1: false,
      password: "",
      reset_password_token: "",
    };
  },
  computed: {
    ...mapState("auth", {
      isLoading: (state) => state.isLoading,
      err: (state) => state.err,
      success: (state) => state.success,
    }),
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.required) errors.push("Обязательно для заполнения");
      if (!this.$v.password.minLength) errors.push("Не меньше 8 символов");
      if (!this.$v.password.hasLowercase)
        errors.push("Пароль должен сожержать буквы в нижнем регистре");
      if (!this.$v.password.hasUppercase)
        errors.push("Пароль должен содержать буквы в верхнем регистре");
      if (!this.$v.password.hasSpecialChars)
        errors.push("Пароль должен содержать спецсимволы !@#$%^&*");
      if (!this.$v.password.hasNumbers)
        errors.push("Пароль должен содержать числа");
      return errors;
    },
  },
  methods: {
    ...mapActions("auth", ["resetPassword"]),
    ...mapMutations("auth", ["clearMessage"]),
  },
  validations: {
    password: {
      required,
      minLength: minLength(8),
      hasUppercase,
      hasLowercase,
      hasSpecialChars,
      hasNumbers,
    },
  },
  mounted() {
    this.reset_password_token = this.$route.params.reset_password_token;
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
