import User, { IUser } from "../models/userModel";

export default {
	async getUsers(): Promise<IUser[]> {
		return await User.find();
	},

	async getUser(id: string): Promise<IUser> {
		const user = await User.findById(id);

		if (!user) {
			throw new Error("Usuário não encontrado!");
		}
		return user;
	},

	async createUser(userData: IUser): Promise<IUser> {
		const { email, cpf, telefone } = userData;

		// Verificar se o email, CPF ou telefone já existem
		const existingUser = await User.findOne({
			$or: [{ email }, { cpf }, { telefone }],
		});

		if (existingUser) {
			// Verificar quais dados existem e construir a mensagem de erro
			const existingData = [];
			if (existingUser.email === email) {
				existingData.push("Email");
			}
			if (existingUser.cpf === cpf) {
				existingData.push("CPF");
			}
			if (existingUser.telefone === telefone) {
				existingData.push("Telefone");
			}

			const errorMessage = `Usuário com o mesmo(s) ${existingData.join(
				", "
			)} já existe.`;

			throw new Error(errorMessage);
		}

		const newUser = new User(userData);

		return await newUser.save();
	},

	async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
		return await User.findByIdAndUpdate(id, data, { new: true });
	},

	async deleteUser(id: string): Promise<void> {
		await User.findByIdAndDelete(id);
	},
};
