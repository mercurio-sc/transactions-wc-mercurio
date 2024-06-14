import SearchInput from "@wc/components/search-input";
import Table from "@wc/components/table";
import NotificationModal from "@wc/components/modals/notification-modal";
import TransactionDetailsModal from "@wc/components/modals/transaction-details-modal";

export default function Transactions() {
  return (
    <>
      <div className="space-y-6 p-2">
        <div className="flex items-center">
          <h1 className="grow text-xl font-bold">Lista de transacciones</h1>

          <SearchInput />
        </div>

        <Table />
      </div>

      {/* Modals */}
      <NotificationModal />
      <TransactionDetailsModal />
    </>
  );
}
