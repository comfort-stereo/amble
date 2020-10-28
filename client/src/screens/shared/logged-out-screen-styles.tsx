import { useStyles } from "../../common/theme"

export function useLoggedOutScreenStyles() {
  return useStyles(
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
        alignItems: "center",
        paddingVertical: 10,
      },
      changeIntentText: {
        color: theme.contentColorFor("surface").string(),
        fontStyle: "italic",
        fontWeight: "bold",
      },
      submitSection: {
        paddingVertical: 20,
      },
      errorMessage: {
        fontSize: 14,
        textAlign: "center",
        color: theme.colorFor("error").string(),
        marginBottom: 10,
        fontStyle: "italic",
      },
    }),
    [],
  )
}
