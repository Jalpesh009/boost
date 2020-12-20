import React from "react"
import { render } from "@testing-library/react-native"
import "@testing-library/jest-native/extend-expect"

import CodeInputScreen from "./CodeInputScreen"
import { VaccineEligibilityProvider } from "../VaccineEligibilityContext"
import { VaccinationContextProvider } from "../../VaccinationContext"

import {
  PermissionsContext,
  ENPermissionStatus,
} from "../../Device/PermissionsContext"

jest.mock("@react-navigation/native")

describe("CodeInputScreen", () => {
  describe("when the user has exposure notifications enabled", () => {
    it("shows the CodeInputForm", () => {
      const permissionProviderValue = createPermissionProviderValue("Active")

      const { getByTestId, queryByTestId } = render(
        <PermissionsContext.Provider value={permissionProviderValue}>
          <VaccinationContextProvider preloadedVaccines={[]} preloadedAppointments={[]} >
            <VaccineEligibilityProvider isOnboardingComplete>
              <CodeInputScreen />
            </VaccineEligibilityProvider>
          </VaccinationContextProvider>
        </PermissionsContext.Provider>,
      )

      expect(getByTestId("affected-user-code-input-form")).not.toBeNull()
      expect(
        queryByTestId("affected-user-enable-expsosure-notifications-screen"),
      ).toBeNull()
    })
  })

  describe("when the user does not have exposure notifications enabled", () => {
    it("shows the EnableExposureNotifications screen", () => {
      const permissionProviderValue = createPermissionProviderValue("Disabled")

      const { getByTestId, queryByTestId } = render(
        <PermissionsContext.Provider value={permissionProviderValue}>
          <VaccinationContextProvider preloadedVaccines={[]} preloadedAppointments={[]} >
            <VaccineEligibilityProvider isOnboardingComplete>
              <CodeInputScreen />
            </VaccineEligibilityProvider>
          </VaccinationContextProvider>
        </PermissionsContext.Provider>,
      )

      expect(getByTestId("affected-user-code-input-form")).not.toBeNull()
      expect(
        queryByTestId("affected-user-enable-expsosure-notifications-screen"),
      ).toBeNull()
    })
  })
})

const createPermissionProviderValue = (
  enPermissionStatus: ENPermissionStatus,
) => {
  return {
    locationPermissions: "RequiredOn" as const,
    notification: {
      status: "Unknown" as const,
      check: () => {},
      request: () => {},
    },
    exposureNotifications: {
      status: enPermissionStatus,
      check: () => {},
      request: () =>
        Promise.resolve({
          kind: "failure" as const,
          error: "Unknown" as const,
        }),
    },
  }
}
