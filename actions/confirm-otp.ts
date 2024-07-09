import { getUserByEmail } from "@/data/user";
import { OtpSchema } from "@/schemas";
import { z } from "zod";

export const confirmOtp = async (values: z.infer<typeof OtpSchema>) => {

    const validatedFields = OtpSchema.safeParse(values);
    console.log("validated fields are : ",validatedFields);

    if(!validatedFields.success){
        return {
            error: "Invalid fields",
        };
    }

    const { pin } = validatedFields.data;
    console.log("pin is : ",pin);

    
}