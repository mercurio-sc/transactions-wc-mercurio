import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

import useMainContext from "@wc/hooks/use-main-context.hook";
import Description from "@wc/components/description";

export default function TransactionDetailsModal() {
  const { transaction, detailsModal } = useMainContext();

  const { isOpen, onOpenChange } = detailsModal;

  return (
    <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Detalles de la transacción</ModalHeader>
            <ModalBody>
              <table>
                <tr>
                  <td className="min-w-max px-3 py-2 font-bold">
                    Nombre del cliente
                  </td>
                  <td className="float-right">{transaction?.client.name}</td>
                </tr>
                <tr>
                  <td className="min-w-max px-3 py-2 font-bold">
                    Tipo de documento
                  </td>
                  <td className="float-right">
                    {transaction?.client.document.type}
                  </td>
                </tr>
                <tr>
                  <td className="min-w-max px-3 py-2 font-bold">
                    Número de documento
                  </td>
                  <td className="float-right">
                    {transaction?.client.document.value}
                  </td>
                </tr>
                <tr>
                  <td className="min-w-max px-3 py-2 font-bold">
                    Correo electrónico
                  </td>
                  <td className="float-right">{transaction?.client.email}</td>
                </tr>
                <tr>
                  <td className="min-w-max px-3 py-2 font-bold">
                    Número celular
                  </td>
                  <td className="float-right">{transaction?.client.phone}</td>
                </tr>
                <tr>
                  <td className="min-w-max px-3 py-2 font-bold">Ubicación</td>
                  <td className="float-right">
                    {transaction?.client?.shipping ? (
                      <div className="flex flex-col">
                        <div>
                          {`${transaction?.client?.shipping?.city} - ${transaction?.client?.shipping?.province}`}
                        </div>
                        {transaction?.client?.shipping?.roadClass &&
                          transaction?.client?.shipping?.roadNumber && (
                            <div>
                              {`${transaction?.client?.shipping?.roadClass} ${transaction?.client?.shipping?.roadNumber} `}
                              {transaction?.client?.shipping?.junctionNumber &&
                                transaction?.client?.shipping
                                  ?.junctionNumber !== "n/a" &&
                                `# ${transaction?.client?.shipping?.junctionNumber}`}

                              {transaction?.client?.shipping?.distanceDoor &&
                                transaction?.client?.shipping?.distanceDoor !==
                                  "n/a" &&
                                ` - ${transaction?.client?.shipping?.distanceDoor}`}
                            </div>
                          )}
                      </div>
                    ) : (
                      <span className="font-light italic text-default-400">
                        Sin dirección
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="min-w-max px-3 py-2 align-top font-bold">
                    Descripción
                  </td>
                  <td className="float-right">
                    <div className="max-h-[120px] w-[252px] overflow-auto p-2 scrollbar:!h-1.5 scrollbar:!w-1.5 scrollbar:bg-transparent scrollbar-track:!rounded scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300">
                      <Description>{transaction?.description}</Description>
                    </div>
                  </td>
                </tr>
              </table>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" radius="full" onClick={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
