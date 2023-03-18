import { CRUD } from "../CRUD.js";
import { ticketModel } from "../../models/tickets.models.js";

class TicketMongo extends CRUD {
  constructor(model) {
    super(model);
  }
}

export default new TicketMongo(ticketModel);
