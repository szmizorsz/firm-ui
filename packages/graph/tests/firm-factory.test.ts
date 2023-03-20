import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { NewFirmCreated } from "../generated/schema"
import { NewFirmCreated as NewFirmCreatedEvent } from "../generated/FirmFactory/FirmFactory"
import { handleNewFirmCreated } from "../src/firm-factory"
import { createNewFirmCreatedEvent } from "./firm-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let creator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let safe = Address.fromString("0x0000000000000000000000000000000000000001")
    let newNewFirmCreatedEvent = createNewFirmCreatedEvent(creator, safe)
    handleNewFirmCreated(newNewFirmCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewFirmCreated created and stored", () => {
    assert.entityCount("NewFirmCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewFirmCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NewFirmCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "safe",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
