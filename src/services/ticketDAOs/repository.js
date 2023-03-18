import TicketDTO from "./DTO.js";

export class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async create(data) {
    const Ticket = await this.dao.create(data);
    const TicketDTO = new TicketDTO(Ticket);
    return TicketDTO;
  }

  async getOne(id) {
    const Ticket = await this.dao.getOne(id);
    const TicketDTO = new TicketDTO(Ticket);
    return TicketDTO;
  }

  async getMany() {
    const Ticket = await this.dao.getMany();
    const TicketDTO = Ticket.map(
      (Ticket) => new TicketDTO(Ticket)
    );
    return TicketDTO;
  }

  async update(id, data) {
    const Ticket = await this.dao.update(id, data);
    const TicketDTO = new TicketDTO(Ticket);
    return TicketDTO;
  }

  async delete(id) {
    const Ticket = await this.dao.delete(id);
    const TicketDTO = new TicketDTO(Ticket);
    return TicketDTO;
  }
}
