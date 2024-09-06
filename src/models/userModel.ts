import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
	nome: string;
	sobrenome: string;
	cpf: string;
	telefone: string;
	email: string;
}

const UserSchema: Schema = new Schema({
	nome: { type: String, required: true },
	sobrenome: { type: String, required: true },
	cpf: { type: String, required: true, unique: true },
	telefone: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
