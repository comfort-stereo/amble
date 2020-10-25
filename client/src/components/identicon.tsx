import React, { useMemo } from "react"
import { StyleSheet, View, ViewProps } from "react-native"

type Props = Readonly<
  ViewProps & {
    content: string
    colors: ReadonlyArray<string>
    divisions: number
    size: number
  }
>

export function Identicon({ style, content, colors, divisions, size, ...props }: Props) {
  const pixels = useMemo(() => getPixels(content, colors, divisions), [content, colors, divisions])
  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          width: size,
          height: size,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        },
        inner: {
          flexDirection: "row",
          flexWrap: "wrap",
          width: size,
          height: size,
        },
        pixel: {
          height: 100 / divisions + "%",
          width: 100 / divisions + "%",
        },
      }),
    [size, divisions],
  )

  return (
    <View {...props} style={[styles.root, style]}>
      <View style={styles.inner}>
        {pixels.map((color, i) => (
          <View key={i} style={[styles.pixel, { backgroundColor: color }]} />
        ))}
      </View>
    </View>
  )
}

function getPixels(
  content: string,
  colors: ReadonlyArray<string>,
  divisions: number,
): ReadonlyArray<string> {
  const pixels = new Array(divisions * divisions)

  for (let i = 0; i < pixels.length; i++) {
    let x = i % divisions
    let y = Math.floor(i / divisions)
    const center = Math.floor(divisions / 2) - 1

    if (x > center) {
      x = divisions - x - 1
    }

    const mirrored = y * divisions + x
    const hash = getHash(`${mirrored}${content}`)

    pixels[i] = colors[hash % colors.length]
  }

  return pixels
}

function getHash(string: string) {
  let result = 0
  let length = string.length
  let i = 0

  if (length > 0) {
    while (i < length) {
      result = ((result << 5) - result + string.charCodeAt(i++)) | 0
    }
  }

  return Math.abs(result)
}
