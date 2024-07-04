import { RegisterSchema } from "@/schemas";
import * as z from 'zod';

import bcrypt from 'bcryptjs';

export const signup = async (values : z.infer<typeof RegisterSchema>) => {

    const validateFields = RegisterSchema.safeParse(values);

    if (!validateFields.success){
        return {
            error: "Invalid fields!!",
        }
    }

    const { email, password, confirmPassword } = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

};