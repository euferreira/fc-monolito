import ClientRepository from "../repository/client.repository";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "../facade/client-adm.facade";

export default class ClientAdmFacadeFactory {
    static create(): ClientAdmFacade {
        const clientRepository = new ClientRepository();
        const findUseCase = new FindClientUsecase(clientRepository);
        const addUsecase = new AddClientUseCase(clientRepository);

        return new ClientAdmFacade({
            addUsecase: addUsecase,
            findUsecase: findUseCase,
        });
    }
}