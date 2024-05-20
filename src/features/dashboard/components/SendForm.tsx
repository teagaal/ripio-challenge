import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { sendAmount } from "../dashboardSlice";
import { closeModal } from "../../../common/Modal/modalSlice";
import { addTransaction } from "../dashboardSlice";
import { Button } from "../../../common/Button/Button";
import { Loader } from "../../../common/Loader/Loader";
import { generateTransaction } from "../../../utils";

export const SendForm = () => {
  const [btcAddress, setBtcAddress] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [commissionAmount, setCommissionAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.dashboard.loading);

  const handleSendAmount = async (event: React.FormEvent) => {
    event.preventDefault();
    const transaction = generateTransaction(totalAmount, btcAddress);
    if (amount <= 0) {
      toast.error("El monto debe ser mayor que cero.");
      return;
    }
    try {
      await dispatch(sendAmount(totalAmount)).unwrap();
      dispatch(addTransaction(transaction));

      toast.success("¡Bitcoins enviados!");
      dispatch(closeModal());
    } catch (error) {
      toast.error("Hubo un error, intenta más tarde.");
    }
  };

  useEffect(() => {
    const commission = amount * 0.01;
    setCommissionAmount(commission);
    const total = amount + commission;
    setTotalAmount(total);
  }, [amount]);

  return (
    <div className="min-h-[300px] flex items-center justify-center">
      {isLoading ? (
        <Loader />
      ) : (
        <form
          className="flex flex-col gap-6 w-full"
          onSubmit={handleSendAmount}
        >
          <div>
            <label htmlFor="btc-address" className="inline-block mb-2">
              Dirección:
            </label>
            <input
              type="text"
              id="btc-address"
              value={btcAddress}
              onChange={e => setBtcAddress(e.target.value)}
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="inline-block mb-2">
              Monto:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="commission-amount" className="inline-block mb-4">
              Comisión:
            </label>
            <input
              type="number"
              id="commission-amount"
              value={commissionAmount}
              readOnly
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2 text-xl font-bold">
            <p>Monto total:</p>
            <p>{totalAmount}</p>
          </div>
          <div className="flex gap-4 items-center py-4 border-t rounded-b border-gray-600">
            <Button type="submit">Enviar</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SendForm;
