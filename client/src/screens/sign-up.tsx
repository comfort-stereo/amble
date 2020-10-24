import { gql, useMutation } from "@apollo/client"
import { Link, useNavigation } from "@react-navigation/native"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { useStyles } from "../common/theme"
import { Validate, ValidationSchema } from "../common/validate"
import { Button, Screen, Text, TextInput, View } from "../components/base"
import { CreateUserMutation } from "../generated/graphql"
import { Login } from "./login"

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
  const [createUser, result] = useMutation<CreateUserMutation>(CREATE_USER_QUERY)

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

  const styles = useStyles(
    (theme) => ({
      container: {
        flex: 1,
        alignItems: "center",
      },
      spacer: {
        flex: 1,
      },
      header: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.contentColorFor("surface").string(),
        textAlign: "center",
        paddingBottom: 10,
      },
      form: {
        padding: 12,
        maxWidth: 375,
        minWidth: 250,
        width: "100%",
      },
      input: {
        marginBottom: 6,
      },
      changeIntentSection: {
        alignItems: "flex-start",
        paddingVertical: 10,
      },
      changeIntentText: {
        color: theme.contentColorFor("surface").string(),
        fontStyle: "italic",
      },
      submitSection: {
        paddingVertical: 20,
      },
      errorMessage: {
        fontSize: 14,
        color: theme.colorFor("error").string(),
      },
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
        <View style={styles.spacer} />
        <View style={styles.form}>
          <Text style={styles.header}>Get Started</Text>
          <Controller
            name="username"
            control={form.control}
            defaultValue=""
            render={({ value, onChange, onBlur }) => (
              <TextInput
                style={styles.input}
                label="Username"
                error={form.errors.username?.message}
                autoFocus
                selectTextOnFocus={true}
                value={value}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            name="email"
            control={form.control}
            defaultValue=""
            render={({ value, onChange, onBlur }) => (
              <TextInput
                style={styles.input}
                label="Email"
                error={form.errors.email?.message}
                selectTextOnFocus={true}
                value={value}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            name="password"
            control={form.control}
            defaultValue=""
            render={({ value, onChange, onBlur }) => (
              <TextInput
                style={styles.input}
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
              />
            )}
          />
          <Controller
            name="passwordConfirm"
            control={form.control}
            defaultValue=""
            render={({ value, onChange, onBlur }) => (
              <TextInput
                style={styles.input}
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
              />
            )}
          />
          {result.error != null && (
            <Text style={styles.errorMessage}>{result.error.graphQLErrors[0].message}</Text>
          )}
          <View style={styles.submitSection}>
            <Button label="Sign Up" role="primary" size="large" onPress={submit} />
          </View>
          <View style={styles.changeIntentSection}>
            <Link to="/login">
              <Text style={styles.changeIntentText}>{"< Log In"}</Text>
            </Link>
          </View>
        </View>
        <View style={styles.spacer} />
      </>
    )
  }

  function renderSuccess({ createUser: { username, email } }: CreateUserMutation) {
    return (
      <>
        <View style={styles.spacer} />
        <Text style={styles.successUsername}>{`${username}`}</Text>
        <Text style={styles.successEmail}>{`${email}`}</Text>
        <Text style={styles.successMessage}>Your account has been created.</Text>
        <Button
          label="Login"
          role="secondary"
          onPress={() => {
            navigation.navigate(Login.name)
          }}
        />
        <View style={styles.spacer} />
      </>
    )
  }

  return (
    <Screen style={styles.container}>
      {result.data == null || result.error != null ? renderForm() : renderSuccess(result.data)}
    </Screen>
  )
}
