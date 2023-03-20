import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { NewFirmCreated } from "../generated/FirmFactory/FirmFactory"

export function createNewFirmCreatedEvent(
  creator: Address,
  safe: Address
): NewFirmCreated {
  let newFirmCreatedEvent = changetype<NewFirmCreated>(newMockEvent())

  newFirmCreatedEvent.parameters = new Array()

  newFirmCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  newFirmCreatedEvent.parameters.push(
    new ethereum.EventParam("safe", ethereum.Value.fromAddress(safe))
  )

  return newFirmCreatedEvent
}
