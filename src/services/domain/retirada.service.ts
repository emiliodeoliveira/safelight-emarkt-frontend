import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { RetiradaDTO } from "../../models/retirada.dto";

@Injectable()
export class RetiradaService {

    constructor(public http: HttpClient) {
    }

    insert(obj: RetiradaDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/retiradas`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}
