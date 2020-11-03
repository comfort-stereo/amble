import { useStyles } from "../../common/theme"

export function useLoggedOutScreenStyles() {
  return useStyles(
    (theme) => ({
      root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      scrollContentContainer: {
        flexGrow: 1,
        justifyContent: "center",
      },
      spacer: {
        flex: 1,
      },
      form: {
        padding: 12,
        maxWidth: 375,
        minWidth: 250,
        width: "100%",
      },
      header: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.foreground("neutral").string(),
        textAlign: "center",
        paddingBottom: 10,
      },
      input: {
        marginBottom: 1,
      },
      changeIntentSection: {
        width: "100%",
        textAlign: "center",
        alignItems: "center",
      },
      changeIntentText: {
        color: theme.foreground("neutral").string(),
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: 15,
      },
      submitSection: {
        paddingVertical: 20,
      },
      errorMessage: {
        fontSize: 14,
        textAlign: "center",
        color: theme.background("danger").string(),
        marginTop: 15,
        marginBottom: 5,
        fontStyle: "italic",
      },
    }),
    [],
  )
}
