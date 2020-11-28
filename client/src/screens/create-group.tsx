import React from "react"
import { Controller, useForm } from "react-hook-form"
import { useResetMutation } from "../common/apollo-hooks"
import { useStyles } from "../common/theme"
import { Validate, ValidationSchema } from "../common/validate"
import { Button, Container, Screen, Scroll, TextInput } from "../components/base"
import { useCreateGroupMutation } from "../generated/graphql"

const schema = Validate.object({
  name: Validate.string().nonempty("Please enter a name for the group."),
  title: Validate.string().nonempty("Please enter a title for the group."),
  description: Validate.string(),
})

export function CreateGroupScreen() {
  const [createGroup, result, reset] = useResetMutation(useCreateGroupMutation())
  const form = useForm<ValidationSchema<typeof schema>>({
    resolver: Validate.resolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const submit = form.handleSubmit(async (variables) => {
    await createGroup({ variables })
  })

  const styles = useStyles(
    () => ({
      screen: {
        flex: 1,
      },
      header: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
      },
      submitButton: {
        marginTop: 12,
      },
    }),
    [],
  )
  return (
    <Screen style={styles.screen} meta={{ title: "Amble" }}>
      <Container width="compact">
        <Scroll>
          <Controller
            name="name"
            control={form.control}
            defaultValue=""
            render={({ value, onChange, onBlur }) => (
              <TextInput
                label="Name"
                error={form.errors.name?.message}
                autoFocus
                textContentType="username"
                autoCompleteType="username"
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
            name="title"
            control={form.control}
            defaultValue=""
            render={({ value, onChange, onBlur }) => (
              <TextInput
                label="Title"
                error={form.errors.title?.message}
                textContentType="name"
                autoCompleteType="name"
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
            name="description"
            control={form.control}
            defaultValue=""
            render={({ value, onChange, onBlur }) => (
              <TextInput
                label="Description"
                error={form.errors.description?.message}
                multiline={true}
                numberOfLines={4}
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
          <Button
            style={styles.submitButton}
            label="Create Group"
            role="primary"
            size="large"
            onPress={submit}
            isDisabled={!form.formState.isValid || result.error != null}
          />
        </Scroll>
      </Container>
    </Screen>
  )
}
