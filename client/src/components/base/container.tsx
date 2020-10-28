import React, { forwardRef } from "react"
import { ScrollView, View } from "react-native"
import { useStyles } from "../../common/theme"
import { ComponentPropsWithChildren } from "../../common/types"

type Props = ComponentPropsWithChildren<typeof View>

export const Container = forwardRef<View, Props>(function Container(
  { style, children, ...props },
  ref,
) {
  const styles = useStyles(
    () => ({
      root: {
        alignItems: "center",
        flex: 1,
        overflow: "hidden",
      },
      column: {
        width: "100%",
        flex: 1,
        maxWidth: 650,
      },
      scroll: {
        flex: 1,
        height: "100%",
      },
      scrollContainer: {
        flexGrow: 1,
      },
    }),
    [],
  )
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContainer}>
      {children}
    </ScrollView>
  )

  return (
    <View {...props} style={[styles.root, style]} ref={ref}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContainer}>
        {children}
      </ScrollView>
    </View>
  )
  return (
    <View {...props} style={[styles.root, style]} ref={ref}>
      <View style={styles.column}>
        <ScrollView style={styles.scroll}>{children}</ScrollView>
      </View>
    </View>
  )
})
