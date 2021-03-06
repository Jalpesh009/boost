import React, { FunctionComponent } from "react"
import { ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native"
import { useTranslation } from "react-i18next"

import { StatusBar, Text } from "../components"
import { useStatusBarEffect } from "../navigation"

import { Images } from "../assets"
import { Buttons, Colors, Layout, Spacing, Typography } from "../styles"
import { useVaccineEligibilityContext } from "./VaccineEligibilityContext"

export const VaccineEligibilityComplete: FunctionComponent = () => {
  useStatusBarEffect("dark-content", Colors.background.primaryLight)
  const { t } = useTranslation()
  const { navigateOutOfStack } = useVaccineEligibilityContext()

  const handleOnPressDone = navigateOutOfStack

  return (
    <>
      <StatusBar backgroundColor={Colors.background.primaryLight} />
      <ScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
        alwaysBounceVertical={false}
      >
        <Image source={Images.CheckInCircle} style={style.image} />
        <Text style={style.header}>{t("vaccination_history.eligibility_completed.complete_title")}</Text>
        <Text style={style.contentText}>
          {t("vaccination_history.eligibility_completed.complete_body")}
        </Text>
        <TouchableOpacity
          style={style.button}
          onPress={handleOnPressDone}
          accessibilityLabel={t("common.done")}
        >
          <Text style={style.buttonText}>{t("common.done")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primaryLight,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Layout.oneTwentiethHeight,
    paddingBottom: Spacing.xxHuge,
    paddingHorizontal: Spacing.large,
  },
  image: {
    width: 230,
    height: 150,
    marginBottom: Spacing.medium,
    resizeMode: "cover",
  },
  header: {
    ...Typography.header.x60,
    textAlign: "center",
    marginBottom: Spacing.medium,
  },
  contentText: {
    ...Typography.body.x30,
    textAlign: "center",
    marginBottom: Spacing.xxxLarge,
  },
  button: {
    ...Buttons.primary.base,
  },
  buttonText: {
    ...Typography.button.primary,
  },
})

export default VaccineEligibilityComplete
