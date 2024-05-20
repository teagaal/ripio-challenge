import { useEffect } from "react";
import type { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchBitcoinBalance, fetchArsEquivalent } from "./dashboardSlice";
import { openModal } from "../../common/Modal/modalSlice";
import { TransactionsTable } from "./components/TransactionsTable";
import { SendForm } from "./components/SendForm";
import { Modal } from "../../common/Modal/Modal";
import { Button } from "../../common/Button/Button";
import { formatNumber } from "../../utils";
import { Loader } from "../../common/Loader/Loader";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const balance = useAppSelector((state: RootState) => state.dashboard.balance);
  const arsEquivalent = useAppSelector(
    (state: RootState) => state.dashboard.arsEquivalent,
  );
  const loading = useAppSelector(state => state.dashboard.loading);

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  useEffect(() => {
    dispatch(fetchBitcoinBalance("user123"));
  }, [dispatch]);

  useEffect(() => {
    if (balance !== null) {
      dispatch(fetchArsEquivalent());
    }
  }, [dispatch, balance]);

  return (
    <div>
      <div className="flex flex-row gap-2 justify-between px-4 py-6 border border-[#2e2e2e] rounded-lg backdrop-blur-md bg-opacity-70 bg-[#242629]">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-medium">Balance</h1>
          <p className="text-4xl font-bold">{balance} BTC</p>
          {loading ? (
            <Loader />
          ) : (
            <p className="text-lg">
              {arsEquivalent && `≈ ${formatNumber(arsEquivalent)} ARS`}
            </p>
          )}
        </div>
        <ul className="flex gap-4">
          <li>
            <Button>Depositar</Button>
          </li>
          <li>
            <Button>Transferir</Button>
          </li>
          <li>
            <Button onClick={handleOpenModal}>Enviar</Button>
          </li>
        </ul>
      </div>
      <Modal title="Enviar BTC" size="lg">
        <SendForm />
      </Modal>
      <TransactionsTable />
    </div>
  );
};
