import { gql, useMutation } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { useStyles } from "../common/theme"
import { Validate, ValidationSchema } from "../common/validate"
import { Button, KeyboardAvoidingView, Link, Text, TextInput, View } from "../components/base"
import { Spacer } from "../components/base/spacer"
import { Screen } from "../components/screen"
import { CreateUserMutation } from "../generated/graphql"
import { Login } from "./login"
import { useLoggedOutScreenStyles } from "./shared/logged-out-screen-styles"

const CREATE_USER_QUERY = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`

const schema = Validate.object({
  username: Validate.string().nonempty("Please enter a username."),
  email: Validate.string()
    .nonempty("Please enter an email address.")
    .email("Please enter a valid email address."),
  password: Validate.string().nonempty("A password is required."),
  passwordConfirm: Validate.string().nonempty("Please confirm your password."),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match.",
  path: ["passwordConfirm"],
})

export function SignUp() {
  const navigation = useNavigation()
  const [createUser, result] = useMutation<CreateUserMutation>(CREATE_USER_QUERY, {
    errorPolicy: "all",
  })

  const form = useForm<ValidationSchema<typeof schema>>({
    resolver: Validate.resolver(schema),
    mode: "all",
    reValidateMode: "onChange",
  })

  const submit = form.handleSubmit(async ({ username, email, password }) => {
    await createUser({
      variables: {
        username,
        email,
        password,
      },
    })
  })

  function getErrorMessage(): string | null {
    if (!form.formState.isSubmitted) {
      return null
    }

    if (result?.error != null) {
      if (result.error.networkError != null) {
        return "An unknown error occurred."
      }

      return result.error.graphQLErrors[0]?.message ?? null
    }

    return null
  }

  const error = getErrorMessage()
  const sharedStyles = useLoggedOutScreenStyles()
  const styles = useStyles(
    () => ({
      successUsername: {
        fontSize: 32,
        fontStyle: "italic",
        fontWeight: "bold",
        marginBottom: 8,
      },
      successEmail: {
        fontSize: 16,
        opacity: 0.35,
        fontStyle: "italic",
        marginBottom: 30,
      },
      successMessage: {
        fontSize: 14,
        marginBottom: 12,
      },
    }),
    [],
  )

  function renderForm() {
    return (
      <>
        <Spacer />
        <KeyboardAvoidingView style={sharedStyles.form} behavior="position">
          <Text style={sharedStyles.header}>Get Started</Text>
          <Controller
            name="username"
            control={form.control}
            defaultValue=""
            render={({ value, onChange, onBlur }) => (
              <TextInput
                style={sharedStyles.input}
                label="Username"
                error={form.errors.username?.message}
                autoFocus
                selectTextOnFocus={true}
                value={value}
                onChangeText={(value) => {
                  onChange(value)
                }}
                onBlur={onBlur}
                onEnter={submit}
              />
            )}
          />
          <Controller
            name="email"
            control={form.control}
            defaultValue=""
            render={({ value, onChange, onBlur }) => (
              <TextInput
                style={sharedStyles.input}
                label="Email"
                error={form.errors.email?.message}
                selectTextOnFocus={true}
                value={value}
                onChangeText={(value) => {
                  onChange(value)
                }}
                onBlur={onBlur}
                onEnter={submit}
              />
            )}
          />
          <Controller
            name="password"
            control={form.control}
            defaultValue=""
            render={({ value, onChange, onBlur }) => (
              <TextInput
                style={sharedStyles.input}
                label="Password"
                error={form.errors.password?.message}
                secureTextEntry
                selectTextOnFocus={true}
                value={value}
                onChangeText={(value) => {
                  form.trigger("password")
                  form.trigger("passwordConfirm")
                  onChange(value)
                }}
                onBlur={onBlur}
                onEnter={submit}
              />
            )}
          />
          <Controller
            name="passwordConfirm"
            control={form.control}
            defaultValue=""
            render={({ value, onChange, onBlur }) => (
              <TextInput
                style={sharedStyles.input}
                label="Password Confirm"
                error={form.errors.passwordConfirm?.message}
                secureTextEntry
                selectTextOnFocus={true}
                value={value}
                onChangeText={(value) => {
                  form.trigger("password")
                  form.trigger("passwordConfirm")
                  onChange(value)
                }}
                onBlur={onBlur}
                onEnter={submit}
              />
            )}
          />
          {error != null && <Text style={sharedStyles.errorMessage}>{error}</Text>}
          <View style={sharedStyles.submitSection}>
            <Button
              label="Sign Up"
              role="primary"
              size="large"
              isDisabled={!form.formState.isValid}
              onPress={submit}
            />
          </View>
          <View style={sharedStyles.changeIntentSection}>
            <Link to="/login">
              <Text style={sharedStyles.changeIntentText}>{"< Log In"}</Text>
            </Link>
          </View>
        </KeyboardAvoidingView>
        <Spacer />
      </>
    )
  }

  function renderSuccess({ createUser: { username, email } }: CreateUserMutation) {
    return (
      <>
        <Spacer />
        <Text style={styles.successUsername}>{`${username}`}</Text>
        <Text style={styles.successEmail}>{`${email}`}</Text>
        <Text style={styles.successMessage}>Your account has been created.</Text>
        <Button
          label="Login"
          role="primary"
          onPress={() => {
            navigation.navigate(Login.name)
          }}
        />
        <Spacer />
      </>
    )
  }

  return (
    <Screen style={sharedStyles.container}>
      {result.data == null || result.error != null ? renderForm() : renderSuccess(result.data)}
    </Screen>
  )
}
