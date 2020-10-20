import { gql, useMutation } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@react-navigation/native"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import * as Schema from "zod"
import { useStyles } from "../common/theme"
import { Button, Screen, Text, TextInput, View } from "../components/base"
import { CreateUserMutation } from "../generated/graphql"

const CREATE_USER_QUERY = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
    }
  }
`

const schema = Schema.object({
  username: Schema.string().nonempty("Please enter a username."),
  email: Schema.string()
    .nonempty("Please enter an email address.")
    .email("Please enter a valid email address."),
  password: Schema.string().nonempty("A password is required."),
  passwordConfirm: Schema.string().nonempty("Please confirm your password."),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"],
})

export function SignUp() {
  const form = useForm<Schema.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "all",
    reValidateMode: "onChange",
  })

  const [createUser, createUserResult] = useMutation<CreateUserMutation>(CREATE_USER_QUERY)

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
        color: theme.contentColorFor("surface").hex(),
        fontStyle: "italic",
      },
      submitSection: {
        paddingVertical: 20,
      },
    }),
    [],
  )

  return (
    <Screen style={styles.container}>
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
        <View style={styles.submitSection}>
          <Button
            label="Sign Up"
            role="primary"
            size="large"
            onPress={() => {
              console.log("what")
              form.handleSubmit((values) => {
                console.log("what")
                console.log(values)
              })
            }}
          />
        </View>
        <View style={styles.changeIntentSection}>
          <Link to="/login">
            <Text style={styles.changeIntentText}>{"< Log In"}</Text>
          </Link>
        </View>
      </View>
      <View style={styles.spacer} />
    </Screen>
  )
}
