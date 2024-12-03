import ClientAdmFacadeInterface, {
    AddClientFacadeInputDto,
    FindClientFacadeInputDto,
    FindClientFacadeOutputDto
} from "./client-adm.facade.interface";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";

export interface UseCaseProps {
    addUsecase: UseCaseInterface;
    findUsecase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private _findUsecase: UseCaseInterface;
    private _addUsecase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._addUsecase = usecaseProps.addUsecase;
        this._findUsecase = usecaseProps.findUsecase;
    }

    async add(input: AddClientFacadeInputDto): Promise<void> {
        await this._addUsecase.execute(input);
    }

    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return await this._findUsecase.execute(input);
    }
}