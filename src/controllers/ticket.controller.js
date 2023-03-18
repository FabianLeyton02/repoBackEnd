import factory from "../services/factory.js";
import { STATUS } from "../constants/constants.js";

class TicketController {
  async createTicket(req, res) {
    try {
      const data = req.body;
      const response = await factory.Ticket.createTicket(data);
      res.status(201).json({ Ticket: response, status: STATUS.SUCCESS });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: STATUS.FAIL,
      });
    }
  }

  async getTicket(req, res) {
    try {
      const { code } = req.params;
      const response = await factory.Ticket.getTicket(code);
      res.status(200).json({ Ticket: response, status: STATUS.SUCCESS });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: STATUS.FAIL,
      });
    }
  }

  async updateTicket(req, res) {
    try {
      const { code } = req.params;
      const { body } = req;
      const Ticket = await factory.Ticket.updateTicket(code, body);
      res.json({ Ticket });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new TicketController();
