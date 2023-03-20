import { NewFirmCreated as NewFirmCreatedEvent } from "../generated/FirmFactory/FirmFactory"
import { NewFirmCreated } from "../generated/schema"

export function handleNewFirmCreated(event: NewFirmCreatedEvent): void {
  let entity = new NewFirmCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.creator = event.params.creator
  entity.safe = event.params.safe

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
