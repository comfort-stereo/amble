import { FetchResult } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useAuth } from "../common/auth"
import { Validate, ValidationSchema } from "../common/validate"
import { Button, KeyboardAvoidingView, Link, Text, TextInput, View } from "../components/base"
import { Spacer } from "../components/base/spacer"
import { Screen } from "../components/screen"
import { LoginMutation } from "../generated/graphql"
import { useLoggedOutScreenStyles } from "./shared/logged-out-screen-styles"

const schema = Validate.object({
  username: Validate.string().nonempty("Please enter a username."),
  password: Validate.string().nonempty("A password is required."),
})

export function Login() {
  const navigation = useNavigation()
  const auth = useAuth()

  const [result, setResult] = useState<FetchResult<LoginMutation> | null>(null)
  const form = useForm<ValidationSchema<typeof schema>>({
    resolver: Validate.resolver(schema),
    mode: "all",
    reValidateMode: "onChange",
  })

  const submit = form.handleSubmit(async ({ username, password }) => {
    const result = await auth.login(username, password)
    setResult(result)
    if (result.data?.login?.user != null) {
      navigation.navigate("Home")
    }
  })

  function getErrorMessage(): string | null {
    if (!form.formState.isSubmitted) {
      return null
    }

    if (result == null) {
      return null
    }

    if (result.errors != null) {
      return result.errors[0].message
    }

    if (result.data?.login?.user == null) {
      return "Invalid username or password."
    }

    return null
  }

  const error = getErrorMessage()
  const sharedStyles = useLoggedOutScreenStyles()

  function renderForm() {
    return (
      <>
        <Spacer />
        <KeyboardAvoidingView style={sharedStyles.form} behavior="position">
          <Text style={sharedStyles.header}>Jump In</Text>
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
                textContentType="username"
                autoCompleteType="username"
                importantForAutofill="yes"
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
                style={sharedStyles.input}
                label="Password"
                error={form.errors.password?.message}
                textContentType="password"
                autoCompleteType="password"
                importantForAutofill="yes"
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
          <View style={sharedStyles.submitSection}>
            <Button
              label="Login"
              role="primary"
              size="large"
              isDisabled={!form.formState.isValid || error != null}
              onPress={submit}
            />
          </View>
          {error != null && <Text style={sharedStyles.errorMessage}>{error}</Text>}
          <View style={sharedStyles.changeIntentSection}>
            <Link to="/sign-up">
              <Text style={sharedStyles.changeIntentText}>{"Sign Up >"}</Text>
            </Link>
          </View>
        </KeyboardAvoidingView>
        <Spacer />
      </>
    )
  }

  return <Screen style={sharedStyles.container}>{renderForm()}</Screen>
}
