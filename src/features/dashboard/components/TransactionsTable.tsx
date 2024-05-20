import { useAppSelector } from "../../../app/hooks";

const COLUMN_HEADINGS = ["Date", "BTC Amount", "Address", "Status", "ID"];

export const TransactionsTable = () => {
  const transactions = useAppSelector(state => state.dashboard.transactions);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-6">Transacciones</h2>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-sm uppercase  bg-[#242629] text-[#fffffe">
            <tr>
              {COLUMN_HEADINGS.map(col => {
                return (
                  <th scope="col" key={col} className="px-6 py-3">
                    {col}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {[...transactions]
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime(),
              )
              .map(transaction => {
                return (
                  <tr
                    className="border-b bg-[#242629] border-gray-700 text-lg"
                    key={transaction.id}
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                      {new Date(transaction.date).toLocaleDateString("es-AR")}
                    </td>
                    <td className="px-6 py-4">{transaction.amount}</td>
                    <td className="px-6 py-4">{transaction.address}</td>
                    <td className="px-6 py-4">{transaction.status}</td>
                    <td className="px-6 py-4">{transaction.id}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
