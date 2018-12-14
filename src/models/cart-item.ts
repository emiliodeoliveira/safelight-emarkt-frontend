import { LivroDTO } from "./livro.dto";

export interface CartItem {
    quantidade: number,
    livro: LivroDTO
}
