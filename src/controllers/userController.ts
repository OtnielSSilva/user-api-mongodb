import { Request, Response } from "express";
import UserService from "../services/userService";

export default {
	async getUsers(req: Request, res: Response) {
		try {
			const users = await UserService.getUsers();
			return res.status(200).json({ status: 200, msg: users });
		} catch (error) {
			return res
				.status(400)
				.json({ status: 400, msg: { error: "Erro ao listar usuários" } });
		}
	},

	async createUser(req: Request, res: Response) {
		const userData = req.body;
		try {
			const newUser = await UserService.createUser(userData);
			return res.status(201).json({ status: 201, msg: newUser });
		} catch (error) {
			return res
				.status(400)
				.json({
					status: 400,
					msg: { error: error instanceof Error ? error.message : error },
				});
		}
	},

	async updateUser(req: Request, res: Response) {
		const { id } = req.params;
		const userData = req.body;
		try {
			const updatedUser = await UserService.updateUser(id, userData);
			if (updatedUser) {
				return res.status(200).json({ status: 200, msg: updatedUser });
			} else {
				return res
					.status(404)
					.json({ status: 404, msg: { error: "Usuário não encontrado" } });
			}
		} catch (error) {
			return res
				.status(400)
				.json({ status: 400, msg: { error: "Erro ao atualizar usuário" } });
		}
	},

	async deleteUser(req: Request, res: Response) {
		const { id } = req.params;
		try {
			await UserService.deleteUser(id);
			return res
				.status(204)
				.json({ status: 204, msg: "Usuário excluído com sucesso" });
		} catch (error) {
			return res
				.status(400)
				.json({ status: 400, msg: { error: "Erro ao excluir usuário" } });
		}
	},
};
