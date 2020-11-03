import { useApolloClient } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { environment } from "../../environment"
import { useMutation } from "../common/apollo-hooks"
import { LOGIN_MUTATION } from "../common/auth"
import { AuthStore } from "../common/auth-store"
import { Validate, ValidationSchema } from "../common/validate"
import { Button, Container, Link, Scroll, Text, TextInput, View } from "../components/base"
import { Screen } from "../components/screen"
import { LoginMutation, LoginMutationVariables } from "../generated/graphql"
import { useLoggedOutScreenStyles } from "./shared/logged-out-screen-styles"

const schema = Validate.object({
  username: Validate.string().nonempty("Please enter a username."),
  password: Validate.string().nonempty("A password is required."),
})

export function Login() {
  const navigation = useNavigation()
  const apollo = useApolloClient()

  const [login, result] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, {
    fetchPolicy: "no-cache",
    async onCompleted({ login }) {
      if (login?.accessToken == null) {
        return
      }

      if (environment.isNative) {
        await AuthStore.setNativeAccessToken(login.accessToken)
      }

      await apollo.clearStore()
      await apollo.resetStore()
      navigation.navigate("Home")
    },
  })

  const form = useForm<ValidationSchema<typeof schema>>({
    resolver: Validate.resolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const submit = form.handleSubmit(async (variables) => {
    await login({ variables })
  })

  const sharedStyles = useLoggedOutScreenStyles()

  function renderForm() {
    return (
      <>
        <View style={sharedStyles.form}>
          <Text style={sharedStyles.header}>Amble</Text>
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
                  result.clear()
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
                  result.clear()
                }}
                onBlur={onBlur}
                onEnter={submit}
              />
            )}
          />
          {result.error != null && (
            <Text style={sharedStyles.errorMessage}>{result.error.message}</Text>
          )}
          <View style={sharedStyles.submitSection}>
            <Button
              label="Login"
              icon="arrow-right-circle"
              role="primary"
              size="large"
              isDisabled={!form.formState.isValid || result.error != null}
              onPress={submit}
            />
          </View>
          <View style={sharedStyles.changeIntentSection}>
            <Link to="/sign-up">
              <Text style={sharedStyles.changeIntentText}>{"Sign Up >"}</Text>
            </Link>
          </View>
        </View>
      </>
    )
  }

  return (
    <Screen style={sharedStyles.root}>
      <Container>
        <Scroll contentContainerStyle={sharedStyles.scrollContentContainer}>{renderForm()}</Scroll>
      </Container>
    </Screen>
  )
}
