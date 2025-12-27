import { InferenceClient } from "@huggingface/inference"

const hf = new InferenceClient(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

    try {
        const response = await hf.conversational({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            inputs: {
                past_user_inputs: [],
                generated_responses: [],
                text: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make.`,
            },
            parameters: {
                max_new_tokens: 1024,
            },
        })

        return response.generated_text
    } catch (err) {
        console.error("HF error:", err)
        return "Sorry, something went wrong generating the recipe."
    }
}
