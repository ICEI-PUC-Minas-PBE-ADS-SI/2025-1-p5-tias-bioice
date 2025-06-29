import {Module} from '@nestjs/common';
import {InsumoController} from "../../controller/insumo/insumo.controller";
import {InsumoService} from "../../service/insumo/insumo.service";
import {InsumoRepository} from "../../repository/insumo/insumo.repository";

@Module({
    imports: [],
    controllers: [InsumoController],
    providers: [InsumoService, InsumoRepository],
    exports: [InsumoService]
})
export class InsumoModule {
}
