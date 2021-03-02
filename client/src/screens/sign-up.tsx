import React from "react"
import { Controller, useForm } from "react-hook-form"
import { useResetMutation } from "../common/apollo-hooks"
import { useStyles } from "../common/theme"
import { Validate, ValidationSchema } from "../common/validate"
import {
  Button,
  Container,
  Link,
  Screen,
  Scroll,
  Spacer,
  Text,
  TextInput,
  View,
} from "../components/base"
import { Alert } from "../components/base/alert"
import { CreateUserMutation, useCreateUserMutation } from "../generated/graphql"
import { useLoggedOutScreenStyles } from "./shared/logged-out-screen-styles"

const schema = Validate.object({
  username: Validate.string().nonempty("Please enter a username."),
  email: Validate.string()
    .nonempty("Please enter an email address.")
    .email("Please enter a valid email address."),
  password: Validate.string().nonempty("A password is required."),
})

export function SignUpScreen() {
  const form = useForm<ValidationSchema<typeof schema>>({
    resolver: Validate.resolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const [createUser, result, reset] = useResetMutation(
    useCreateUserMutation({
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    }),
  )

  const submit = form.handleSubmit(async ({ username, email, password }) => {
    await createUser({
      variables: {
        username,
        email,
        password,
      },
    })
  })

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
        fontSize: 15,
        marginBottom: 20,
      },
    }),
    [],
  )

  function renderForm() {
    return (
      <>
        <View style={sharedStyles.form}>
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
                  reset()
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
                  reset()
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
                  onChange(value)
                }}
                onBlur={onBlur}
                onEnter={submit}
              />
            )}
          />
          {result.error != null && (
            <Alert style={sharedStyles.errorMessage} message={result.error.message} />
          )}
          <View style={sharedStyles.submitSection}>
            <Button
              label="Sign Up"
              icon="check"
              role="primary"
              size="large"
              isDisabled={!form.formState.isValid}
              onPress={submit}
            />
          </View>
          <View style={sharedStyles.changeIntentSection}>
            <Link to="/account/login">
              <Text style={sharedStyles.changeIntentText}>{"< Log In"}</Text>
            </Link>
          </View>
        </View>
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
        <Button label="Login" role="primary" to="/account/login" />
        <Spacer />
      </>
    )
  }

  return (
    <Screen style={sharedStyles.root}>
      <Container>
        <Scroll contentContainerStyle={sharedStyles.scrollContentContainer}>
          {result?.data == null || result.error != null ? renderForm() : renderSuccess(result.data)}
        </Scroll>
      </Container>
    </Screen>
  )
}
