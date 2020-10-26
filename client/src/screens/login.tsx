import { Link, useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { AuthResult, useAuth } from "../common/auth"
import { useStyles } from "../common/theme"
import { Validate, ValidationSchema } from "../common/validate"
import { Button, Screen, Text, TextInput, View } from "../components/base"

const schema = Validate.object({
  username: Validate.string().nonempty("Please enter a username."),
  password: Validate.string().nonempty("A password is required."),
})

export function Login() {
  const navigation = useNavigation()
  const auth = useAuth()

  const [result, setResult] = useState<AuthResult | null>(null)
  const form = useForm<ValidationSchema<typeof schema>>({
    resolver: Validate.resolver(schema),
    mode: "all",
    reValidateMode: "onChange",
  })

  const submit = form.handleSubmit(async ({ username, password }) => {
    const result = await auth.login(username, password)
    setResult(result)
    if (result.type === "success") {
      navigation.navigate("Home")
    }
  })

  function getErrorMessage(): string | null {
    if (result == null) {
      return null
    }

    if (result.type === "error") {
      return "An unknown error occurred."
    }

    if (result.type === "failed") {
      return "Invalid username or password."
    }

    return null
  }

  const error = getErrorMessage()

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
        marginBottom: 2,
      },
      changeIntentSection: {
        alignItems: "flex-end",
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
        textAlign: "center",
      },
    }),
    [],
  )

  function renderForm() {
    return (
      <>
        <View style={styles.spacer} />
        <View style={styles.form}>
          <Text style={styles.header}>Jump In</Text>
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
                onChangeText={(value) => {
                  onChange(value)
                  setResult(null)
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
                style={styles.input}
                label="Password"
                error={form.errors.password?.message}
                secureTextEntry
                selectTextOnFocus={true}
                value={value}
                onChangeText={(value) => {
                  onChange(value)
                  setResult(null)
                }}
                onBlur={onBlur}
                onEnter={submit}
              />
            )}
          />
          <View style={styles.submitSection}>
            <Button
              label="Login"
              role="primary"
              size="large"
              isDisabled={!form.formState.isValid || error != null}
              onPress={submit}
            />
          </View>
          {error != null && <Text style={styles.errorMessage}>{error}</Text>}
          <View style={styles.changeIntentSection}>
            <Link to="/sign-up">
              <Text style={styles.changeIntentText}>{"Sign Up >"}</Text>
            </Link>
          </View>
        </View>
        <View style={styles.spacer} />
      </>
    )
  }

  return <Screen style={styles.container}>{renderForm()}</Screen>
}
